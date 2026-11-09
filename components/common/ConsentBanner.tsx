'use client';

import Link from 'next/link';
import { useSyncExternalStore } from 'react';

import { Button } from '@/components/ui/button';

const STORAGE_KEY = 'toolspace-consent';
const CHANGE_EVENT = 'toolspace-consent-change';

type ConsentChoice = 'granted' | 'denied';

type GtagWindow = Window & {
  gtag?: (...args: unknown[]) => void;
};

function subscribe(onChange: () => void) {
  window.addEventListener('storage', onChange);
  window.addEventListener(CHANGE_EVENT, onChange);

  return () => {
    window.removeEventListener('storage', onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

function getSnapshot(): string {
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? 'unset';
  } catch {
    return 'unset';
  }
}

// On the server (and during hydration) render nothing, so the banner
// never flashes for visitors who already made a choice.
function getServerSnapshot(): string {
  return 'pending';
}

function saveChoice(choice: ConsentChoice) {
  try {
    window.localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // Storage can be unavailable (private mode). The choice still
    // applies to the current page view below.
  }

  const gtag = (window as GtagWindow).gtag;

  gtag?.('consent', 'update', {
    analytics_storage: choice,
  });

  if (choice === 'granted') {
    // The page view that loaded before consent was recorded without
    // cookies, so send one now that the visitor has accepted.
    gtag?.('event', 'page_view');
  }

  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/**
 * Asks for consent to analytics cookies (Google Analytics).
 * Analytics stays disabled (Google Consent Mode: denied) until the
 * visitor accepts. Render this only when analytics is configured.
 *
 * Note: consent for personalised ads in the EEA, UK and Switzerland
 * must be handled by a Google-certified CMP, such as the one in
 * AdSense > Privacy & messaging. This banner does not replace it.
 */
export default function ConsentBanner() {
  const status = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  if (status !== 'unset') {
    return null;
  }

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-border bg-card p-4 shadow-lg pb-[max(1rem,env(safe-area-inset-bottom))]"
    >
      <div className="container-main flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-6 text-muted-foreground">
          We use cookies to measure how our tools are used and to improve
          them. Analytics only starts if you accept.{' '}
          <Link
            href="/privacy-policy"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Read our Privacy Policy
          </Link>
          .
        </p>

        <div className="flex shrink-0 gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => saveChoice('denied')}
          >
            Decline
          </Button>

          <Button type="button" onClick={() => saveChoice('granted')}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}