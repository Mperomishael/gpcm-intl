import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured, mapMediaRow } from '../lib/supabase';

export interface MediaItem {
  id: string;
  filename: string;
  originalName: string;
  url: string;
  type: 'image' | 'video' | 'audio';
  category: string;
  title?: string;
  description?: string;
  order: number;
  hidden: boolean;
  createdAt: string;
  storagePath?: string;
}

export function useMedia(category?: string) {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMedia = useCallback(async () => {
    setLoading(true);
    try {
      if (isSupabaseConfigured && supabase) {
        let q = supabase
          .from('media')
          .select('*')
          .eq('hidden', false)
          .order('order', { ascending: true });

        if (category) q = q.eq('category', category);

        const { data, error } = await q;
        if (error) throw error;
        setMedia((data ?? []).map(mapMediaRow));
      } else {
        const res = await fetch('/api/media');
        if (!res.ok) {
          setMedia([]);
          return;
        }
        const data: MediaItem[] = await res.json();
        const filtered = category
          ? data.filter((m) => m.category === category)
          : data;
        setMedia(filtered);
      }
    } catch (err) {
      console.error('useMedia', err);
      setMedia([]);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  return { media, loading, refresh: fetchMedia };
}
