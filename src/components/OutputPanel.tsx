import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Copy, Download, FileDown, Check, Sparkles } from 'lucide-react';
import { useState } from 'react';
import jsPDF from 'jspdf';

interface OutputPanelProps {
  summary: string | null;
  isLoading: boolean;
  onCopySuccess: () => void;
}

function SkeletonLine({ width }: { width: string }) {
  return (
    <div
      className="h-3 rounded-full"
      style={{
        width,
        background: 'rgba(255,255,255,0.07)',
        animation: 'shimmer 1.6s ease-in-out infinite',
      }}
    />
  );
}

export function OutputPanel({ summary, isLoading, onCopySuccess }: OutputPanelProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!summary) return;
    await navigator.clipboard.writeText(summary);
    setCopied(true);
    onCopySuccess();
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    if (!summary) return;
    const blob = new Blob([summary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `summary_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadPdf = () => {
    if (!summary) return;
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.setTextColor(30, 30, 30);
    doc.text('AI News Intelligence — Summary', 20, 20);
    doc.setFontSize(11);
    doc.setTextColor(70, 70, 70);
    const lines = doc.splitTextToSize(summary, 170);
    doc.text(lines, 20, 35);
    doc.save(`summary_${Date.now()}.pdf`);
  };

  return (
    <div
      className="flex flex-col rounded-2xl overflow-hidden h-full"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-4"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(6,182,212,0.15)' }}
          >
            <Brain className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <span className="text-sm font-semibold text-slate-200">AI Summary</span>
          {summary && !isLoading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-1 px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)' }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[10px] font-medium text-emerald-400">Ready</span>
            </motion.div>
          )}
        </div>

        {/* Action buttons */}
        {summary && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer"
              style={{
                background: copied ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,0.05)',
                border: copied ? '1px solid rgba(16,185,129,0.3)' : '1px solid rgba(255,255,255,0.08)',
                color: copied ? '#34d399' : '#94a3b8',
              }}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied!' : 'Copy'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownloadTxt}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
              title="Download as TXT"
            >
              <Download className="w-3.5 h-3.5" />
              TXT
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownloadPdf}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
              title="Download as PDF"
            >
              <FileDown className="w-3.5 h-3.5" />
              PDF
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 px-5 py-4 overflow-y-auto">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-3 pt-2"
            >
              <SkeletonLine width="92%" />
              <SkeletonLine width="85%" />
              <SkeletonLine width="78%" />
              <SkeletonLine width="90%" />
              <div className="my-2" />
              <SkeletonLine width="88%" />
              <SkeletonLine width="72%" />
              <SkeletonLine width="81%" />
              <div className="my-2" />
              <SkeletonLine width="65%" />
              <SkeletonLine width="77%" />
            </motion.div>
          ) : summary ? (
            <motion.div
              key="summary"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                {summary}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-full min-h-[280px] text-center"
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                style={{ background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.15)' }}
              >
                <Sparkles className="w-7 h-7 text-cyan-500 opacity-60" />
              </div>
              <p className="text-sm font-medium text-slate-500 mb-1">Awaiting your article</p>
              <p className="text-xs text-slate-600 max-w-xs leading-relaxed">
                Paste a news article on the left, then click Summarize to generate an AI-powered brief.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { opacity: 0.5; }
          50% { opacity: 1; }
          100% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
