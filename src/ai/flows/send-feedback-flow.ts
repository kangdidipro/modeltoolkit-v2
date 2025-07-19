'use server';
/**
 * @fileOverview A flow for sending feedback emails.
 *
 * - sendFeedback - A function that handles sending the feedback email.
 * - SendFeedbackInput - The input type for the sendFeedback function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import nodemailer from 'nodemailer';

const SendFeedbackInputSchema = z.object({
  easeOfUse: z.string().describe('Rating for ease of use.'),
  usefulness: z.string().describe('Rating for usefulness.'),
  design: z.string().describe('Rating for overall design.'),
  comments: z.string().describe('User comments.'),
});
export type SendFeedbackInput = z.infer<typeof SendFeedbackInputSchema>;

export async function sendFeedback(input: SendFeedbackInput): Promise<void> {
  await sendFeedbackFlow(input);
}

const sendFeedbackFlow = ai.defineFlow(
  {
    name: 'sendFeedbackFlow',
    inputSchema: SendFeedbackInputSchema,
    outputSchema: z.void(),
  },
  async (input) => {
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env;
    const FEEDBACK_RECIPIENT_EMAIL = "modetoolkitcom@gmail.com";

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !SMTP_FROM) {
      throw new Error('SMTP environment variables are not fully configured.');
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: parseInt(SMTP_PORT, 10),
      secure: parseInt(SMTP_PORT, 10) === 465, // true for 465, false for other ports
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    const emailHtml = `
      <h1>New Feedback Received</h1>
      <p><strong>Ease of Use:</strong> ${input.easeOfUse}/5</p>
      <p><strong>Usefulness:</strong> ${input.usefulness}/5</p>
      <p><strong>Design:</strong> ${input.design}/5</p>
      <h2>Comments:</h2>
      <p>${input.comments}</p>
    `;

    await transporter.sendMail({
      from: `"Model Toolkit Feedback" <${SMTP_FROM}>`,
      to: FEEDBACK_RECIPIENT_EMAIL,
      subject: 'New Feedback for Model Toolkit',
      html: emailHtml,
    });
  }
);
