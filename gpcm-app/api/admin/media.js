import { requireAdmin } from '../_lib/auth.js';
import { supabaseAdmin, mapMediaRow } from '../_lib/supabaseAdmin.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!requireAdmin(req, res)) return;

  const { category } = req.query;

  let q = supabaseAdmin.from('media').select('*').order('created_at', { ascending: false });
  if (category) q = q.eq('category', category);

  const { data, error } = await q;
  if (error) return res.status(500).json({ error: error.message });

  res.json(data.map(mapMediaRow));
}
