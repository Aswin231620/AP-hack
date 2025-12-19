'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Camera, BrainCircuit, Loader2, Sparkles, AlertCircle, UploadCloud, X } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { identifySpeciesAction } from '@/lib/actions';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

export function SpeciesIdentifier() {
  const { toast } = useToast();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isIdentifying, setIsIdentifying] = useState(false);
  const [result, setResult] = useState<{ data: any; error: string | null } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback(async (file: File | null) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const dataUrl = reader.result as string;
      setPreviewUrl(dataUrl);
      setIsIdentifying(true);
      setResult(null);

      const formData = new FormData();
      formData.append('photo', dataUrl);

      try {
        const res = await identifySpeciesAction(null, formData);
        setResult(res);
        if(res.error) {
          toast({
            variant: 'destructive',
            title: 'Identification Failed',
            description: res.error,
          });
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        setResult({ data: null, error: errorMessage });
        toast({
            variant: 'destructive',
            title: 'Identification Failed',
            description: errorMessage,
          });
      } finally {
        setIsIdentifying(false);
      }
    };
    reader.readAsDataURL(file);
  }, [toast]);
  
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(event.target.files?.[0] || null);
    event.target.value = ''; // Reset file input
  }

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };
  
  const clearPreview = () => {
    setPreviewUrl(null);
    setResult(null);
    setIsIdentifying(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sparkles className="h-5 w-5 text-accent" />
          AI Species Identifier
        </CardTitle>
        <CardDescription>
          Upload an image of an intruder to identify its species.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div 
            className="relative aspect-video w-full overflow-hidden rounded-lg border-2 border-dashed flex items-center justify-center text-muted-foreground bg-muted/20 hover:border-primary hover:text-primary transition-colors cursor-pointer"
            onClick={!previewUrl ? handleChooseFile : undefined}
        >
            <Input
                id="photo"
                name="photo"
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={onFileChange}
                className="hidden"
            />
            {previewUrl ? (
                <>
                    <Image src={previewUrl} alt="Intruder preview" fill className="object-contain" />
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 bg-background/50 hover:bg-background" onClick={clearPreview}>
                      <X className="h-4 w-4" />
                    </Button>
                </>
            ) : (
                <div className="text-center p-4">
                    <UploadCloud className="mx-auto h-10 w-10 mb-2" />
                    <p className="font-semibold">Click to upload image</p>
                    <p className="text-xs">Your privacy is respected. Images are not stored.</p>
                </div>
            )}
        </div>

        <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border bg-background p-4 h-full min-h-[120px]">
          {isIdentifying ? (
            <div className="text-center space-y-2 animate-pulse">
                <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground font-medium">Analyzing image...</p>
            </div>
          ) : result?.error ? (
             <Alert variant="destructive" className="w-full">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Identification Failed</AlertTitle>
              <AlertDescription>{result.error}</AlertDescription>
            </Alert>
          ) : result?.data ? (
            <div className="text-center space-y-2 animate-in fade-in">
                <p className="text-muted-foreground">Identified Species:</p>
                <h3 className="text-3xl font-bold text-accent">{result.data.species}</h3>
                <p className="text-muted-foreground">Confidence:</p>
                <Badge variant="secondary" className="text-lg font-semibold">
                    {(result.data.confidence * 100).toFixed(1)}%
                </Badge>
            </div>
          ) : (
             <div className="text-center text-muted-foreground">
                <BrainCircuit className="mx-auto h-10 w-10 mb-2" />
                <p className="font-medium">Awaiting image for analysis</p>
             </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
