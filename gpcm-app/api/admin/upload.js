import multer from 'multer';
import { nanoid } from 'nanoid';
import path from 'path';
import { requireAdmin } from '../_lib/auth.js';
import { supabaseAdmin, MEDIA_BUCKET, mapMediaRow } from '../_lib/supabaseAdmin.js';

// Memory storage: Vercel's filesystem is read-only/ephemeral outside
// /tmp, so files are buffered in memory then streamed to Supabase
// Storage instead of saved to disk.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 80 * 1024 * 1024 }, // 80 MB
  fileFilter: (_, file, cb) => {
    const allowed = ['.jpg', '.jpeg', '.png', '.mp4', '.webm', '.mp3', '.m4a', '.wav'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) cb(null, true);
    else cb(new Error('Only JPG, PNG, MP4, WEBM, MP3, M4A, WAV allowed'));
  },
});

// Run a connect-style middleware inside a plain Vercel function.
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => (result instanceof Error ? reject(result) : resolve(result)));
  });
}

// Vercel needs to hand multer the raw, unparsed request body.
export const config = {
  api: { bodyParser: false },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!requireAdmin(req, res)) return;

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

  const type = req.file.mimetype.startsWith('video')
    ? 'video'
    : req.file.mimetype.startsWith('audio')
    ? 'audio'
    : 'image';

  const { count } = await supabaseAdmin.from('media').select('*', { count: 'exact', head: true });

  const { data: row, error: insertErr } = await supabaseAdmin
    .from('media')
    .insert({
      filename,
      original_name: req.file.originalname,
      url: publicUrlData.publicUrl,
      storage_path: storagePath,
      type,
      category: req.body.category || 'gallery',
      order: count ?? 0,
      hidden: false,
    })
    .select()
    .single();

  if (insertErr) return res.status(500).json({ error: insertErr.message });

  res.status(201).json(mapMediaRow(row));
}
