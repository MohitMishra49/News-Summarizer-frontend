import { motion } from 'framer-motion';
import { Sparkles, GitFork, Heart, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer
      className="px-6 py-12 mt-8"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #6366F1, #06B6D4)' }}
              >
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-slate-100 text-sm">AI News Intelligence</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              Transform lengthy news articles into concise, actionable insights using state-of-the-art AI.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {[
                { icon: <GitFork className="w-4 h-4" />, href: '#', label: 'GitHub' },
                { icon: <ExternalLink className="w-4 h-4" />, href: '#', label: 'X / Twitter' },
              ].map(link => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-300 transition-colors"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                  aria-label={link.label}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-2.5">
              {['Workspace', 'Analytics', 'History', 'Export'].map(link => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-2.5">
              {['Documentation', 'API Reference', 'Changelog', 'Status'].map(link => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} AI News Intelligence. All rights reserved.
          </p>
          <p className="text-xs text-slate-600 flex items-center gap-1.5">
            Built with <Heart className="w-3 h-3 text-rose-500" /> for AI engineers
          </p>
        </div>
      </div>
    </footer>
  );
}
