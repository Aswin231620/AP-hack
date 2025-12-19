import { cn } from '@/lib/utils';

type StatusIndicatorProps = {
  isDetected: boolean;
};

export function StatusIndicator({ isDetected }: StatusIndicatorProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative flex items-center justify-center">
        <div
          className={cn(
            'absolute h-32 w-32 rounded-full',
            isDetected
              ? 'animate-ping-slow bg-destructive/50'
              : 'bg-green-500/10'
          )}
        />
        <div
          className={cn(
            'h-24 w-24 rounded-full transition-colors duration-500 border-4',
            isDetected ? 'bg-destructive border-destructive-foreground/10' : 'bg-green-500 border-green-300/20'
          )}
        />
      </div>
      <div className="text-center">
        <p className="font-bold text-2xl tracking-wider">
          {isDetected ? 'INTRUSION' : 'ALL CLEAR'}
        </p>
        <p className="text-sm text-muted-foreground">Live System Status</p>
      </div>
    </div>
  );
}
