'use server';
/**
 * @fileOverview A flow for generating a SWOT analysis from a business idea.
 *
 * - generateSwotAnalysis - A function that generates a SWOT analysis.
 * - GenerateSwotAnalysisInput - The input type for the generateSwotAnalysis function.
 * - GenerateSwotAnalysisOutput - The return type for the generateSwotAnalysis function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const GenerateSwotAnalysisInputSchema = z.object({
  businessIdea: z.string().describe('The user\'s business idea.'),
});
export type GenerateSwotAnalysisInput = z.infer<typeof GenerateSwotAnalysisInputSchema>;

const GenerateSwotAnalysisOutputSchema = z.object({
  strengths: z.array(z.string()).describe('A list of strengths for the business idea.'),
  weaknesses: z.array(z.string()).describe('A list of weaknesses for the business idea.'),
  opportunities: z.array(z.string()).describe('A list of opportunities for the business idea.'),
  threats: z.array(z.string()).describe('A list of threats for the business idea.'),
  businessInsights: z.string().describe('General business insights and a summary based on the idea.'),
});
export type GenerateSwotAnalysisOutput = z.infer<typeof GenerateSwotAnalysisOutputSchema>;

export async function generateSwotAnalysis(input: GenerateSwotAnalysisInput): Promise<GenerateSwotAnalysisOutput> {
  return generateSwotAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSwotAnalysisPrompt',
  input: { schema: GenerateSwotAnalysisInputSchema },
  output: { schema: GenerateSwotAnalysisOutputSchema },
  prompt: `You are an expert business consultant. A user has provided a business idea. Your task is to perform a detailed SWOT analysis (Strengths, Weaknesses, Opportunities, Threats) for this idea and provide some general business insights.

Business Idea: {{{businessIdea}}}

Generate a list of 3-5 points for each SWOT category. The points should be concise and clear.
Also, provide a short paragraph of overall business insights based on the SWOT analysis.

Return the response as a JSON object matching the output schema.
Strengths: Internal positive attributes.
Weaknesses: Internal negative attributes.
Opportunities: External factors that can be capitalized on.
Threats: External factors that could harm the business.`,
});

const generateSwotAnalysisFlow = ai.defineFlow(
  {
    name: 'generateSwotAnalysisFlow',
    inputSchema: GenerateSwotAnalysisInputSchema,
    outputSchema: GenerateSwotAnalysisOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
