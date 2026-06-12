import { Client } from "@gradio/client";

type GradioPredictionResult = {
  data: unknown;
};

function extractSummaryFromGradio(result: unknown): string {
  if (!result || typeof result !== 'object') return '';

  const data = (result as GradioPredictionResult).data;
  if (typeof data === 'string') return data;
  if (Array.isArray(data)) {
    const firstString = data
      .flat(Infinity)
      .find((item): item is string => typeof item === 'string');
    return firstString ?? '';
  }
  if (data === null || data === undefined) return '';
  return String(data);
}

export async function summarizeArticle(text: string): Promise<string> {
  const client = await Client.connect(
    "MohitMishra4905/T5-News-Summarizer"
  );

  const result = await client.predict<GradioPredictionResult>("/predict", {
    text,
  });

  console.log("Gradio Result:", result);

  const summary = extractSummaryFromGradio(result);
  if (!summary.trim()) {
    throw new Error('Invalid summary response from Gradio API.');
  }

  return summary;
}