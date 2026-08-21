// src/pages/AdminPage.tsx
import { useEffect, useRef, useState } from 'react';
import {
  Upload, Trash2, LogOut, Image as ImageIcon, Video, Headphones,
  UserSquare2, FolderOpen, Check, XCircle, Youtube, Film, Clock,
} from 'lucide-react';
import ImageCropModal from '../components/admin/ImageCropModal';

interface MediaItem {
  id: string;
  filename: string;
  originalName: string;
  url: string;
  type: 'image' | 'video' | 'audio';
  category: string;
  source: 'upload' | 'youtube';
  youtubeUrl?: string;
  thumbnailUrl?: string;
  downloadable: boolean;
  status: 'pending' | 'published' | 'rejected';
  title?: string;
  order: number;
  createdAt: string;
}

type TabKey = 'gallery' | 'leader' | 'sermon_video' | 'sermon_audio' | 'other';

const TABS: { key: TabKey; label: string; icon: typeof ImageIcon; aspect?: number }[] = [
  { key: 'gallery', label: 'Gallery', icon: ImageIcon, aspect: 1 },
  { key: 'leader', label: 'Leader Photo', icon: UserSquare2, aspect: 4 / 5 },
  { key: 'sermon_video', label: 'Video Sermons', icon: Video },
  { key: 'sermon_audio', label: 'Audio Messages', icon: Headphones },
  { key: 'other', label: 'Other', icon: FolderOpen, aspect: 1 },
];

const fmtDate = (iso: string) =>
  new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(iso));

const STATUS_STYLES: Record<MediaItem['status'], string> = {
  pending: 'bg-amber-100 text-amber-700 border-amber-200',
  published: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  rejected: 'bg-rose-100 text-rose-700 border-rose-200',
};

export default function AdminPage() {
  const [token, setToken] = useState(localStorage.getItem('gpcm_admin_token') || '');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [tab, setTab] = useState<TabKey>('gallery');
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loadingList, setLoadingList] = useState(false);
  const [uploading, setUploading] = useState(false);

  // image crop flow
  const [cropFile, setCropFile] = useState<File | null>(null);
  const [cropAspect, setCropAspect] = useState(1);
  const [cropTargetCategory, setCropTargetCategory] = useState<TabKey>('gallery');

  // video sermon: file vs youtube
  const [videoMode, setVideoMode] = useState<'upload' | 'youtube'>('youtube');
  const [ytUrl, setYtUrl] = useState('');
  const [ytTitle, setYtTitle] = useState('');
  const [ytThumbUrl, setYtThumbUrl] = useState('');
  const [ytThumbFile, setYtThumbFile] = useState<File | null>(null);

  // audio
  const [audioTitle, setAudioTitle] = useState('');
  const [audioDownloadable, setAudioDownloadable] = useState(true);

  const fileRef = useRef<HTMLInputElement>(null);
  const ytThumbRef = useRef<HTMLInputElement>(null);

  const headers = { 'x-admin-token': token };

  const fetchMedia = async (category: TabKey) => {
    setLoadingList(true);
    const res = await fetch(`/api/admin/media?category=${category}`, { headers });
    if (res.ok) {
      setMedia(await res.json());
    } else if (res.status === 401) {
      setToken('');
      localStorage.removeItem('gpcm_admin_token');
    }
    setLoadingList(false);
  };

  useEffect(() => {
    if (token) fetchMedia(tab);
  }, [token, tab]);

  const login = async () => {
    setLoginError('');
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
      const body = await res.json().catch(() => ({}));
      setLoginError(body.error || 'Wrong password');
    }
  };

  const logout = () => {
    setToken('');
    localStorage.removeItem('gpcm_admin_token');
  };

  // ---------- image upload (with crop) ----------
  const onPickImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const activeTab = TABS.find((t) => t.key === tab)!;
    setCropFile(file);
    setCropAspect(activeTab.aspect || 1);
    setCropTargetCategory(tab);
  };

  const uploadFile = async (file: File | Blob, filename: string, category: string, extra?: Record<string, string>) => {
    setUploading(true);
    const form = new FormData();
    form.append('file', file, filename);
    form.append('category', category);
    if (extra) Object.entries(extra).forEach(([k, v]) => form.append(k, v));

    const res = await fetch('/api/admin/upload', { method: 'POST', headers, body: form });
    if (res.ok) {
      await fetchMedia(tab);
    } else {
      const err = await res.json().catch(() => ({}));
      alert(err.error || 'Upload failed');
    }
    setUploading(false);
  };

  const onCropConfirm = async (blob: Blob) => {
    const name = (cropFile?.name || 'image').replace(/\.\w+$/, '.jpg');
    setCropFile(null);
    await uploadFile(blob, name, cropTargetCategory);
    if (fileRef.current) fileRef.current.value = '';
  };

  // ---------- video sermon: file upload ----------
  const onPickVideoFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await uploadFile(file, file.name, 'sermon_video');
    if (fileRef.current) fileRef.current.value = '';
  };

  // ---------- video sermon: youtube link ----------
  const submitYoutube = async () => {
    if (!ytUrl.trim()) return alert('Paste a YouTube link first');
    setUploading(true);

    let thumbnailUrl = ytThumbUrl.trim();
    if (ytThumbFile) {
      const form = new FormData();
      form.append('file', ytThumbFile);
      const res = await fetch('/api/admin/upload-thumbnail', { method: 'POST', headers, body: form });
      if (res.ok) {
        thumbnailUrl = (await res.json()).url;
      } else {
        setUploading(false);
        return alert('Thumbnail upload failed');
      }
    }

    const res = await fetch('/api/admin/youtube', {
      method: 'POST',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ youtubeUrl: ytUrl.trim(), title: ytTitle.trim() || undefined, thumbnailUrl: thumbnailUrl || undefined }),
    });

    if (res.ok) {
      setYtUrl('');
      setYtTitle('');
      setYtThumbUrl('');
      setYtThumbFile(null);
      if (ytThumbRef.current) ytThumbRef.current.value = '';
      await fetchMedia(tab);
    } else {
      const err = await res.json().catch(() => ({}));
      alert(err.error || 'Could not add YouTube video');
    }
    setUploading(false);
  };

  // ---------- audio upload ----------
  const onPickAudio = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await uploadFile(file, file.name, 'sermon_audio', {
      title: audioTitle.trim(),
      downloadable: String(audioDownloadable),
    });
    setAudioTitle('');
    if (fileRef.current) fileRef.current.value = '';
  };

  // ---------- shared actions ----------
  const setStatus = async (item: MediaItem, status: MediaItem['status']) => {
    await fetch(`/api/admin/media/${item.id}`, {
      method: 'PATCH',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    fetchMedia(tab);
  };

  const deleteItem = async (id: string) => {
    if (!confirm('Delete this permanently? This cannot be undone.')) return;
    await fetch(`/api/admin/media/${id}`, { method: 'DELETE', headers });
    fetchMedia(tab);
  };

  // ---------- Login screen ----------
  if (!token) {
    return (
      <div className="min-h-screen bg-gpcm-dark flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_30%_20%,white,transparent_60%)]" />
        <div className="bg-white/[0.06] backdrop-blur-xl border border-white/10 rounded-3xl p-10 max-w-md w-full relative animate-fade-in-down">
          <h1 className="font-serif text-3xl font-bold text-gpcm-cream mb-1">GPCM Admin</h1>
          <p className="text-gpcm-muted/70 text-sm mb-8">Enter password to manage site media</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && login()}
            placeholder="Admin password"
            className="w-full bg-white/5 border border-white/15 rounded-2xl px-5 py-4 text-gpcm-cream placeholder:text-gpcm-muted/40 mb-3 outline-none focus:ring-2 focus:ring-gpcm-amber"
          />
          {loginError && <p className="text-rose-400 text-sm mb-3">{loginError}</p>}
          <button
            onClick={login}
            className="w-full bg-gpcm-amber hover:bg-amber-500 text-gpcm-dark py-4 rounded-2xl font-semibold transition-colors"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  const activeTab = TABS.find((t) => t.key === tab)!;

  // ---------- Dashboard ----------
  return (
    <div className="min-h-screen bg-gpcm-light">
      <header className="bg-gpcm-dark sticky top-0 z-50 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <h1 className="font-serif text-xl font-bold text-gpcm-cream">GPCM Media Admin</h1>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-sm text-gpcm-muted hover:text-gpcm-cream transition-colors"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
        {/* Tabs */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex gap-1 overflow-x-auto no-scrollbar">
          {TABS.map((t) => {
            const Icon = t.icon;
            const isActive = tab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  isActive
                    ? 'border-gpcm-amber text-gpcm-amber'
                    : 'border-transparent text-gpcm-muted/70 hover:text-gpcm-cream'
                }`}
              >
                <Icon size={15} /> {t.label}
              </button>
            );
          })}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {/* Upload panel — changes shape per tab */}
        <div className="bg-white rounded-3xl border border-zinc-200 p-6 sm:p-8 mb-8 sm:mb-10 shadow-sm">
          <h2 className="font-serif text-lg font-bold text-gpcm-dark mb-4">
            {tab === 'sermon_video' ? 'Add a Video Sermon' : tab === 'sermon_audio' ? 'Add an Audio Message' : `Upload to ${activeTab.label}`}
          </h2>

          {/* Image tabs */}
          {(tab === 'gallery' || tab === 'leader' || tab === 'other') && (
            <label className="block cursor-pointer">
              <div className="border-2 border-dashed border-zinc-300 hover:border-gpcm-amber rounded-2xl p-8 text-center transition-colors">
                <Upload className="mx-auto mb-2 text-zinc-400" size={28} />
                <p className="text-sm text-zinc-600">
                  {uploading ? 'Uploading…' : 'Click to choose a JPG, PNG, or WEBP — you\u2019ll crop it before it publishes'}
                </p>
              </div>
              <input
                ref={fileRef}
                type="file"
                accept=".jpg,.jpeg,.png,.webp"
                className="hidden"
                onChange={onPickImage}
                disabled={uploading}
              />
            </label>
          )}

          {/* Video sermons */}
          {tab === 'sermon_video' && (
            <div>
              <div className="flex gap-2 mb-5">
                <button
                  onClick={() => setVideoMode('youtube')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border ${
                    videoMode === 'youtube' ? 'bg-gpcm-dark text-gpcm-cream border-gpcm-dark' : 'border-zinc-200 text-zinc-600'
                  }`}
                >
                  <Youtube size={15} /> YouTube link
                </button>
                <button
                  onClick={() => setVideoMode('upload')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border ${
                    videoMode === 'upload' ? 'bg-gpcm-dark text-gpcm-cream border-gpcm-dark' : 'border-zinc-200 text-zinc-600'
                  }`}
                >
                  <Film size={15} /> Upload file
                </button>
              </div>

              {videoMode === 'youtube' ? (
                <div className="space-y-3">
                  <input
                    value={ytUrl}
                    onChange={(e) => setYtUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gpcm-amber"
                  />
                  <input
                    value={ytTitle}
                    onChange={(e) => setYtTitle(e.target.value)}
                    placeholder="Title (optional)"
                    className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gpcm-amber"
                  />
                  <div className="grid sm:grid-cols-2 gap-3">
                    <input
                      value={ytThumbUrl}
                      onChange={(e) => setYtThumbUrl(e.target.value)}
                      placeholder="Custom thumbnail URL (optional)"
                      className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gpcm-amber"
                      disabled={!!ytThumbFile}
                    />
                    <label className="border border-dashed border-zinc-300 rounded-xl px-4 py-3 text-sm text-zinc-500 text-center cursor-pointer hover:border-gpcm-amber">
                      {ytThumbFile ? ytThumbFile.name : 'or upload a thumbnail image'}
                      <input
                        ref={ytThumbRef}
                        type="file"
                        accept=".jpg,.jpeg,.png,.webp"
                        className="hidden"
                        onChange={(e) => setYtThumbFile(e.target.files?.[0] || null)}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-zinc-400">Leave the thumbnail blank to auto-use YouTube's own thumbnail.</p>
                  <button
                    onClick={submitYoutube}
                    disabled={uploading}
                    className="bg-gpcm-dark text-gpcm-cream px-6 py-3 rounded-xl font-semibold text-sm hover:bg-gpcm-darkHover disabled:opacity-50"
                  >
                    {uploading ? 'Adding…' : 'Add Video Sermon'}
                  </button>
                </div>
              ) : (
                <label className="block cursor-pointer">
                  <div className="border-2 border-dashed border-zinc-300 hover:border-gpcm-amber rounded-2xl p-8 text-center transition-colors">
                    <Upload className="mx-auto mb-2 text-zinc-400" size={28} />
                    <p className="text-sm text-zinc-600">{uploading ? 'Uploading…' : 'Click to choose an MP4 or WEBM file'}</p>
                  </div>
                  <input
                    ref={fileRef}
                    type="file"
                    accept=".mp4,.webm"
                    className="hidden"
                    onChange={onPickVideoFile}
                    disabled={uploading}
                  />
                </label>
              )}
            </div>
          )}

          {/* Audio messages */}
          {tab === 'sermon_audio' && (
            <div className="space-y-3">
              <input
                value={audioTitle}
                onChange={(e) => setAudioTitle(e.target.value)}
                placeholder="Title (optional)"
                className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gpcm-amber"
              />
              <label className="flex items-center gap-2 text-sm text-zinc-600">
                <input
                  type="checkbox"
                  checked={audioDownloadable}
                  onChange={(e) => setAudioDownloadable(e.target.checked)}
                  className="accent-gpcm-amber"
                />
                Allow visitors to download this audio
              </label>
              <label className="block cursor-pointer">
                <div className="border-2 border-dashed border-zinc-300 hover:border-gpcm-amber rounded-2xl p-8 text-center transition-colors">
                  <Upload className="mx-auto mb-2 text-zinc-400" size={28} />
                  <p className="text-sm text-zinc-600">{uploading ? 'Uploading…' : 'Click to choose an MP3, M4A, or WAV file'}</p>
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  accept=".mp3,.m4a,.wav"
                  className="hidden"
                  onChange={onPickAudio}
                  disabled={uploading}
                />
              </label>
            </div>
          )}
        </div>

        {/* Media list for this tab */}
        {loadingList ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="aspect-video rounded-2xl skeleton-preload" />
            ))}
          </div>
        ) : media.length === 0 ? (
          <p className="text-center text-zinc-400 text-sm py-10">Nothing in {activeTab.label} yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {media.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm">
                <div className="aspect-video bg-zinc-100 relative">
                  {item.type === 'video' && item.source === 'youtube' ? (
                    <img src={item.thumbnailUrl} alt="" className="w-full h-full object-cover" />
                  ) : item.type === 'video' ? (
                    <video src={item.url} className="w-full h-full object-cover" muted />
                  ) : item.type === 'audio' ? (
                    <div className="w-full h-full flex items-center justify-center bg-gpcm-dark">
                      <Headphones size={32} className="text-gpcm-amber" />
                    </div>
                  ) : (
                    <img src={item.url} alt="" className="w-full h-full object-cover" />
                  )}
                  <div className="absolute top-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    {item.source === 'youtube' ? <Youtube size={12} /> : item.type === 'video' ? <Video size={12} /> : item.type === 'audio' ? <Headphones size={12} /> : <ImageIcon size={12} />}
                    {item.source === 'youtube' ? 'YouTube' : item.type}
                  </div>
                  <div className={`absolute top-3 right-3 text-xs px-2 py-1 rounded-full border font-medium capitalize ${STATUS_STYLES[item.status]}`}>
                    {item.status}
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <p className="text-sm font-medium truncate text-zinc-800">{item.title || item.originalName}</p>
                  <p className="flex items-center gap-1 text-xs text-zinc-400">
                    <Clock size={12} /> {fmtDate(item.createdAt)}
                  </p>

                  {item.type === 'audio' && <audio controls src={item.url} className="w-full h-8" preload="none" />}

                  <div className="flex gap-2">
                    {item.status !== 'published' && (
                      <button
                        onClick={() => setStatus(item, 'published')}
                        className="flex-1 flex items-center justify-center gap-1 text-sm py-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                      >
                        <Check size={14} /> Publish
                      </button>
                    )}
                    {item.status !== 'rejected' && (
                      <button
                        onClick={() => setStatus(item, 'rejected')}
                        className="flex-1 flex items-center justify-center gap-1 text-sm py-2 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100"
                      >
                        <XCircle size={14} /> Reject
                      </button>
                    )}
                  </div>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="w-full flex items-center justify-center gap-1 text-sm py-2 rounded-xl bg-zinc-50 text-zinc-500 hover:bg-zinc-100"
                  >
                    <Trash2 size={14} /> Delete permanently
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {cropFile && (
        <ImageCropModal
          file={cropFile}
          aspect={cropAspect}
          label={`Crop for ${TABS.find((t) => t.key === cropTargetCategory)?.label}`}
          onCancel={() => {
            setCropFile(null);
            if (fileRef.current) fileRef.current.value = '';
          }}
          onConfirm={onCropConfirm}
        />
      )}
    </div>
  );
}
