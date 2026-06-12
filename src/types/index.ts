export interface SummaryResult {
  summary: string;
  originalWordCount: number;
  summaryWordCount: number;
  compressionRatio: number;
  processingTime: number;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  articlePreview: string;
  summaryPreview: string;
  fullArticle: string;
  fullSummary: string;
  wordCount: number;
  summaryWordCount: number;
  processingTime: number;
}

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
}
