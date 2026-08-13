import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { nanoid } from 'nanoid';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'gpcm-admin-2026';
const UPLOAD_DIR = path.join(__dirname, '../uploads');
const DATA_FILE = path.join(__dirname, '../data/media.json');

// Ensure folders exist
fs.mkdirSync(UPLOAD_DIR, { recursive: true });
fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
}

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(UPLOAD_DIR));

// ---------- helpers ----------
function readMedia() {
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
}
function writeMedia(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

function auth(req, res, next) {
  const token = req.headers['x-admin-token'];
  if (token === ADMIN_PASSWORD) return next();
  return res.status(401).json({ error: 'Unauthorized' });
}

// ---------- Multer ----------
const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, UPLOAD_DIR),
  filename: (_, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${Date.now()}-${nanoid(8)}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 80 * 1024 * 1024 }, // 80 MB
  fileFilter: (_, file, cb) => {
    const allowed = ['.jpg', '.jpeg', '.png', '.mp4', '.webm', '.mp3', '.m4a', '.wav'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) cb(null, true);
    else cb(new Error('Only JPG, PNG, MP4, WEBM allowed'));
  },
});

// ---------- Public API ----------
app.get('/api/media', (req, res) => {
  const media = readMedia().filter((m) => !m.hidden);
  // sort by order
  media.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  res.json(media);
});

app.get('/api/media/:id', (req, res) => {
  const item = readMedia().find((m) => m.id === req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

// ---------- Admin API ----------
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    return res.json({ token: ADMIN_PASSWORD });
  }
  res.status(401).json({ error: 'Invalid password' });
});

app.get('/api/admin/media', auth, (req, res) => {
  const media = readMedia();
  media.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  res.json(media);
});

app.post('/api/admin/upload', auth, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file' });

  const media = readMedia();
  const item = {
    id: nanoid(),
    filename: req.file.filename,
    originalName: req.file.originalname,
    url: `/uploads/${req.file.filename}`,
    type: req.file.mimetype.startsWith('video') ? 'video' : req.file.mimetype.startsWith('audio') ? 'audio' : 'image',
    category: req.body.category || 'gallery', // gallery | hero | about | leader | other
    order: media.length,
    hidden: false,
    createdAt: new Date().toISOString(),
  };

  media.push(item);
  writeMedia(media);
  res.status(201).json(item);
});

app.patch('/api/admin/media/:id', auth, (req, res) => {
  const media = readMedia();
  const idx = media.findIndex((m) => m.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });

  const allowed = ['category', 'order', 'hidden', 'originalName'];
  for (const key of allowed) {
    if (req.body[key] !== undefined) media[idx][key] = req.body[key];
  }
  writeMedia(media);
  res.json(media[idx]);
});

app.delete('/api/admin/media/:id', auth, (req, res) => {
  let media = readMedia();
  const item = media.find((m) => m.id === req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });

  // delete file
  const filePath = path.join(UPLOAD_DIR, item.filename);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

  media = media.filter((m) => m.id !== req.params.id);
  writeMedia(media);
  res.json({ success: true });
});

// Reorder bulk
app.put('/api/admin/reorder', auth, (req, res) => {
  const { orderedIds } = req.body; // string[]
  const media = readMedia();
  orderedIds.forEach((id, index) => {
    const item = media.find((m) => m.id === id);
    if (item) item.order = index;
  });
  writeMedia(media);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`GPCM API running on http://localhost:${PORT}`);
});
