import { cn } from '@/lib/utils';
import { ShieldAlert, ShieldCheck } from 'lucide-react';

type StatusIndicatorProps = {
  isDetected: boolean;
};

export function StatusIndicator({ isDetected }: StatusIndicatorProps) {
  return (
    <div className="relative flex items-center justify-center h-40 w-40">
      <div
        className={cn(
          'absolute h-full w-full rounded-full transition-all duration-500',
          isDetected
            ? 'animate-ping-slow bg-destructive/50'
            : 'bg-primary/20'
        )}
      />
      <div
        className={cn(
          'relative h-32 w-32 rounded-full flex items-center justify-center transition-colors duration-500 border-4',
          isDetected ? 'bg-destructive/80 border-destructive-foreground/10' : 'bg-primary/70 border-green-300/20'
        )}
      >
        {isDetected ? (
          <ShieldAlert className="h-16 w-16 text-destructive-foreground" />
        ) : (
          <ShieldCheck className="h-16 w-16 text-primary-foreground" />
        )}
      </div>
    </div>
  );
}
