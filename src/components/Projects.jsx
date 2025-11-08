import { motion } from 'framer-motion';
import { Github } from 'lucide-react';

const projects = [
  {
    title: 'Featured: Nebula Navigator',
    tech: ['Next.js', 'Framer Motion', 'Three.js'],
    github: 'https://github.com/Cintu07',
    featured: true,
  },
  {
    title: 'Stellar Blog Engine',
    tech: ['Node', 'Express', 'MongoDB'],
    github: 'https://github.com/Cintu07',
  },
  {
    title: 'Cosmic Portfolio',
    tech: ['React', 'Tailwind'],
    github: 'https://github.com/Cintu07',
  },
  {
    title: 'Orbit Planner',
    tech: ['Python', 'FastAPI'],
    github: 'https://github.com/Cintu07',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 bg-black text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-semibold">Projects</h2>
          <p className="text-white/70 mt-2">A constellation of works with glowing interactions</p>
        </div>

        {/* Masonry-style responsive grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]"><div className="grid gap-6">
          {projects.map((p, idx) => (
            <motion.a
              key={p.title}
              href={p.github}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -4, scale: 1.01 }}
              className={`group relative block break-inside-avoid rounded-xl p-6 bg-gradient-to-br from-white/10 to-white/5`}
            >
              <div className="absolute inset-0 rounded-xl ring-1 ring-white/10" />
              <div className="relative">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xl font-semibold">{p.title}</h3>
                  <Github className="h-5 w-5 text-white/70 group-hover:text-cyan-300 transition" />
                </div>
                <div className="mt-2 flex flex-wrap gap-2 text-xs text-white/70">
                  {p.tech.map((t) => (
                    <span key={t} className="rounded-full bg-white/10 px-2 py-1">{t}</span>
                  ))}
                </div>
              </div>
              {/* Hover glow */}
              <div className="pointer-events-none absolute inset-0 rounded-xl ring-0 ring-cyan-400/0 group-hover:ring-2 group-hover:ring-cyan-400/40 transition" />
              {p.featured && (
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-xl"
                  animate={{ boxShadow: ['0 0 0 0 rgba(34,211,238,0.0)', '0 0 0 12px rgba(34,211,238,0.18)', '0 0 0 0 rgba(34,211,238,0.0)'] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}
            </motion.a>
          ))}
        </div></div>
      </div>
    </section>
  );
}
