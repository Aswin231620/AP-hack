'use server';

import { identifyIntrudingSpecies, IdentifyIntrudingSpeciesOutput } from '@/ai/flows/identify-intruding-species';

export async function identifySpeciesAction(
  prevState: any,
  formData: FormData
): Promise<{
  data: IdentifyIntrudingSpeciesOutput | null;
  error: string | null;
  timestamp: number;
}> {
  const photo = formData.get('photo') as string | null;

  if (!photo) {
    return { data: null, error: 'No photo provided.', timestamp: Date.now() };
  }

  try {
    const result = await identifyIntrudingSpecies({
      photoDataUri: photo,
    });
    return { data: result, error: null, timestamp: Date.now() };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
    return { data: null, error: `Failed to identify species: ${errorMessage}`, timestamp: Date.now() };
  }
}
