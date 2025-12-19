import { ShieldCheck } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

export function DashboardHeader() {
  return (
    <header className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 p-2 rounded-lg">
          <ShieldCheck className="size-7 text-primary" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
          CropGuardian
        </h1>
      </div>
      <ThemeToggle />
    </header>
  );
}
