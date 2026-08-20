// Simple shared-secret admin auth, matching the original design:
// the client sends the password back as a token in x-admin-token.
// ADMIN_PASSWORD must be set in Vercel Project Settings → Environment
// Variables WITHOUT a VITE_ prefix, so it stays server-side only.

export function checkAdminToken(req) {
  const token = req.headers['x-admin-token'];
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    console.error('ADMIN_PASSWORD is not set in the environment.');
    return false;
  }
  return token === expected;
}

/** Returns true if authorized. If not, writes a 401 response and returns false. */
export function requireAdmin(req, res) {
  if (checkAdminToken(req)) return true;
  res.status(401).json({ error: 'Unauthorized' });
  return false;
}
