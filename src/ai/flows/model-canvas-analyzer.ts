'use server';

/**
 * @fileOverview AI-powered model canvas analyzer.
 *
 * - analyzeModelCanvas - A function that analyzes the model canvas and provides suggestions.
 * - AnalyzeModelCanvasInput - The input type for the analyzeModelCanvas function.
 * - AnalyzeModelCanvasOutput - The return type for the analyzeModelCanvas function.
 */
import { config } from 'dotenv';
config();

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeModelCanvasInputSchema = z.object({
  modelCanvasState: z.string().describe('The current state of the model canvas as a stringified JSON.'),
  modelType: z.string().describe('The type of model being used on the canvas.'),
});
export type AnalyzeModelCanvasInput = z.infer<typeof AnalyzeModelCanvasInputSchema>;

const StrategicSuggestionSchema = z.object({
  title: z.string().describe("A short, catchy title for the strategic suggestion."),
  description: z.string().describe("A detailed explanation of the strategic suggestion, including the reasoning behind it."),
});

const AnalyzeModelCanvasOutputSchema = z.object({
  soStrategies: z.array(StrategicSuggestionSchema).describe("Strengths-Opportunities (SO) strategies: How to use strengths to take advantage of opportunities."),
  stStrategies: z.array(StrategicSuggestionSchema).describe("Strengths-Threats (ST) strategies: How to use strengths to avoid or mitigate threats."),
  woStrategies: z.array(StrategicSuggestionSchema).describe("Weaknesses-Opportunities (WO) strategies: How to take advantage of opportunities to overcome weaknesses."),
  wtStrategies: z.array(StrategicSuggestionSchema).describe("Weaknesses-Threats (WT) strategies: How to minimize weaknesses and avoid threats."),
});
export type AnalyzeModelCanvasOutput = z.infer<typeof AnalyzeModelCanvasOutputSchema>;

export async function analyzeModelCanvas(input: AnalyzeModelCanvasInput): Promise<AnalyzeModelCanvasOutput> {
  return analyzeModelCanvasFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeModelCanvasPrompt',
  input: {schema: AnalyzeModelCanvasInputSchema},
  output: {schema: AnalyzeModelCanvasOutputSchema},
  prompt: `You are an expert business strategist. Your task is to analyze a user's SWOT analysis and generate actionable strategic insights.

Analyze the provided SWOT data:
Model Type: {{{modelType}}}
Model Canvas State: {{{modelCanvasState}}}

Based on the user's input, generate specific, actionable strategies for each of the following categories:

1.  **SO Strategies (Strengths-Opportunities):** How can the user leverage their internal Strengths to capitalize on external Opportunities?
2.  **ST Strategies (Strengths-Threats):** How can the user use their Strengths to mitigate or defend against external Threats?
3.  **WO Strategies (Weaknesses-Opportunities):** How can the user exploit external Opportunities to overcome their internal Weaknesses?
4.  **WT Strategies (Weaknesses-Threats):** What defensive strategies should the user consider to minimize the impact of their Weaknesses and avoid external Threats?

For each category, provide a list of strategic suggestions. Each suggestion should have a clear title and a detailed description. Return the response as a JSON object matching the output schema.`,
});

const analyzeModelCanvasFlow = ai.defineFlow(
  {
    name: 'analyzeModelCanvasFlow',
    inputSchema: AnalyzeModelCanvasInputSchema,
    outputSchema: AnalyzeModelCanvasOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
