import { motion } from 'framer-motion';
import { FileText, Clipboard, X, Loader2, Sparkles } from 'lucide-react';
import { countWords, countChars, normalizeText } from '@/lib/utils';

interface InputPanelProps {
  article: string;
  isLoading: boolean;
  onArticleChange: (val: string) => void;
  onSummarize: () => void;
  onClear: () => void;
}

const PLACEHOLDER = `Paste your news article here...

Example: "The Federal Reserve announced a quarter-point interest rate cut on Wednesday, citing cooling inflation and a resilient labor market. The decision was unanimous among the 12-member Federal Open Market Committee, marking the third consecutive rate reduction this cycle. Fed Chair Jerome Powell indicated that future cuts would depend on incoming economic data, emphasizing the committee's data-dependent approach..."`;

export function InputPanel({ article, isLoading, onArticleChange, onSummarize, onClear }: InputPanelProps) {
  const safeArticle = normalizeText(article);
  const words = countWords(safeArticle);
  const chars = countChars(safeArticle);
  const hasContent = safeArticle.trim().length > 0;

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      onArticleChange(text);
    } catch {
      // Clipboard API may not be available
    }
  };

  return (
    <div
      className="flex flex-col rounded-2xl overflow-hidden h-full"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {/* Panel header */}
      <div
        className="flex items-center justify-between px-5 py-4"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(99,102,241,0.15)' }}
          >
            <FileText className="w-3.5 h-3.5 text-indigo-400" />
          </div>
          <span className="text-sm font-semibold text-slate-200">Article Input</span>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePaste}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <Clipboard className="w-3.5 h-3.5" />
            Paste
          </motion.button>
          {hasContent && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClear}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
              style={{ background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.2)' }}
            >
              <X className="w-3.5 h-3.5" />
              Clear
            </motion.button>
          )}
        </div>
      </div>

      {/* Textarea */}
      <div className="flex-1 relative">
        <textarea
          value={safeArticle}
          onChange={e => onArticleChange(e.target.value)}
          placeholder={PLACEHOLDER}
          disabled={isLoading}
          className="w-full h-full min-h-[360px] px-5 py-4 text-sm text-slate-300 leading-relaxed resize-none outline-none bg-transparent placeholder-slate-600 disabled:opacity-50"
          style={{ fontFamily: 'inherit' }}
        />
      </div>

      {/* Stats bar */}
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="flex items-center gap-4">
          <span className="text-xs text-slate-500">
            <span className="text-slate-400 font-medium">{words.toLocaleString()}</span> words
          </span>
          <span className="text-xs text-slate-500">
            <span className="text-slate-400 font-medium">{chars.toLocaleString()}</span> chars
          </span>
        </div>

        {/* Summarize CTA */}
        <motion.button
          whileHover={!isLoading && hasContent ? { scale: 1.03, boxShadow: '0 0 24px rgba(99,102,241,0.4)' } : {}}
          whileTap={!isLoading && hasContent ? { scale: 0.97 } : {}}
          onClick={onSummarize}
          disabled={isLoading || !hasContent}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
          style={{
            background: hasContent && !isLoading
              ? 'linear-gradient(135deg, #6366F1, #06B6D4)'
              : 'rgba(99,102,241,0.3)',
          }}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Summarizing…
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Summarize
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}
