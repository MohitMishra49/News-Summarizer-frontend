import { motion, AnimatePresence } from 'framer-motion';
import { History, Trash2, ChevronRight, Clock, RotateCcw } from 'lucide-react';
import { HistoryItem } from '@/types';
import { formatTimestamp } from '@/lib/utils';

interface HistorySectionProps {
  history: HistoryItem[];
  onLoad: (item: HistoryItem) => void;
  onDelete: (id: string) => void;
}

export function HistorySection({ history, onLoad, onDelete }: HistorySectionProps) {
  return (
    <section id="history" className="px-6 py-16 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-purple-300 mb-4"
          style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)' }}
        >
          History
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-3 tracking-tight">
          Recent Summaries
        </h2>
        <p className="text-slate-400 text-base max-w-lg mx-auto">
          All your past summaries are stored locally. Click any entry to reload it.
        </p>
      </motion.div>

      {history.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 rounded-2xl"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
            style={{ background: 'rgba(139,92,246,0.1)' }}
          >
            <History className="w-6 h-6 text-purple-400 opacity-60" />
          </div>
          <p className="text-sm font-medium text-slate-500 mb-1">No history yet</p>
          <p className="text-xs text-slate-600">Your summarizations will appear here automatically.</p>
        </motion.div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {history.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                whileHover={{ x: 4 }}
                className="group flex items-start gap-4 p-5 rounded-2xl cursor-pointer transition-all"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
                onClick={() => onLoad(item)}
              >
                {/* Index */}
                <div
                  className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                  style={{ background: 'rgba(139,92,246,0.15)', color: '#a78bfa' }}
                >
                  {i + 1}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Clock className="w-3 h-3 text-slate-600 flex-shrink-0" />
                    <span className="text-xs text-slate-500">{formatTimestamp(item.timestamp)}</span>
                    <span
                      className="text-[10px] font-medium px-1.5 py-0.5 rounded-full"
                      style={{ background: 'rgba(99,102,241,0.15)', color: '#a5b4fc' }}
                    >
                      {item.wordCount} → {item.summaryWordCount} words
                    </span>
                  </div>
                  <p className="text-sm font-medium text-slate-300 truncate mb-1">
                    {item.articlePreview}
                  </p>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {item.summaryPreview}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={e => { e.stopPropagation(); onLoad(item); }}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-indigo-400 hover:text-indigo-300 transition-colors"
                    style={{ background: 'rgba(99,102,241,0.1)' }}
                    title="Reload"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={e => { e.stopPropagation(); onDelete(item.id); }}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-rose-400 hover:text-rose-300 transition-colors"
                    style={{ background: 'rgba(244,63,94,0.1)' }}
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </motion.button>
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
}
