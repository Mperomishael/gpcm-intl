import React, { useState, useRef, useEffect } from 'react';

const MESSAGES = [
  {
    title: "Welcome to GPCM INT'L",
    subtitle: 'A place where lives are transformed',
  },
  {
    title: 'We Matter in God’s Sight',
    subtitle: 'Loved • Valued • Called for a purpose',
  },
];

const MIN_LOADER_MS = 4500;

export default function HeroSection() {
  const [videoReady, setVideoReady] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const loadStartRef = useRef<number>(Date.now());

  const [msgIndex, setMsgIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [phase, setPhase] = useState<'typing' | 'holding' | 'exiting'>('typing');

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    loadStartRef.current = Date.now();

    const hideLoader = () => {
      const elapsed = Date.now() - loadStartRef.current;
      const remaining = Math.max(0, MIN_LOADER_MS - elapsed);
      setTimeout(() => setShowLoader(false), remaining);
    };

    const handleCanPlay = () => {
      setVideoReady(true);
      hideLoader();
    };

    if (video.readyState >= 3) {
      handleCanPlay();
    } else {
      video.addEventListener('canplay', handleCanPlay);
      const safety = setTimeout(() => {
        setVideoReady(true);
        hideLoader();
      }, 12000);
      return () => {
        video.removeEventListener('canplay', handleCanPlay);
        clearTimeout(safety);
      };
    }
    return () => video.removeEventListener('canplay', handleCanPlay);
  }, []);

  useEffect(() => {
    if (!videoReady || showLoader) return;

    const current = MESSAGES[msgIndex];
    let charIndex = 0;
    let typingTimer: ReturnType<typeof setTimeout>;
    let holdTimer: ReturnType<typeof setTimeout>;
    let exitTimer: ReturnType<typeof setTimeout>;

    setTypedText('');
    setShowSubtitle(false);
    setPhase('typing');

    const typeNext = () => {
      if (charIndex <= current.title.length) {
        setTypedText(current.title.slice(0, charIndex));
        charIndex += 1;

        const lastChar = current.title[charIndex - 2];
        const delay =
          lastChar === ' ' ? 120 :
          lastChar === "'" || lastChar === '’' ? 180 :
          55 + Math.random() * 35;

        typingTimer = setTimeout(typeNext, delay);
      } else {
        setShowSubtitle(true);
        setPhase('holding');

        holdTimer = setTimeout(() => {
          setPhase('exiting');
          setShowSubtitle(false);

          exitTimer = setTimeout(() => {
            setMsgIndex((prev) => (prev + 1) % MESSAGES.length);
          }, 700);
        }, 4200);
      }
    };

    typingTimer = setTimeout(typeNext, 500);

    return () => {
      clearTimeout(typingTimer);
      clearTimeout(holdTimer);
      clearTimeout(exitTimer);
    };
  }, [msgIndex, videoReady, showLoader]);
