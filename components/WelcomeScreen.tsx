"use client";

import { LiquidMetalButton } from "./LiquidMetalButton";

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="text-center py-6 stagger-reveal">
      {/* Eyebrow */}
      <p className="text-brand-muted text-xs uppercase tracking-[0.25em] mb-6 stagger-item">
        2-minute health profile
      </p>

      {/* Headline */}
      <h1 className="text-3xl md:text-4xl font-bold text-brand-navy leading-tight mb-4 stagger-item">
        Discover your unique
        <br />
        health identity
      </h1>

      {/* Subtext */}
      <p className="text-brand-subtext text-base leading-relaxed max-w-xs mx-auto mb-8 stagger-item">
        Answer 7 short questions and we&apos;ll reveal your wellness
        profile — plus an exclusive reward just for you.
      </p>

      {/* Trust indicators */}
      <div className="flex items-center justify-center gap-6 mb-10 stagger-item">
        <div className="flex items-center gap-1.5 text-brand-muted text-xs">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          Private &amp; anonymous
        </div>
        <div className="flex items-center gap-1.5 text-brand-muted text-xs">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          Takes ~2 min
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-xs mx-auto stagger-item">
        <LiquidMetalButton
          label="Discover My Profile"
          onClick={onStart}
        />
      </div>

      {/* Social proof */}
      <p className="text-brand-muted text-xs mt-6 stagger-item">
        Trusted by 12,000+ Meo customers
      </p>
    </div>
  );
}
