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
        For Meo customers only
      </p>

      {/* Headline */}
      <h1 className="text-3xl md:text-4xl font-bold text-brand-navy leading-tight mb-4 stagger-item">
        Help us get to know you.
        <br />
        Get 25% off as a thank you.
      </h1>

      {/* Subtext */}
      <p className="text-brand-subtext text-base leading-relaxed max-w-sm mx-auto mb-8 stagger-item">
        7 quick questions about your health journey.
        We&apos;ll use your answers to build better products
        — and you&apos;ll unlock your personal wellness
        profile + a 25% discount on your next order.
      </p>

      {/* Value props */}
      <div className="flex flex-col items-center gap-3 mb-10 stagger-item">
        <div className="flex items-center gap-2.5 text-brand-navy text-sm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Your unique health identity revealed
        </div>
        <div className="flex items-center gap-2.5 text-brand-navy text-sm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          25% off your next order — applied instantly
        </div>
        <div className="flex items-center gap-2.5 text-brand-navy text-sm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Takes less than 2 minutes
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-xs mx-auto stagger-item">
        <LiquidMetalButton
          label="Start — It's Quick"
          onClick={onStart}
        />
      </div>

      {/* Privacy note */}
      <p className="text-brand-muted text-xs mt-6 stagger-item">
        Your answers are private and help us serve you better.
      </p>
    </div>
  );
}
