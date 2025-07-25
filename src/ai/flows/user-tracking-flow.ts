'use server';
/**
 * @fileOverview A flow for tracking user interactions.
 *
 * - trackUserEvent - A function that logs user interaction events.
 * - UserEventInput - The input type for the trackUserEvent function.
 */
import { config } from 'dotenv';
config();

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const UserEventInputSchema = z.object({
  eventName: z.string().describe('The name of the event being tracked.'),
  modelName: z.string().optional().describe('The name of the model being interacted with.'),
  elementClicked: z.string().optional().describe('The specific element or button that was clicked.'),
  path: z.string().optional().describe('The page path where the event occurred.'),
});
export type UserEventInput = z.infer<typeof UserEventInputSchema>;

export async function trackUserEvent(input: UserEventInput): Promise<void> {
  await userTrackingFlow(input);
}

const userTrackingFlow = ai.defineFlow(
  {
    name: 'userTrackingFlow',
    inputSchema: UserEventInputSchema,
    outputSchema: z.void(),
  },
  async (input) => {
    // For now, we'll just log to the server console.
    // This could be extended to write to a database or a logging service.
    console.log(`[USER_TRACKING] - ${new Date().toISOString()}`, input);
  }
);
