import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { WorkspaceSection } from './components/WorkspaceSection';
import { AnalyticsSection } from './components/AnalyticsSection';
import { HistorySection } from './components/HistorySection';
import { FeaturesSection } from './components/FeaturesSection';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';
import { useToast } from './hooks/useToast';
import { summarizeArticle } from './lib/api';
import { countWords, loadHistory, addToHistory, removeFromHistory, normalizeText } from './lib/utils';
import { SummaryResult, HistoryItem } from './types';

export default function App() {
  const [article, setArticle] = useState('');
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SummaryResult | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>(loadHistory);
  const [darkMode, setDarkMode] = useState(true);
  const { toasts, addToast, removeToast } = useToast();

  const handleSummarize = async () => {
    const safeArticle = normalizeText(article);

    if (!safeArticle.trim()) {
      addToast({ type: 'error', title: 'Empty Input', message: 'Please paste a news article before summarizing.' });
      return;
    }
    if (countWords(safeArticle) < 10) {
      addToast({ type: 'info', title: 'Too Short', message: 'Add at least 10 words for a meaningful summary.' });
      return;
    }

    setIsLoading(true);
    setSummary(null);
    setResult(null);
    const startTime = Date.now();

    try {
      const generated = await summarizeArticle(safeArticle);
      const processingTime = Date.now() - startTime;
      const originalWordCount = countWords(safeArticle);
      const summaryWordCount = countWords(generated);

      const newResult: SummaryResult = {
        summary: generated,
        originalWordCount,
        summaryWordCount,
        compressionRatio: 1 - summaryWordCount / originalWordCount,
        processingTime,
      };

      setSummary(generated);
      setResult(newResult);

      const historyItem: HistoryItem = {
        id: Math.random().toString(36).slice(2),
        timestamp: Date.now(),
        articlePreview: safeArticle.slice(0, 100) + (safeArticle.length > 100 ? '…' : ''),
        summaryPreview: generated.slice(0, 180) + (generated.length > 180 ? '…' : ''),
        fullArticle: safeArticle,
        fullSummary: generated,
        wordCount: originalWordCount,
        summaryWordCount,
        processingTime,
      };
      setHistory(prev => addToHistory(prev, historyItem));

      addToast({
        type: 'success',
        title: 'Summary Ready',
        message: `${originalWordCount} words condensed to ${summaryWordCount} in ${(processingTime / 1000).toFixed(2)}s.`,
      });

      document.getElementById('analytics')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error occurred';
      const isNetwork = message.toLowerCase().includes('network') || message.toLowerCase().includes('fetch');
      addToast({
        type: 'error',
        title: isNetwork ? 'Network Error' : 'API Error',
        message: isNetwork
          ? 'Could not reach the server. Make sure your backend is running on localhost:8000.'
          : `Summarization failed: ${message}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setArticle('');
    setSummary(null);
    setResult(null);
  };

  const handleLoadHistory = (item: HistoryItem) => {
    setArticle(item.fullArticle);
    setSummary(item.fullSummary);
    setResult({
      summary: item.fullSummary,
      originalWordCount: item.wordCount,
      summaryWordCount: item.summaryWordCount,
      compressionRatio: 1 - item.summaryWordCount / item.wordCount,
      processingTime: item.processingTime,
    });
    document.getElementById('workspace')?.scrollIntoView({ behavior: 'smooth' });
    addToast({ type: 'info', title: 'Loaded', message: 'Previous summary loaded into workspace.' });
  };

  const handleDeleteHistory = (id: string) => {
    setHistory(prev => removeFromHistory(prev, id));
  };

  const handleCopySuccess = () => {
    addToast({ type: 'success', title: 'Copied', message: 'Summary copied to clipboard.' });
  };

  return (
    <div style={{ background: '#0B0F19', minHeight: '100vh' }}>
      <Navbar darkMode={darkMode} onToggleTheme={() => setDarkMode(d => !d)} />
      <HeroSection />
      <WorkspaceSection
        article={article}
        summary={summary}
        isLoading={isLoading}
        onArticleChange={setArticle}
        onSummarize={handleSummarize}
        onClear={handleClear}
        onCopySuccess={handleCopySuccess}
      />
      <AnalyticsSection result={result} />
      <HistorySection
        history={history}
        onLoad={handleLoadHistory}
        onDelete={handleDeleteHistory}
      />
      <FeaturesSection />
      <Footer />
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
