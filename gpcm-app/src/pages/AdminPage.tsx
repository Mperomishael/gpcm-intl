// src/pages/AdminPage.tsx
import { useState, useEffect, useRef } from 'react';
import { Upload, Trash2, Eye, EyeOff, LogOut, Image, Video } from 'lucide-react';

interface MediaItem {
  id: string;
  filename: string;
  originalName: string;
  url: string;
  type: 'image' | 'video';
  category: string;
  order: number;
  hidden: boolean;
  createdAt: string;
}

// gallery → Gallery section | leader → Features (Bishop photo) | other → misc
const CATEGORIES = ['gallery', 'leader', 'other'];

export default function AdminPage() {
  const [token, setToken] = useState(localStorage.getItem('gpcm_admin_token') || '');
  const [password, setPassword] = useState('');
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [category, setCategory] = useState('gallery');
  const fileRef = useRef<HTMLInputElement>(null);

  const headers = { 'x-admin-token': token };

  const fetchMedia = async () => {
    const res = await fetch('/api/admin/media', { headers });
    if (res.ok) {
      const data = await res.json();
      setMedia(data);
    } else {
      setToken('');
      localStorage.removeItem('gpcm_admin_token');
    }
  };

  useEffect(() => {
    if (token) fetchMedia();
  }, [token]);

  const login = async () => {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      const { token: t } = await res.json();
      setToken(t);
      localStorage.setItem('gpcm_admin_token', t);
    } else {
      alert('Wrong password');
    }
  };

  const logout = () => {
    setToken('');
    localStorage.removeItem('gpcm_admin_token');
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const form = new FormData();
    form.append('file', file);
    form.append('category', category);

    const res = await fetch('/api/admin/upload', {
      method: 'POST',
      headers,
      body: form,
    });

    if (res.ok) {
      await fetchMedia();
    } else {
      const err = await res.json();
      alert(err.error || 'Upload failed');
    }
    setUploading(false);
    if (fileRef.current) fileRef.current.value = '';
  };

  const toggleHidden = async (item: MediaItem) => {
    await fetch(`/api/admin/media/${item.id}`, {
      method: 'PATCH',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ hidden: !item.hidden }),
    });
    fetchMedia();
  };

  const changeCategory = async (item: MediaItem, newCat: string) => {
    await fetch(`/api/admin/media/${item.id}`, {
      method: 'PATCH',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ category: newCat }),
    });
    fetchMedia();
  };

  const deleteItem = async (id: string) => {
    if (!confirm('Delete this media permanently?')) return;
    await fetch(`/api/admin/media/${id}`, { method: 'DELETE', headers });
    fetchMedia();
  };

  // ---------- Login screen ----------
  if (!token) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 max-w-md w-full">
          <h1 className="text-3xl font-serif text-white mb-2">GPCM Admin</h1>
          <p className="text-zinc-400 mb-8">Enter password to manage media</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && login()}
            placeholder="Admin password"
            className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 text-white mb-4 outline-none focus:ring-2 focus:ring-violet-500"
          />
          <button
            onClick={login}
            className="w-full bg-violet-600 hover:bg-violet-700 text-white py-4 rounded-2xl font-semibold"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  // ---------- Dashboard ----------
  return (
    <div className="min-h-screen bg-zinc-100">
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <h1 className="font-serif text-xl font-bold">GPCM Media Admin</h1>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Upload box */}
        <div className="bg-white rounded-3xl border border-zinc-200 p-8 mb-10">
          <h2 className="text-lg font-semibold mb-4">Upload Media</h2>
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border rounded-xl px-4 py-3 bg-zinc-50"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <label className="flex-1 cursor-pointer">
              <div className="border-2 border-dashed border-zinc-300 hover:border-violet-400 rounded-2xl p-8 text-center transition-colors">
                <Upload className="mx-auto mb-2 text-zinc-400" size={28} />
                <p className="text-sm text-zinc-600">
                  {uploading ? 'Uploading…' : 'Click or drop JPG / PNG / MP4'}
                </p>
              </div>
              <input
                ref={fileRef}
                type="file"
                accept=".jpg,.jpeg,.png,.mp4,.webm"
                className="hidden"
                onChange={handleUpload}
                disabled={uploading}
              />
            </label>
          </div>
        </div>

        {/* Media list */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {media.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-2xl border overflow-hidden ${
                item.hidden ? 'opacity-50' : ''
              }`}
            >
              <div className="aspect-video bg-zinc-100 relative">
                {item.type === 'video' ? (
                  <video src={item.url} className="w-full h-full object-cover" muted />
                ) : (
                  <img src={item.url} alt="" className="w-full h-full object-cover" />
                )}
                <div className="absolute top-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  {item.type === 'video' ? <Video size={12} /> : <Image size={12} />}
                  {item.type}
                </div>
              </div>

              <div className="p-4 space-y-3">
                <p className="text-sm font-medium truncate">{item.originalName}</p>

                <select
                  value={item.category}
                  onChange={(e) => changeCategory(item, e.target.value)}
                  className="w-full text-sm border rounded-lg px-3 py-2"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>

                <div className="flex gap-2">
                  <button
                    onClick={() => toggleHidden(item)}
                    className="flex-1 flex items-center justify-center gap-1 text-sm py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200"
                  >
                    {item.hidden ? <Eye size={14} /> : <EyeOff size={14} />}
                    {item.hidden ? 'Show' : 'Hide'}
                  </button>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="flex-1 flex items-center justify-center gap-1 text-sm py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
