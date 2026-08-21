import multer from 'multer';
import { nanoid } from 'nanoid';
import path from 'path';
import { requireAdmin } from '../_lib/auth.js';
import { supabaseAdmin, MEDIA_BUCKET, mapMediaRow } from '../_lib/supabaseAdmin.js';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 80 * 1024 * 1024 },
  fileFilter: (_, file, cb) => {
    const allowed = [
      '.jpg', '.jpeg', '.png', '.webp',
      '.mp4', '.webm',
      '.mp3', '.m4a', '.wav',
      '.pdf',
    ];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) cb(null, true);
    else cb(new Error('Only JPG, PNG, WEBP, MP4, WEBM, MP3, M4A, WAV, PDF allowed'));
  },
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => (result instanceof Error ? reject(result) : resolve(result)));
  });
}

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const session = await requireAdmin(req, res, 'upload');
  if (!session) return;

  try {
    await runMiddleware(req, res, upload.single('file'));
  } catch (err) {
    return res.status(400).json({ error: err.message || 'Upload failed' });
  }

  if (!req.file) return res.status(400).json({ error: 'No file' });

  const ext = path.extname(req.file.originalname).toLowerCase();
  const filename = `${Date.now()}-${nanoid(8)}${ext}`;
  const storagePath = filename;

  const { error: uploadErr } = await supabaseAdmin.storage
    .from(MEDIA_BUCKET)
    .upload(storagePath, req.file.buffer, {
      contentType: req.file.mimetype,
      upsert: false,
    });

  if (uploadErr) return res.status(500).json({ error: uploadErr.message });

  const { data: publicUrlData } = supabaseAdmin.storage.from(MEDIA_BUCKET).getPublicUrl(storagePath);

  let type = 'image';
  if (req.file.mimetype.startsWith('video') || ['.mp4', '.webm'].includes(ext)) type = 'video';
  else if (req.file.mimetype.startsWith('audio') || ['.mp3', '.m4a', '.wav'].includes(ext)) type = 'audio';
  else if (req.file.mimetype === 'application/pdf' || ext === '.pdf') type = 'document';

  const category = req.body.category || (type === 'document' ? 'book' : 'gallery');
  const downloadable = req.body.downloadable !== 'false';
  const sermonDate = req.body.sermonDate || req.body.sermon_date || null;
  const title = req.body.title || null;
  const description = req.body.description || null;
  const thumbnailUrl = req.body.thumbnailUrl || req.body.thumbnail_url || null;
  const orderVal = req.body.order !== undefined && req.body.order !== ''
    ? parseInt(req.body.order, 10)
    : null;

  const { count } = await supabaseAdmin.from('media').select('*', { count: 'exact', head: true });

  const insertRow = {
    filename,
    original_name: req.file.originalname,
    url: publicUrlData.publicUrl,
    storage_path: storagePath,
    type,
    category,
    source: 'upload',
    downloadable,
    status: 'pending',
    title,
    description,
    thumbnail_url: thumbnailUrl,
    order: Number.isFinite(orderVal) ? orderVal : (count ?? 100),
  };
  if (sermonDate) insertRow.sermon_date = sermonDate;
  else if (type === 'video' || type === 'audio') {
    insertRow.sermon_date = new Date().toISOString().slice(0, 10);
  }

  const { data: row, error: insertErr } = await supabaseAdmin
    .from('media')
    .insert(insertRow)
    .select()
    .single();

  if (insertErr) return res.status(500).json({ error: insertErr.message });

  res.status(201).json(mapMediaRow(row));
}
