import axios from 'axios';

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

export async function summarizeArticle(text: string): Promise<string> {
  const response = await api.post<{ summary: string }>('/summarize', { text });
  return response.data.summary;
}
