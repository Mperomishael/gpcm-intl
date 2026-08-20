import { requireAdmin } from '../../_lib/auth.js';
import { supabaseAdmin, mapMediaRow, MEDIA_BUCKET } from '../../_lib/supabaseAdmin.js';

export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return;

  const { id } = req.query;

  if (req.method === 'PATCH') {
    const allowed = ['category', 'order', 'hidden', 'originalName', 'title', 'description'];
    const fieldMap = { originalName: 'original_name' };
    const updates = {};
    for (const key of allowed) {
      if (req.body?.[key] !== undefined) {
        updates[fieldMap[key] || key] = req.body[key];
      }
    }

    const { data, error } = await supabaseAdmin
      .from('media')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) return res.status(404).json({ error: error.message });
    return res.json(mapMediaRow(data));
  }

  if (req.method === 'DELETE') {
    const { data: item, error: fetchErr } = await supabaseAdmin
      .from('media')
      .select('storage_path')
      .eq('id', id)
      .single();

    if (fetchErr) return res.status(404).json({ error: 'Not found' });

    if (item?.storage_path) {
      await supabaseAdmin.storage.from(MEDIA_BUCKET).remove([item.storage_path]);
    }

    const { error: delErr } = await supabaseAdmin.from('media').delete().eq('id', id);
    if (delErr) return res.status(500).json({ error: delErr.message });

    return res.json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
