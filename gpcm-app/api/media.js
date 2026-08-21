import { supabaseAdmin, mapMediaRow } from './_lib/supabaseAdmin.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { data, error } = await supabaseAdmin
    .from('media')
    .select('*')
    .eq('status', 'published')
    .order('order', { ascending: true });

  if (error) return res.status(500).json({ error: error.message });

  res.json(data.map(mapMediaRow));
}
