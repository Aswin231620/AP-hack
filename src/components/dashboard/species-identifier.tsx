'use client';

import { useState, useRef, useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import Image from 'next/image';
import { Camera, BrainCircuit, Loader2, Sparkles, AlertCircle } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { identifySpeciesAction } from '@/lib/actions';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const initialState = {
  data: null,
  error: null,
  timestamp: Date.now(),
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? <Loader2 className="animate-spin mr-2" /> : <BrainCircuit className="mr-2" />}
      Identify Species
    </Button>
  );
}

export function SpeciesIdentifier() {
  const [state, formAction] = useFormState(identifySpeciesAction, initialState);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
        const formData = new FormData();
        formData.append('photo', reader.result as string);
        formRef.current?.requestSubmit();
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };
  
  useEffect(() => {
    if (formRef.current) {
        formRef.current.reset();
        setPreviewUrl(null);
    }
  }, [state.timestamp]);


  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="text-accent" />
          AI Species Identifier
        </CardTitle>
        <CardDescription>
          Upload an image of an intruder to identify its species.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
            <form ref={formRef} action={formAction} className="hidden">
                 <Input
                    id="photo"
                    name="photo"
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                 />
                 <input type="hidden" name="photo" value={previewUrl || ''} />
            </form>
            <div 
                className="relative aspect-video w-full overflow-hidden rounded-md border-2 border-dashed flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors cursor-pointer"
                onClick={handleChooseFile}
            >
                {previewUrl ? (
                    <Image src={previewUrl} alt="Intruder preview" fill className="object-cover" />
                ) : (
                    <div className="text-center">
                        <Camera className="mx-auto h-8 w-8 mb-2" />
                        <p className="font-semibold">Click to upload</p>
                        <p className="text-xs">or drag and drop an image</p>
                    </div>
                )}
            </div>
            <Button type="button" variant="outline" onClick={handleChooseFile} className="w-full">
              <Camera className="mr-2" />
              Choose a different image
            </Button>
        </div>

        <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border bg-background/50 p-4 h-full min-h-[200px]">
          {state.error && (
             <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Identification Failed</AlertTitle>
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}
          {state.data && !state.error &&(
            <div className="text-center space-y-2 animate-in fade-in">
                <p className="text-muted-foreground">Identified Species:</p>
                <h3 className="text-3xl font-bold text-accent">{state.data.species}</h3>
                <p className="text-muted-foreground">Confidence:</p>
                <Badge variant="secondary" className="text-lg">
                    {(state.data.confidence * 100).toFixed(1)}%
                </Badge>
            </div>
          )}
          {!state.data && !state.error && (
             <div className="text-center text-muted-foreground">
                <BrainCircuit className="mx-auto h-12 w-12 mb-4" />
                <p>Awaiting image for analysis...</p>
             </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
