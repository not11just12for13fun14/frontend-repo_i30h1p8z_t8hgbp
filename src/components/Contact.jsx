import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter, ArrowUp } from 'lucide-react';

const links = [
  { href: 'https://github.com/Cintu07', label: 'GitHub', icon: Github },
  { href: 'https://linkedin.com/in/pavankalyan-kolagani', label: 'LinkedIn', icon: Linkedin },
  { href: 'https://x.com/pawankalyandev', label: 'X (Twitter)', icon: Twitter },
  { href: 'mailto:kolagani.pavankalyan2003@gmail.com', label: 'Email', icon: Mail },
];

export default function Contact() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <section id="contact" className="relative py-24 bg-black text-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-semibold">Contact</h2>
          <p className="text-white/70 mt-2">Let\'s connect across the cosmos</p>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {links.map((l) => (
            <a key={l.label} href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="group flex flex-col items-center gap-2 rounded-xl bg-white/5 p-4 ring-1 ring-white/10 transition hover:ring-cyan-400/40">
              <l.icon className="h-6 w-6 text-white/80 transition group-hover:text-cyan-300 group-hover:scale-110" />
              <span className="text-sm">{l.label}</span>
            </a>
          ))}
        </div>

        {/* Minimal form using Formspree */}
        <form action="https://formspree.io/f/mzbnznlr" method="POST" className="mt-10 grid gap-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <input name="name" required placeholder="Name" className="w-full rounded-md bg-white/5 px-4 py-3 outline-none ring-1 ring-white/10 focus:ring-cyan-400/40" />
            <input type="email" name="email" required placeholder="Email" className="w-full rounded-md bg-white/5 px-4 py-3 outline-none ring-1 ring-white/10 focus:ring-cyan-400/40" />
          </div>
          <textarea name="message" required placeholder="Message" rows={5} className="w-full rounded-md bg-white/5 px-4 py-3 outline-none ring-1 ring-white/10 focus:ring-cyan-400/40" />
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="self-start rounded-md bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-3 font-medium shadow-lg shadow-cyan-500/30">Send</motion.button>
        </form>

        {/* Footer */}
        <div className="mt-12 flex items-center justify-between text-white/60 text-sm">
          <div className="italic">Built with 💚 by <Typewriter text="Haschwalth" /></div>
          <button onClick={scrollTop} aria-label="Scroll to top" className="rounded-full p-2 bg-white/5 ring-1 ring-white/10 hover:ring-cyan-400/40">
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

function Typewriter({ text }) {
  return (
    <span className="inline-flex items-center">
      <motion.span
        initial={{ width: 0 }}
        animate={{ width: 'auto' }}
        transition={{ duration: 2.2, ease: 'easeInOut' }}
        className="overflow-hidden whitespace-nowrap border-r-2 border-white/50 pr-1"
      >
        {text}
      </motion.span>
    </span>
  );
}
