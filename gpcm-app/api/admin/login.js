export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password } = req.body || {};
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected) {
    // Fails loudly instead of silently allowing/denying, so a missing
    // env var on Vercel doesn't get mistaken for "wrong password".
    console.error('ADMIN_PASSWORD is not set in the environment.');
    return res.status(500).json({ error: 'Server misconfigured: ADMIN_PASSWORD not set' });
  }

  if (password === expected) {
    return res.json({ token: expected });
  }

  return res.status(401).json({ error: 'Invalid password' });
}
