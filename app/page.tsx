import { Cat } from 'lucide-react';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Purrfold Landing',
  description: 'Purrfold Landing web application starting point.',
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background p-8 text-center text-foreground">
      <Cat className="size-10 text-muted-foreground" aria-hidden />
      <h1 className="text-2xl font-semibold tracking-tight">Purrfold Landing</h1>
      <p className="text-sm text-muted-foreground">Edit app/page.tsx to start building.</p>
    </main>
  );
}
