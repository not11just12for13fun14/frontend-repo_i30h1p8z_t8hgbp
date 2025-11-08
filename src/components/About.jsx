import { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

const skills = [
  { title: 'Full Stack', color: 'from-cyan-500 to-blue-600' },
  { title: 'AI', color: 'from-purple-500 to-pink-600' },
  { title: 'DSA', color: 'from-amber-500 to-orange-600' },
  { title: 'ML', color: 'from-emerald-500 to-teal-600' },
];

const timeline = [
  { year: '2020', text: 'Started coding journey • basics of C/JavaScript' },
  { year: '2021', text: 'Explored web fundamentals • HTML/CSS/JS' },
  { year: '2022', text: 'Built full‑stack apps • React, Node, DBs' },
  { year: '2023', text: 'Dove into AI/ML • models, data, deployment' },
  { year: '2024', text: 'Refined problem solving • DSA & systems' },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [inView, controls]);

  return (
    <section id="about" className="relative py-24 bg-black text-white overflow-hidden">
      {/* Parallax star field */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.06),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(236,72,153,0.06),transparent_40%),radial-gradient(circle_at_40%_80%,rgba(16,185,129,0.06),transparent_40%)]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\" viewBox=\"0 0 100 100\"><circle cx=\"2\" cy=\"2\" r=\"1\" fill=\"white\" opacity=\"0.4\"/><circle cx=\"50\" cy=\"30\" r=\"1\" fill=\"white\" opacity=\"0.3\"/><circle cx=\"80\" cy=\"70\" r=\"1\" fill=\"white\" opacity=\"0.35\"/></svg>')] opacity-30 animate-[pulse_6s_ease-in-out_infinite]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-semibold">About</h2>
          <p className="text-white/70 mt-2">A quick journey through the stars of my learning path</p>
        </div>

        {/* Timeline */}
        <div ref={ref} className="relative">
          <motion.div
            initial="hidden"
            animate={controls}
            variants={{
              visible: { transition: { staggerChildren: 0.15 } },
            }}
            className="relative border-l border-white/10 pl-6"
          >
            {timeline.map((t, i) => (
              <motion.div
                key={t.year}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="relative mb-8"
              >
                <div className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 shadow-[0_0_12px_rgba(34,211,238,0.6)]" />
                <div className="text-sm text-white/60">{t.year}</div>
                <div className="text-lg">{t.text}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Skills */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
          {skills.map((s) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              whileHover={{ rotateX: 6, rotateY: -6, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
              className={`group relative rounded-xl p-6 bg-gradient-to-br ${s.color} [--ring:rgba(34,211,238,0.35)] shadow-[0_0_0_1px_rgba(255,255,255,0.06)]`}
            >
              <div className="absolute inset-px rounded-xl bg-black/70 backdrop-blur-sm" />
              <div className="relative">
                <div className="text-xl font-semibold">{s.title}</div>
                <div className="mt-2 text-sm text-white/70">Exploring the edges of {s.title} to build delightful experiences.</div>
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-xl ring-0 ring-cyan-400/0 group-hover:ring-4 group-hover:ring-cyan-400/30 transition" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
