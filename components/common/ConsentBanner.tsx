'use client';

import { useEffect, useSyncExternalStore } from 'react';

import { Button } from '@/components/ui/button';

const STORAGE_KEY = 'toolspace-analytics-consent';
const listeners = new Set<() => void>();

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

// 'granted' | 'denied' | 'unset'. The server snapshot is 'hidden' so the
// banner is never part of the server-rendered HTML (no hydration mismatch).
function getSnapshot() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? 'unset';
  } catch {
    return 'hidden';
  }
}

function getServerSnapshot() {
  return 'hidden';
}

function saveChoice(choice: 'granted' | 'denied') {
  try {
    window.localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // Storage blocked: the choice only lasts for this page view.
  }

  window.gtag?.('consent', 'update', {
    analytics_storage: choice,
  });

  listeners.forEach((callback) => callback());
}

/**
 * Cookie notice for Google Analytics. Rendered by app/layout.tsx only when
 * NEXT_PUBLIC_GA_ID is set. Analytics stays denied until the visitor
 * accepts. Ad consent for the EEA, UK and Switzerland is handled by the
 * Google-certified message you enable in AdSense > Privacy & messaging.
 */
export default function ConsentBanner() {
  const choice = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  // Re-apply a saved "accept" on later visits.
  useEffect(() => {
    if (choice === 'granted') {
      window.gtag?.('consent', 'update', { analytics_storage: 'granted' });
    }
  }, [choice]);

  if (choice !== 'unset') {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-label="Cookie notice"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background p-4 shadow-lg"
    >
      <div className="container-main flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          We use cookies for anonymous traffic statistics so we can improve
          the tools. See our{' '}
          <a
            href="/privacy-policy"
            className="text-primary underline underline-offset-2"
          >
            Privacy Policy
          </a>
          .
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => saveChoice('denied')}
          >
            Decline
          </Button>
          <Button size="sm" onClick={() => saveChoice('granted')}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}