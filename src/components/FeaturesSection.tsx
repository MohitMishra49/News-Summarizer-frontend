import { motion } from 'framer-motion';
import { Zap, Brain, Download, BarChart3, Shield, RefreshCw } from 'lucide-react';

const features = [
  {
    icon: <Zap className="w-5 h-5" />,
    title: 'Fast Summarization',
    description: 'Process articles up to 10,000 words in under 3 seconds. No waiting, no queues — just instant intelligence.',
    color: '#F59E0B',
    bg: 'rgba(245,158,11,0.08)',
    border: 'rgba(245,158,11,0.2)',
  },
  {
    icon: <Brain className="w-5 h-5" />,
    title: 'AI-Powered Insights',
    description: 'State-of-the-art language models extract the core message, retaining factual accuracy and nuance.',
    color: '#6366F1',
    bg: 'rgba(99,102,241,0.08)',
    border: 'rgba(99,102,241,0.2)',
  },
  {
    icon: <Download className="w-5 h-5" />,
    title: 'Export Anywhere',
    description: 'Download summaries as plain TXT or formatted PDF — ready to share, archive, or drop into your workflow.',
    color: '#06B6D4',
    bg: 'rgba(6,182,212,0.08)',
    border: 'rgba(6,182,212,0.2)',
  },
  {
    icon: <BarChart3 className="w-5 h-5" />,
    title: 'Rich Analytics',
    description: 'See compression ratio, word counts, and processing time for every run. Data-driven feedback on every summary.',
    color: '#10B981',
    bg: 'rgba(16,185,129,0.08)',
    border: 'rgba(16,185,129,0.2)',
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: 'Privacy First',
    description: 'Your articles and summaries are never stored on our servers. All history lives in your own browser.',
    color: '#8B5CF6',
    bg: 'rgba(139,92,246,0.08)',
    border: 'rgba(139,92,246,0.2)',
  },
  {
    icon: <RefreshCw className="w-5 h-5" />,
    title: 'Productivity Boost',
    description: 'Stay on top of fast-moving news without reading full articles. Summarize 10 articles in the time it takes to read one.',
    color: '#EC4899',
    bg: 'rgba(236,72,153,0.08)',
    border: 'rgba(236,72,153,0.2)',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="px-6 py-16 max-w-7xl mx-auto">
      {/* Divider line */}
      <div
        className="w-full h-px mb-16"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-emerald-300 mb-4"
          style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}
        >
          Features
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-3 tracking-tight">
          Everything you need to move faster
        </h2>
        <p className="text-slate-400 text-base max-w-xl mx-auto">
          Designed for journalists, researchers, analysts, and anyone who reads a lot of news.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            whileHover={{ y: -4, boxShadow: `0 16px 48px ${f.color}15` }}
            className="p-6 rounded-2xl transition-all"
            style={{ background: f.bg, border: `1px solid ${f.border}` }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
              style={{ background: `${f.color}20`, color: f.color }}
            >
              {f.icon}
            </div>
            <h3 className="text-base font-semibold text-slate-100 mb-2">{f.title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{f.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
