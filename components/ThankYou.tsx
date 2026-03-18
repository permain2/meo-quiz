"use client";

import { useState } from "react";

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
    <div className="text-center">
      <div className="text-5xl mb-6">&#10003;</div>
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Thank you for sharing!</h2>
      <p className="text-brand-muted text-lg mb-8 max-w-md mx-auto">
        Your feedback helps us build better products for you. Here&apos;s a little something as a thank you:
      </p>
      <div className="bg-brand-card border border-brand-border rounded-2xl p-6 max-w-sm mx-auto mb-8">
        <p className="text-brand-muted text-sm mb-2 uppercase tracking-wider">Your discount code</p>
        <p className="text-3xl font-bold text-brand-accent tracking-widest mb-4">{discountCode}</p>
        <button
          onClick={copyCode}
          className="w-full py-3 rounded-xl font-semibold transition-colors bg-brand-accent text-brand-bg hover:bg-brand-accent-hover"
        >
          {copied ? "Copied!" : "Copy Code"}
        </button>
      </div>
      <a
        href={storeUrl}
        className="inline-block text-brand-accent hover:text-brand-accent-hover underline underline-offset-4 transition-colors"
      >
        Shop now at Meo Nutrition &rarr;
      </a>
    </div>
  );
}
