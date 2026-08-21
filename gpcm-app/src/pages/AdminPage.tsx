// src/pages/AdminPage.tsx
import { useEffect, useRef, useState } from 'react';
import {
  Upload, Trash2, Image as ImageIcon, Video, Headphones,
  UserSquare2, FolderOpen, Check, XCircle, Youtube, Film, Clock,
} from 'lucide-react';
import ImageCropModal from '../components/admin/ImageCropModal';
import AdminLogin from '../components/admin/AdminLogin';
import AdminNav from '../components/admin/AdminNav';
import UploadProgressOverlay from '../components/admin/UploadProgressOverlay';
import { useGlassFeedback } from '../components/admin/GlassFeedback';

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
  pending: 'bg-admin-gold/15 text-admin-goldHover border-admin-gold/30',
  published: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  rejected: 'bg-rose-100 text-rose-700 border-rose-200',
};

/** POST a FormData payload with real upload-progress events (fetch can't do this reliably). */
function uploadWithProgress(
  url: string,
  form: FormData,
  headers: Record<string, string>,
  onProgress: (pct: number) => void
): Promise<any> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    Object.entries(headers).forEach(([k, v]) => xhr.setRequestHeader(k, v));
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100));
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          resolve(xhr.responseText ? JSON.parse(xhr.responseText) : null);
        } catch {
          resolve(null);
        }
      } else {
        let message = 'Upload failed';
        try {
          message = JSON.parse(xhr.responseText)?.error || message;
        } catch {
          /* ignore */
        }
        reject(new Error(message));
      }
    };
    xhr.onerror = () => reject(new Error('Network error during upload'));
    xhr.send(form);
  });
}

export default function AdminPage() {
  const { notify, confirmAction, FeedbackHost } = useGlassFeedback();

  const [token, setToken] = useState(localStorage.getItem('gpcm_admin_token') || '');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [tab, setTab] = useState<TabKey>('gallery');
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loadingList, setLoadingList] = useState(false);

  // upload progress overlay state
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadPhase, setUploadPhase] = useState<'uploading' | 'processing' | 'done'>('uploading');
  const [uploadFileName, setUploadFileName] = useState('');

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
    setUploadProgress(0);
    setUploadPhase('uploading');
    setUploadFileName(filename);

    const form = new FormData();
    form.append('file', file, filename);
    form.append('category', category);
    if (extra) Object.entries(extra).forEach(([k, v]) => form.append(k, v));

    try {
      await uploadWithProgress('/api/admin/upload', form, headers, setUploadProgress);
      setUploadPhase('processing');
      await fetchMedia(tab);
      setUploadPhase('done');
      notify('Uploaded! Tap “Publish” below to make it live on the site.', 'success');
      await new Promise((r) => setTimeout(r, 850));
    } catch (err: any) {
      notify(err.message || 'Upload failed', 'error');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
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
    if (!ytUrl.trim()) return notify('Paste a YouTube link first', 'error');
    setUploading(true);
    setUploadPhase('uploading');
    setUploadProgress(0);
    setUploadFileName(ytTitle.trim() || 'YouTube video');

    let thumbnailUrl = ytThumbUrl.trim();
    try {
      if (ytThumbFile) {
        const f = new FormData();
        f.append('file', ytThumbFile);
        const res = await uploadWithProgress('/api/admin/upload-thumbnail', f, headers, setUploadProgress);
        thumbnailUrl = res?.url || thumbnailUrl;
      } else {
        setUploadProgress(60);
      }

      setUploadPhase('processing');
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
        setUploadPhase('done');
        notify('YouTube video added! Tap “Publish” to make it live.', 'success');
        await new Promise((r) => setTimeout(r, 850));
      } else {
        const err = await res.json().catch(() => ({}));
        notify(err.error || 'Could not add YouTube video', 'error');
      }
    } catch (err: any) {
      notify(err.message || 'Thumbnail upload failed', 'error');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
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
    const res = await fetch(`/api/admin/media/${item.id}`, {
      method: 'PATCH',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      notify(status === 'published' ? 'Published — now live on the site.' : 'Marked as rejected.', 'success');
    } else {
      notify('Could not update status', 'error');
    }
    fetchMedia(tab);
  };

  const deleteItem = async (id: string) => {
    const ok = await confirmAction({
      title: 'Delete permanently?',
      message: 'This removes the file and its record for good. This cannot be undone.',
      confirmLabel: 'Delete',
      danger: true,
    });
    if (!ok) return;
    const res = await fetch(`/api/admin/media/${id}`, { method: 'DELETE', headers });
    notify(res.ok ? 'Deleted.' : 'Delete failed', res.ok ? 'success' : 'error');
    fetchMedia(tab);
  };

  // ---------- Login screen ----------
  if (!token) {
    return (
      <>
        <AdminLogin password={password} setPassword={setPassword} loginError={loginError} onLogin={login} />
        <FeedbackHost />
      </>
    );
  }

  const activeTab = TABS.find((t) => t.key === tab)!;

  // ---------- Dashboard ----------
  return (
    <div className="min-h-screen bg-admin-milkSoft">
      <AdminNav title="GPCM Media Admin" tabs={TABS} activeTab={tab} onTabChange={(k) => setTab(k as TabKey)} onLogout={logout} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Upload panel — changes shape per tab */}
        <div className="bg-white rounded-3xl border border-admin-purple/10 p-5 sm:p-8 mb-6 sm:mb-10 shadow-sm">
          <h2 className="font-serif text-lg font-bold text-admin-purple mb-4">
            {tab === 'sermon_video' ? 'Add a Video Sermon' : tab === 'sermon_audio' ? 'Add an Audio Message' : `Upload to ${activeTab.label}`}
          </h2>

          {/* Image tabs */}
          {(tab === 'gallery' || tab === 'leader' || tab === 'other') && (
            <label className="block cursor-pointer">
              <div className="border-2 border-dashed border-admin-purple/20 hover:border-admin-gold rounded-2xl p-8 text-center transition-colors">
                <Upload className="mx-auto mb-2 text-admin-purple/40" size={28} />
                <p className="text-sm text-admin-purple/70">
                  {uploading ? 'Uploading…' : 'Tap to choose a JPG, PNG, or WEBP — you\u2019ll crop it before it publishes'}
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
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
                    videoMode === 'youtube' ? 'bg-admin-purple text-admin-milk border-admin-purple' : 'border-admin-purple/15 text-admin-purple/70'
                  }`}
                >
                  <Youtube size={15} /> YouTube link
                </button>
                <button
                  onClick={() => setVideoMode('upload')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
                    videoMode === 'upload' ? 'bg-admin-purple text-admin-milk border-admin-purple' : 'border-admin-purple/15 text-admin-purple/70'
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
                    className="w-full border border-admin-purple/15 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-admin-gold"
                  />
                  <input
                    value={ytTitle}
                    onChange={(e) => setYtTitle(e.target.value)}
                    placeholder="Title (optional)"
                    className="w-full border border-admin-purple/15 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-admin-gold"
                  />
                  <div className="grid sm:grid-cols-2 gap-3">
                    <input
                      value={ytThumbUrl}
                      onChange={(e) => setYtThumbUrl(e.target.value)}
                      placeholder="Custom thumbnail URL (optional)"
                      className="w-full border border-admin-purple/15 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-admin-gold"
                      disabled={!!ytThumbFile}
                    />
                    <label className="border border-dashed border-admin-purple/25 rounded-xl px-4 py-3 text-sm text-admin-purple/60 text-center cursor-pointer hover:border-admin-gold">
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
                  <p className="text-xs text-admin-purple/40">Leave the thumbnail blank to auto-use YouTube's own thumbnail.</p>
                  <button
                    onClick={submitYoutube}
                    disabled={uploading}
                    className="bg-admin-purple text-admin-milk px-6 py-3 rounded-xl font-semibold text-sm hover:bg-admin-purpleHover disabled:opacity-50 transition-colors"
                  >
                    {uploading ? 'Adding…' : 'Add Video Sermon'}
                  </button>
                </div>
              ) : (
                <label className="block cursor-pointer">
                  <div className="border-2 border-dashed border-admin-purple/20 hover:border-admin-gold rounded-2xl p-8 text-center transition-colors">
                    <Upload className="mx-auto mb-2 text-admin-purple/40" size={28} />
                    <p className="text-sm text-admin-purple/70">{uploading ? 'Uploading…' : 'Tap to choose an MP4 or WEBM file'}</p>
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
                className="w-full border border-admin-purple/15 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-admin-gold"
              />
              <label className="flex items-center gap-2 text-sm text-admin-purple/70">
                <input
                  type="checkbox"
                  checked={audioDownloadable}
                  onChange={(e) => setAudioDownloadable(e.target.checked)}
                  className="accent-admin-gold"
                />
                Allow visitors to download this audio
              </label>
              <label className="block cursor-pointer">
                <div className="border-2 border-dashed border-admin-purple/20 hover:border-admin-gold rounded-2xl p-8 text-center transition-colors">
                  <Upload className="mx-auto mb-2 text-admin-purple/40" size={28} />
                  <p className="text-sm text-admin-purple/70">{uploading ? 'Uploading…' : 'Tap to choose an MP3, M4A, or WAV file'}</p>
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="aspect-video rounded-2xl skeleton-preload" />
            ))}
          </div>
        ) : media.length === 0 ? (
          <p className="text-center text-admin-purple/40 text-sm py-10">Nothing in {activeTab.label} yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {media.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl border border-admin-purple/10 overflow-hidden shadow-sm">
                <div className="aspect-video bg-admin-milkSoft relative">
                  {item.type === 'video' && item.source === 'youtube' ? (
                    <img src={item.thumbnailUrl} alt="" className="w-full h-full object-cover" />
                  ) : item.type === 'video' ? (
                    <video src={item.url} className="w-full h-full object-cover" muted />
                  ) : item.type === 'audio' ? (
                    <div className="w-full h-full flex items-center justify-center bg-admin-purple">
                      <Headphones size={32} className="text-admin-gold" />
                    </div>
                  ) : (
                    <img src={item.url} alt="" className="w-full h-full object-cover" />
                  )}
                  <div className="absolute top-3 left-3 bg-admin-purple/70 backdrop-blur-sm text-admin-milk text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    {item.source === 'youtube' ? <Youtube size={12} /> : item.type === 'video' ? <Video size={12} /> : item.type === 'audio' ? <Headphones size={12} /> : <ImageIcon size={12} />}
                    {item.source === 'youtube' ? 'YouTube' : item.type}
                  </div>
                  <div className={`absolute top-3 right-3 text-xs px-2 py-1 rounded-full border font-medium capitalize ${STATUS_STYLES[item.status]}`}>
                    {item.status}
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <p className="text-sm font-medium truncate text-admin-purple">{item.title || item.originalName}</p>
                  <p className="flex items-center gap-1 text-xs text-admin-purple/40">
                    <Clock size={12} /> {fmtDate(item.createdAt)}
                  </p>

                  {item.type === 'audio' && <audio controls src={item.url} className="w-full h-8" preload="none" />}

                  <div className="flex gap-2">
                    {item.status !== 'published' && (
                      <button
                        onClick={() => setStatus(item, 'published')}
                        className="flex-1 flex items-center justify-center gap-1 text-sm py-2.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                      >
                        <Check size={14} /> Publish
                      </button>
                    )}
                    {item.status !== 'rejected' && (
                      <button
                        onClick={() => setStatus(item, 'rejected')}
                        className="flex-1 flex items-center justify-center gap-1 text-sm py-2.5 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors"
                      >
                        <XCircle size={14} /> Reject
                      </button>
                    )}
                  </div>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="w-full flex items-center justify-center gap-1 text-sm py-2.5 rounded-xl bg-admin-milkSoft text-admin-purple/50 hover:bg-admin-purple/10 hover:text-admin-purple transition-colors"
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

      {uploading && (
        <UploadProgressOverlay progress={uploadProgress} fileName={uploadFileName} phase={uploadPhase} />
      )}

      <FeedbackHost />
    </div>
  );
}
