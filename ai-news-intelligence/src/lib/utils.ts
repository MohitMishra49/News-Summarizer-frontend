import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { HistoryItem } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function countWords(text: string): number {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

export function countChars(text: string): number {
  return text.length;
}

export function formatTimestamp(ts: number): string {
  const d = new Date(ts);
  return d.toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
  });
}

export function getCompressionRatio(original: number, summary: number): string {
  if (!original) return '0%';
  return `${Math.round((1 - summary / original) * 100)}%`;
}

const STORAGE_KEY = 'ani_history_v1';

export function loadHistory(): HistoryItem[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveHistory(items: HistoryItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0, 20)));
}

export function addToHistory(items: HistoryItem[], newItem: HistoryItem): HistoryItem[] {
  const updated = [newItem, ...items.filter(i => i.id !== newItem.id)];
  saveHistory(updated);
  return updated;
}

export function removeFromHistory(items: HistoryItem[], id: string): HistoryItem[] {
  const updated = items.filter(i => i.id !== id);
  saveHistory(updated);
  return updated;
}
