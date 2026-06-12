import { motion } from 'framer-motion';
import { InputPanel } from './InputPanel';
import { OutputPanel } from './OutputPanel';

interface WorkspaceSectionProps {
  article: string;
  summary: string | null;
  isLoading: boolean;
  onArticleChange: (val: string) => void;
  onSummarize: () => void;
  onClear: () => void;
  onCopySuccess: () => void;
}

export function WorkspaceSection({
  article,
  summary,
  isLoading,
  onArticleChange,
  onSummarize,
  onClear,
  onCopySuccess,
}: WorkspaceSectionProps) {
  return (
    <section id="workspace" className="px-6 py-16 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-indigo-300 mb-4"
          style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}
        >
          Workspace
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-3 tracking-tight">
          Your AI News Workspace
        </h2>
        <p className="text-slate-400 text-base max-w-xl mx-auto">
          Paste any article, hit Summarize, and get a concise brief in seconds.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-5 min-h-[520px]"
      >
        <InputPanel
          article={article}
          isLoading={isLoading}
          onArticleChange={onArticleChange}
          onSummarize={onSummarize}
          onClear={onClear}
        />
        <OutputPanel
          summary={summary}
          isLoading={isLoading}
          onCopySuccess={onCopySuccess}
        />
      </motion.div>
    </section>
  );
}
