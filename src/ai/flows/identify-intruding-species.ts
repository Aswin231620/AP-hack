'use server';
/**
 * @fileOverview An AI agent that identifies the intruding species from an image.
 *
 * - identifyIntrudingSpecies - A function that handles the species identification process.
 * - IdentifyIntrudingSpeciesInput - The input type for the identifyIntrudingSpecies function.
 * - IdentifyIntrudingSpeciesOutput - The return type for the identifyIntrudingSpecies function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IdentifyIntrudingSpeciesInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of the intruding species, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type IdentifyIntrudingSpeciesInput = z.infer<typeof IdentifyIntrudingSpeciesInputSchema>;

const IdentifyIntrudingSpeciesOutputSchema = z.object({
  species: z.string().describe('The identified species of the intruding animal.'),
  confidence: z.number().describe('The confidence level of the identification (0-1).'),
});
export type IdentifyIntrudingSpeciesOutput = z.infer<typeof IdentifyIntrudingSpeciesOutputSchema>;

export async function identifyIntrudingSpecies(input: IdentifyIntrudingSpeciesInput): Promise<IdentifyIntrudingSpeciesOutput> {
  return identifyIntrudingSpeciesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'identifyIntrudingSpeciesPrompt',
  input: {schema: IdentifyIntrudingSpeciesInputSchema},
  output: {schema: IdentifyIntrudingSpeciesOutputSchema},
  prompt: `You are an expert in identifying animal species from images.

  Analyze the provided image and identify the species of the intruding animal.

  Return the species name and your confidence level (0-1).

  Image: {{media url=photoDataUri}}
  `,
});

const identifyIntrudingSpeciesFlow = ai.defineFlow(
  {
    name: 'identifyIntrudingSpeciesFlow',
    inputSchema: IdentifyIntrudingSpeciesInputSchema,
    outputSchema: IdentifyIntrudingSpeciesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
