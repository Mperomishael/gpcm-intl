import { createClient } from '@supabase/supabase-js';

// Server-only client. Uses the SERVICE ROLE key so it bypasses RLS —
// this file must never be imported into frontend/browser code, and
// SUPABASE_SERVICE_ROLE_KEY must NOT have a VITE_ prefix or it will
// get bundled into the client JS.
const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    'Missing Supabase server env vars. Need VITE_SUPABASE_URL (or SUPABASE_URL) and SUPABASE_SERVICE_ROLE_KEY.'
  );
}

export const supabaseAdmin = createClient(url, serviceKey, {
  auth: { persistSession: false },
});

export const MEDIA_BUCKET = 'media';

/** Map a Supabase `media` row to the shape the frontend expects. */
export function mapMediaRow(row) {
  return {
    id: row.id,
    filename: row.filename,
    originalName: row.original_name,
    url: row.url,
    type: row.type,
    category: row.category,
    title: row.title ?? undefined,
    description: row.description ?? undefined,
    order: row.order,
    hidden: row.hidden,
    createdAt: row.created_at,
  };
}

