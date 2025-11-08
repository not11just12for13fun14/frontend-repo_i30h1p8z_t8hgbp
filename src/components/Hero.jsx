import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Rocket, Music, PauseCircle, PlayCircle } from 'lucide-react';
import Spline from '@splinetool/react-spline';

const lines = [
  'Pawan Kalyan • Haschwalth',
  'Crafting immersive, cosmic web experiences',
  'Full‑Stack • AI • DSA • ML',
];

function useTypewriter(sequence, speed = 30, lineDelay = 500) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    let mounted = true;
    let timer;

    const typeLine = async () => {
      if (!mounted || index >= sequence.length) return;
      const line = sequence[index];
      for (let i = 0; i <= line.length; i++) {
        if (!mounted) return;
        setText(line.slice(0, i));
        // eslint-disable-next-line no-loop-func
        await new Promise((r) => (timer = setTimeout(r, speed)));
      }
      setCompleted((c) => [...c, line]);
      setText('');
      await new Promise((r) => (timer = setTimeout(r, lineDelay)));
      setIndex((i) => i + 1);
    };

    typeLine();
    return () => {
      mounted = false;
      if (timer) clearTimeout(timer);
    };
  }, [index, sequence, speed, lineDelay]);

  return { current: text, completed };
}

export default function Hero() {
  const { current, completed } = useTypewriter(lines, 28, 400);
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [splineReady, setSplineReady] = useState(false);
  const [mountSpline, setMountSpline] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Defer mounting Spline to next tick to avoid blocking first paint
  useEffect(() => {
    const id = setTimeout(() => setMountSpline(true), 0);
    return () => clearTimeout(id);
  }, []);

  // Soft waves CSS for playing state
  const waves = useMemo(
    () => (
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute -inset-8 rounded-full blur-3xl transition-opacity ${
            playing ? 'opacity-60' : 'opacity-0'
          }`}
          style={{
            background:
              'radial-gradient(60% 60% at 50% 50%, rgba(0,255,255,0.15), rgba(0,0,0,0))',
          }}
        />
      </div>
    ),
    [playing]
  );

  const togglePlayback = () => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      el.volume = 0.2; // 20%
      el.play();
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  const scrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="hero" className="relative h-[100svh] w-full overflow-hidden bg-black text-white">
      {/* Background layer: static gradient + stars as instant fallback */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(17,24,39,1)_0%,rgba(0,0,0,1)_60%)]" />
        <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\" viewBox=\"0 0 100 100\"><circle cx=\"2\" cy=\"2\" r=\"1\" fill=\"white\" opacity=\"0.45\"/><circle cx=\"50\" cy=\"30\" r=\"1\" fill=\"white\" opacity=\"0.35\"/><circle cx=\"80\" cy=\"70\" r=\"1\" fill=\"white\" opacity=\"0.4\"/></svg>')]" />
      </div>

      {/* Spline 3D Cover (deferred mount + onLoad) */}
      {mountSpline && !prefersReducedMotion && (
        <div className="absolute inset-0">
          <Spline
            scene="https://prod.spline.design/7m4PRZ7kg6K1jPfF/scene.splinecode"
            style={{ width: '100%', height: '100%' }}
            onLoad={() => setSplineReady(true)}
          />
        </div>
      )}

      {/* Readability gradient overlay (non-blocking) */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.55)_55%,rgba(0,0,0,0.85)_100%)]" />
      </div>

      {/* Lightweight loading indicator shown until Spline signals ready */}
      {!splineReady && !prefersReducedMotion && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-10 w-10 animate-pulse rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 blur-[1px]" />
        </div>
      )}

      {/* NAVBAR */}
      <nav className="relative z-10 flex items-center justify-between px-6 lg:px-12 py-5">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 p-[2px]">
            <div className="h-full w-full rounded-full bg-black/80 backdrop-blur"></div>
          </div>
          <span className="font-semibold tracking-wide">Haschwalth</span>
        </div>
        <div className="flex items-center gap-4 sm:gap-6 text-sm">
          <a href="#about" className="hover:text-cyan-300 transition">About</a>
          <a href="#projects" className="hover:text-cyan-300 transition">Projects</a>
          <a href="#github" className="hover:text-cyan-300 transition">GitHub</a>
          <a href="#blog" className="hover:text-cyan-300 transition">Blog</a>
          <a href="#contact" className="hover:text-cyan-300 transition">Contact</a>
          {/* Music Player */}
          <button
            aria-label={playing ? 'Pause music' : 'Play music'}
            onClick={togglePlayback}
            className={`relative inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 transition ${
              playing ? 'bg-white/10 shadow-[0_0_24px_rgba(34,211,238,0.35)]' : 'bg-white/5'
            }`}
          >
            <Music className={`h-4 w-4 ${playing ? 'text-cyan-300' : 'text-white/80'}`} />
            <span className="hidden sm:inline">Theme: Time</span>
            {playing ? (
              <PauseCircle className="h-4 w-4 text-cyan-300" />
            ) : (
              <PlayCircle className="h-4 w-4 text-white/80" />
            )}
            {waves}
          </button>
          <audio
            ref={audioRef}
            preload="none"
            src="https://cdn.pixabay.com/download/audio/2023/03/07/audio_bbf87b5a1a.mp3?filename=ambient-145038.mp3"
            onEnded={() => setPlaying(false)}
          />
        </div>
      </nav>

      {/* HERO CONTENT */}
      <div className="relative z-10 h-[calc(100svh-72px)] flex flex-col items-center justify-center text-center px-6">
        {/* Avatar with safe fallback */}
        <div className="relative mb-6">
          <img
            src="/logo.png"
            alt="Profile avatar"
            className="h-20 w-20 sm:h-24 sm:w-24 rounded-full object-cover ring-2 ring-white/10 shadow-lg shadow-cyan-500/10"
            onError={(e) => {
              const target = e.currentTarget;
              target.style.display = 'none';
            }}
          />
          <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 ring-2 ring-white/10 shadow-lg shadow-purple-500/10" />
          {/* Reflection */}
          <div className="absolute left-1/2 top-full mt-2 h-6 w-28 -translate-x-1/2 rounded-[50%] bg-gradient-to-b from-cyan-300/30 to-transparent blur-md" />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight"
        >
          Journey Through My Cosmos
        </motion.h1>

        {/* Typewriter tagline */}
        <div className="mt-4 min-h-[84px] flex flex-col items-center">
          {completed.map((l, i) => (
            <div key={i} className="text-base sm:text-lg text-white/80">{l}</div>
          ))}
          <AnimatePresence>
            {current && (
              <motion.div
                key={current}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-base sm:text-lg text-white/80"
              >
                {current}<span className="animate-pulse">▌</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CTA */}
        <motion.button
          onClick={scrollToAbout}
          whileHover={{ scale: 1.05, boxShadow: '0 0 24px rgba(34,211,238,0.55)' }}
          whileTap={{ scale: 0.98 }}
          className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-3 font-medium text-white shadow-lg shadow-cyan-500/30"
        >
          <Rocket className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
          Explore My Universe
        </motion.button>
      </div>
    </section>
  );
}
