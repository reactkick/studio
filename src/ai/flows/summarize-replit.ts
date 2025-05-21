'use server';
/**
 * @fileOverview Summarizes a Replit project's functionality given its URL.
 *
 * - summarizeReplitProject - A function that summarizes the Replit project.
 * - SummarizeReplitProjectInput - The input type for the summarizeReplitProject function.
 * - SummarizeReplitProjectOutput - The return type for the summarizeReplitProject function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeReplitProjectInputSchema = z.object({
  replitUrl: z.string().describe('The URL of the Replit project to summarize.'),
  fileContents: z.string().describe('The contents of the replit project.'),
});
export type SummarizeReplitProjectInput = z.infer<typeof SummarizeReplitProjectInputSchema>;

const SummarizeReplitProjectOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the Replit project.'),
});
export type SummarizeReplitProjectOutput = z.infer<typeof SummarizeReplitProjectOutputSchema>;

export async function summarizeReplitProject(
  input: SummarizeReplitProjectInput
): Promise<SummarizeReplitProjectOutput> {
  return summarizeReplitProjectFlow(input);
}

const summarizeReplitProjectPrompt = ai.definePrompt({
  name: 'summarizeReplitProjectPrompt',
  input: {schema: SummarizeReplitProjectInputSchema},
  output: {schema: SummarizeReplitProjectOutputSchema},
  prompt: `You are an AI expert in understanding code.
  I will provide you with the contents of a replit project and you will summarize the project.

  Replit Content: {{{fileContents}}}
  Replit URL: {{{replitUrl}}}

  Please provide a concise summary of the project's functionality.`,
});

const summarizeReplitProjectFlow = ai.defineFlow(
  {
    name: 'summarizeReplitProjectFlow',
    inputSchema: SummarizeReplitProjectInputSchema,
    outputSchema: SummarizeReplitProjectOutputSchema,
  },
  async input => {
    const {output} = await summarizeReplitProjectPrompt(input);
    return output!;
  }
);
