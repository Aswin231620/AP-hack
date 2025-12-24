import type { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface DataCardProps {
  title: string;
  value: string | number | null;
  unit?: string;
  icon: LucideIcon;
  loading?: boolean;
  variant?: 'default' | 'destructive';
  valueSize?: string;
}

export function DataCard({ title, value, unit, icon: Icon, loading = false, variant = 'default', valueSize = 'text-2xl' }: DataCardProps) {
  const isDestructive = variant === 'destructive';
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className={cn("h-5 w-5 text-muted-foreground", isDestructive && "text-destructive")} />
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-8 w-3/4 mt-1" />
        ) : (
          <div className={cn("font-bold", valueSize, isDestructive && "text-destructive")}>
            {value ?? 'N/A'}
            {value != null && unit && <span className="text-sm font-normal text-muted-foreground ml-1">{unit}</span>}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
