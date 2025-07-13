'use server';

/**
 * @fileOverview AI-powered model canvas analyzer.
 *
 * - analyzeModelCanvas - A function that analyzes the model canvas and provides suggestions.
 * - AnalyzeModelCanvasInput - The input type for the analyzeModelCanvas function.
 * - AnalyzeModelCanvasOutput - The return type for the analyzeModelCanvas function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeModelCanvasInputSchema = z.object({
  modelCanvasState: z.string().describe('The current state of the model canvas as a stringified JSON.'),
  modelType: z.string().describe('The type of model being used on the canvas.'),
});
export type AnalyzeModelCanvasInput = z.infer<typeof AnalyzeModelCanvasInputSchema>;

const AnalyzeModelCanvasOutputSchema = z.object({
  suggestions: z.array(z.string()).describe('A list of suggestions for improving the model canvas.'),
  rationale: z.string().describe('Explanation of why suggestions are provided'),
});
export type AnalyzeModelCanvasOutput = z.infer<typeof AnalyzeModelCanvasOutputSchema>;

export async function analyzeModelCanvas(input: AnalyzeModelCanvasInput): Promise<AnalyzeModelCanvasOutput> {
  return analyzeModelCanvasFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeModelCanvasPrompt',
  input: {schema: AnalyzeModelCanvasInputSchema},
  output: {schema: AnalyzeModelCanvasOutputSchema},
  prompt: `You are an AI assistant that analyzes model canvases and provides suggestions for improvement based on the model type and current state.

Model Type: {{{modelType}}}
Model Canvas State: {{{modelCanvasState}}}

Analyze the model canvas state and provide a list of suggestions for improvement. Also provide a brief rationale for why each suggestion is helpful.

Format your response as a JSON object:
{
  "suggestions": ["suggestion 1", "suggestion 2"],
  "rationale": "Explanation of why the suggestions are provided"
}
`,
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
