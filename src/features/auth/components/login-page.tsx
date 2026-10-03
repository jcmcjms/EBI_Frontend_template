import { Bank } from '@phosphor-icons/react';
import { LoginForm } from './login-form';

const BRAND_NAME = 'Acme Inc.'; // swap to your EBI branding in one place

export function LoginPage() {
  return (
    <main className="grid min-h-svh lg:grid-cols-2">
      <section className="flex flex-col gap-4 bg-muted/50 p-6 md:p-10">
        <header className="flex items-center gap-2">
          <span
            className="flex size-7 items-center justify-center bg-foreground text-background"
            aria-hidden="true"
          >
            <Bank weight="fill" className="size-4" />
          </span>
          <span className="text-sm font-semibold">{BRAND_NAME}</span>
        </header>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <LoginForm />
          </div>
        </div>
      </section>
      <section className="relative hidden bg-muted lg:block" aria-hidden="true">
        <HeroPlaceholder />
      </section>
    </main>
  );
}

function HeroPlaceholder() {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 size-full text-border"
      fill="none"
      stroke="currentColor"
    >
      <g strokeWidth="0.25">
        <line x1="50" y1="0" x2="50" y2="100" />
        <line x1="0" y1="50" x2="100" y2="50" />
        <line x1="0" y1="0" x2="100" y2="100" />
        <line x1="100" y1="0" x2="0" y2="100" />
        <circle cx="50" cy="50" r="16" />
      </g>
      <circle cx="50" cy="50" r="6.5" strokeWidth="0.25" className="fill-background/60" />
      <g strokeWidth="0.4">
        <rect x="47" y="47.5" width="6" height="5" rx="0.6" />
        <circle cx="48.8" cy="49.2" r="0.5" />
        <path d="M47 51.6 l1.8 -1.8 1.1 1.1 1.6 -1.6 1.5 1.6" />
      </g>
    </svg>
  );
}
