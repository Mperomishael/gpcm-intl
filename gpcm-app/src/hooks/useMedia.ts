// src/hooks/useMedia.ts
import { useState, useEffect, useCallback } from 'react';

export interface MediaItem {
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

export function useMedia(category?: string) {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMedia = useCallback(async () => {
    try {
      const res = await fetch('/api/media');
      const data: MediaItem[] = await res.json();
      const filtered = category
        ? data.filter((m) => m.category === category)
        : data;
      setMedia(filtered);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  return { media, loading, refresh: fetchMedia };
}
