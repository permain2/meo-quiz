"use client";

import { useState } from "react";
import { LiquidMetalButton } from "./LiquidMetalButton";

interface ThankYouProps {
  discountCode: string;
  storeUrl: string;
}

export function ThankYou({ discountCode, storeUrl }: ThankYouProps) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(discountCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="text-center animate-fade-up">
      {/* Branded checkmark */}
      <div className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-brand-accent flex items-center justify-center">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-accent">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">
        Thank you!
      </h2>
      <p className="text-brand-muted text-base mb-8 max-w-sm mx-auto leading-relaxed">
        Your feedback helps us build better products. Here&apos;s something as a thank you:
      </p>

      {/* Discount code card */}
      <div className="bg-brand-card border border-brand-border rounded-2xl p-8 max-w-sm mx-auto mb-8" style={{ animation: "pulse-glow 3s ease-in-out infinite" }}>
        <p className="text-brand-muted text-xs mb-3 uppercase tracking-[0.2em]">
          Your discount code
        </p>
        <p className="text-3xl font-bold text-brand-accent tracking-[0.15em] mb-5">
          {discountCode}
        </p>
        <LiquidMetalButton
          label={copied ? "Copied!" : "Copy Code"}
          onClick={copyCode}
        />
      </div>

      <a
        href={storeUrl}
        className="inline-flex items-center gap-2 text-brand-accent hover:text-brand-accent-hover transition-colors text-sm font-medium"
      >
        Shop now at Meo Nutrition
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </a>
    </div>
  );
}
