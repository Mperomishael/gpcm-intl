import { useCallback, useRef, useState } from 'react';
import { ZoomIn, Check, X } from 'lucide-react';

interface Props {
  file: File;
  aspect: number; // width / height, e.g. 1 for square, 0.8 for 4:5, 16/9 for video thumb
  label: string;
  onCancel: () => void;
  onConfirm: (blob: Blob) => void;
}

const CONTAINER_W = 320;

export default function ImageCropModal({ file, aspect, label, onCancel, onConfirm }: Props) {
  const containerH = Math.round(CONTAINER_W / aspect);
  const [imgUrl] = useState(() => URL.createObjectURL(file));
  const [natural, setNatural] = useState<{ w: number; h: number } | null>(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragState = useRef<{ startX: number; startY: number; origX: number; origY: number } | null>(null);
  const [busy, setBusy] = useState(false);

  const onImgLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setNatural({ w: img.naturalWidth, h: img.naturalHeight });
  };

  const baseScale = natural
    ? Math.max(CONTAINER_W / natural.w, containerH / natural.h)
    : 1;
  const displayScale = baseScale * zoom;

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture(e.pointerId);
    dragState.current = { startX: e.clientX, startY: e.clientY, origX: offset.x, origY: offset.y };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragState.current) return;
    const dx = e.clientX - dragState.current.startX;
    const dy = e.clientY - dragState.current.startY;
    setOffset({ x: dragState.current.origX + dx, y: dragState.current.origY + dy });
  };
  const onPointerUp = () => {
    dragState.current = null;
  };

  const confirm = useCallback(() => {
    if (!natural) return;
    setBusy(true);

    const img = new window.Image();
    img.onload = () => {
      const dispX = (CONTAINER_W - natural.w * displayScale) / 2 + offset.x;
      const dispY = (containerH - natural.h * displayScale) / 2 + offset.y;

      let sx = (0 - dispX) / displayScale;
      let sy = (0 - dispY) / displayScale;
      let sw = CONTAINER_W / displayScale;
      let sh = containerH / displayScale;

      // Clamp to image bounds
      sx = Math.max(0, Math.min(sx, natural.w - sw));
      sy = Math.max(0, Math.min(sy, natural.h - sh));
      sw = Math.min(sw, natural.w);
      sh = Math.min(sh, natural.h);

      const outW = 1000;
      const outH = Math.round(1000 / aspect);
      const canvas = document.createElement('canvas');
      canvas.width = outW;
      canvas.height = outH;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, outW, outH);

      canvas.toBlob(
        (blob) => {
          setBusy(false);
          if (blob) onConfirm(blob);
        },
        'image/jpeg',
        0.9
      );
    };
    img.src = imgUrl;
  }, [natural, displayScale, offset, containerH, aspect, imgUrl, onConfirm]);

  return (
    <div className="fixed inset-0 z-[300] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-lg font-bold text-gpcm-dark">{label}</h3>
          <button onClick={onCancel} className="text-zinc-400 hover:text-zinc-700">
            <X size={20} />
          </button>
        </div>

        <p className="text-xs text-zinc-500 mb-3">Drag to reposition, use the slider to zoom, then confirm.</p>

        <div
          className="mx-auto rounded-2xl overflow-hidden border-2 border-gpcm-amber/40 relative touch-none select-none cursor-grab active:cursor-grabbing bg-zinc-100"
          style={{ width: CONTAINER_W, height: containerH }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          <img
            src={imgUrl}
            onLoad={onImgLoad}
            draggable={false}
            alt="Crop preview"
            className="absolute top-1/2 left-1/2 max-w-none pointer-events-none"
            style={{
              transform: `translate(-50%, -50%) translate(${offset.x}px, ${offset.y}px) scale(${displayScale})`,
              width: natural?.w,
              height: natural?.h,
            }}
          />
        </div>

        <div className="flex items-center gap-3 mt-4">
          <ZoomIn size={16} className="text-zinc-400 shrink-0" />
          <input
            type="range"
            min={1}
            max={3}
            step={0.01}
            value={zoom}
            onChange={(e) => setZoom(parseFloat(e.target.value))}
            className="w-full accent-gpcm-amber"
          />
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-2xl border border-zinc-200 text-zinc-600 font-medium hover:bg-zinc-50"
          >
            Cancel
          </button>
          <button
            onClick={confirm}
            disabled={busy || !natural}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-gpcm-dark text-gpcm-cream font-semibold hover:bg-gpcm-darkHover disabled:opacity-50"
          >
            <Check size={16} /> {busy ? 'Processing…' : 'Confirm & Upload'}
          </button>
        </div>
      </div>
    </div>
  );
}
