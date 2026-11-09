'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Send errors to a monitoring service in production if configured.
    console.error(error);
  }, [error]);

  return (
    <div className="container-main flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-bold">
        Something went wrong
      </h1>

      <p className="mt-3 text-slate-500">
        We could not load this page. Please try again.
      </p>

      <Button onClick={() => reset()} className="mt-6">
        Try Again
      </Button>
    </div>
  );
}