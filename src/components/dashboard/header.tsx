import { Shield } from 'lucide-react';

export function DashboardHeader() {
  return (
    <header className="flex items-center gap-3 mb-8">
      <Shield className="size-8 text-primary" />
      <h1 className="text-3xl font-bold text-foreground">
        CropGuardian Dashboard
      </h1>
    </header>
  );
}
