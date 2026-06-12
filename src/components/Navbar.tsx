import { motion } from 'framer-motion';
import { Sparkles, GitFork, Moon, Sun } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  onToggleTheme: () => void;
}

export function Navbar({ darkMode, onToggleTheme }: NavbarProps) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
      style={{
        background: 'rgba(11,15,25,0.8)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        backdropFilter: 'blur(20px)',
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #6366F1, #06B6D4)' }}
        >
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <span className="font-semibold text-slate-100 text-sm tracking-tight">
          AI News Intelligence
        </span>
      </div>

      {/* Nav links — hidden on mobile */}
      <div className="hidden md:flex items-center gap-8">
        {['Workspace', 'Analytics', 'History', 'Features'].map(link => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="text-sm text-slate-400 hover:text-slate-200 transition-colors"
          >
            {link}
          </a>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggleTheme}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
          title="Toggle theme"
        >
          {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </motion.button>
        <motion.a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-200 transition-colors"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
          title="GitHub"
        >
          <GitFork className="w-4 h-4" />
        </motion.a>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-white cursor-pointer"
          style={{ background: 'linear-gradient(135deg, #6366F1, #06B6D4)' }}
        >
          <Sparkles className="w-3.5 h-3.5" />
          Try Free
        </motion.button>
      </div>
    </motion.nav>
  );
}
