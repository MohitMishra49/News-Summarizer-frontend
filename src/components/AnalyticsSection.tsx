import { motion } from 'framer-motion';
import { FileText, AlignLeft, TrendingDown, Clock } from 'lucide-react';
import { SummaryResult } from '@/types';

interface AnalyticsSectionProps {
  result: SummaryResult | null;
}

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  delay: number;
  color: string;
  bgColor: string;
  borderColor: string;
  isReady: boolean;
}

function MetricCard({ icon, label, value, sub, delay, color, bgColor, borderColor, isReady }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={isReady ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0.4, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      whileHover={isReady ? { y: -3, boxShadow: `0 12px 40px ${color}20` } : {}}
      className="rounded-2xl p-6 transition-all"
      style={{
        background: isReady ? bgColor : 'rgba(255,255,255,0.02)',
        border: `1px solid ${isReady ? borderColor : 'rgba(255,255,255,0.06)'}`,
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: isReady ? `${color}20` : 'rgba(255,255,255,0.05)' }}
        >
          <div style={{ color: isReady ? color : '#475569' }}>{icon}</div>
        </div>
        {isReady && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: delay + 0.2, type: 'spring' }}
            className="w-2 h-2 rounded-full"
            style={{ background: color }}
          />
        )}
      </div>
      <div className="space-y-1">
        <motion.p
          className="text-2xl font-bold"
          style={{ color: isReady ? '#F1F5F9' : '#475569' }}
        >
          {isReady ? value : '—'}
        </motion.p>
        <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: isReady ? color : '#334155' }}>
          {label}
        </p>
        <p className="text-xs text-slate-500">{sub}</p>
      </div>
    </motion.div>
  );
}

export function AnalyticsSection({ result }: AnalyticsSectionProps) {
  const compression = result
    ? `${Math.round((1 - result.summaryWordCount / result.originalWordCount) * 100)}%`
    : '—';

  const metrics = [
    {
      icon: <FileText className="w-5 h-5" />,
      label: 'Original Length',
      value: result ? `${result.originalWordCount.toLocaleString()}` : '—',
      sub: 'words in source article',
      color: '#6366F1',
      bgColor: 'rgba(99,102,241,0.06)',
      borderColor: 'rgba(99,102,241,0.2)',
    },
    {
      icon: <AlignLeft className="w-5 h-5" />,
      label: 'Summary Length',
      value: result ? `${result.summaryWordCount.toLocaleString()}` : '—',
      sub: 'words in output summary',
      color: '#06B6D4',
      bgColor: 'rgba(6,182,212,0.06)',
      borderColor: 'rgba(6,182,212,0.2)',
    },
    {
      icon: <TrendingDown className="w-5 h-5" />,
      label: 'Compression',
      value: compression,
      sub: 'of content condensed',
      color: '#10B981',
      bgColor: 'rgba(16,185,129,0.06)',
      borderColor: 'rgba(16,185,129,0.2)',
    },
    {
      icon: <Clock className="w-5 h-5" />,
      label: 'Processing Time',
      value: result ? `${(result.processingTime / 1000).toFixed(2)}s` : '—',
      sub: 'end-to-end latency',
      color: '#F59E0B',
      bgColor: 'rgba(245,158,11,0.06)',
      borderColor: 'rgba(245,158,11,0.2)',
    },
  ];

  return (
    <section id="analytics" className="px-6 py-16 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-cyan-300 mb-4"
          style={{ background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.2)' }}
        >
          Analytics
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-3 tracking-tight">
          Summarization Metrics
        </h2>
        <p className="text-slate-400 text-base max-w-lg mx-auto">
          Real-time statistics for every summarization run — transparency built in.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <MetricCard
            key={m.label}
            {...m}
            delay={i * 0.08}
            isReady={!!result}
          />
        ))}
      </div>
    </section>
  );
}
