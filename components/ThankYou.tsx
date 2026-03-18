"use client";

import { useState, useEffect, useRef } from "react";
import type { Archetype } from "@/lib/archetypes";
import { LiquidMetalButton } from "./LiquidMetalButton";

interface ThankYouProps {
  discountCode: string;
  storeUrl: string;
  archetype: Archetype;
}

const PRODUCTS = [
  {
    name: "Berberine",
    slug: "berberine-supplement",
    badge: "Best Seller",
    benefit: "Supports healthy blood sugar & metabolic function",
    price: "$39.99",
    image: "https://cdn.shopify.com/s/files/1/0694/3840/6879/files/Berberine_Supplement.webp?v=1734089983",
  },
  {
    name: "Ashwagandha",
    slug: "ashwagandha-supplement",
    badge: "Popular",
    benefit: "Promotes calm, restful sleep & stress relief",
    price: "$39.99",
    image: "https://cdn.shopify.com/s/files/1/0694/3840/6879/files/Ashwagandha_Supplement.webp?v=1737551146",
  },
  {
    name: "Beetroot",
    slug: "beetroot-supplement-1",
    badge: "Top Rated",
    benefit: "Supports heart health & natural energy",
    price: "$39.99",
    image: "https://cdn.shopify.com/s/files/1/0694/3840/6879/files/Beetroot_Supplement.webp?v=1738244050",
  },
];

export function ThankYou({ discountCode, storeUrl, archetype }: ThankYouProps) {
  const [copied, setCopied] = useState(false);
  const [phase, setPhase] = useState<"celebrating" | "revealed">("celebrating");
  const confettiRan = useRef(false);

  // Celebration sequence
  useEffect(() => {
    // Fire confetti
    if (!confettiRan.current) {
      confettiRan.current = true;
      import("canvas-confetti").then((mod) => {
        const fire = mod.default;
        // Subtle gold/navy burst from center
        fire({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.4 },
          colors: ["#142b6f", "#c9a94e", "#667ba2", "#ffffff"],
          gravity: 1.2,
          scalar: 0.9,
          drift: 0,
        });
      });
    }

    // Transition to revealed phase after celebration
    const timer = setTimeout(() => setPhase("revealed"), 1800);
    return () => clearTimeout(timer);
  }, []);

  const copyCode = () => {
    navigator.clipboard.writeText(discountCode);
    // Haptic feedback on Android
    if ("vibrate" in navigator) navigator.vibrate(50);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareUrl = `${storeUrl}?ref=quiz`;
  const shareText = `I just discovered I'm "${archetype.name}" — Meo Nutrition's wellness quiz matched my health profile. Take yours:`;

  const handleShare = async (channel: string) => {
    if (channel === "native" && navigator.share) {
      try {
        await navigator.share({ title: archetype.name, text: shareText, url: shareUrl });
      } catch { /* user cancelled */ }
      return;
    }
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(shareUrl);
    const links: Record<string, string> = {
      whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      sms: `sms:?body=${encodedText}%20${encodedUrl}`,
    };
    if (links[channel]) window.open(links[channel], "_blank");
  };

  const autoApplyUrl = `${storeUrl}/discount/${discountCode}`;

  // Expiration date (14 days from now)
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 14);
  const expirationStr = expirationDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (phase === "celebrating") {
    return (
      <div className="text-center py-16 animate-fade-in">
        {/* Animated checkmark */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-brand-navy flex items-center justify-center animate-scale-in">
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-draw-check"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <p className="text-brand-navy/70 text-lg font-medium">
          Analyzing your responses...
        </p>
      </div>
    );
  }

  return (
    <div className="text-center">
      {/* Section 1: Archetype Reveal */}
      <div className="mb-10 stagger-reveal">
        <p className="text-brand-subtext text-sm uppercase tracking-[0.2em] mb-3 stagger-item">
          Your Health Profile
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-2 stagger-item">
          {archetype.name}
        </h2>
        <p className="text-brand-navy-light text-sm font-medium uppercase tracking-wider mb-4 stagger-item">
          {archetype.title}
        </p>
        <p className="text-brand-subtext text-base leading-relaxed max-w-sm mx-auto stagger-item">
          {archetype.description}
        </p>
      </div>

      {/* Section 2: Share */}
      <div className="mb-10 stagger-item" style={{ animationDelay: "0.5s" }}>
        <p className="text-brand-muted text-xs mb-3">Share your result</p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => handleShare("whatsapp")}
            className="w-10 h-10 rounded-full bg-brand-bg-secondary hover:bg-brand-border transition-colors flex items-center justify-center"
            aria-label="Share via WhatsApp"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#142b6f">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </button>
          <button
            onClick={() => handleShare("sms")}
            className="w-10 h-10 rounded-full bg-brand-bg-secondary hover:bg-brand-border transition-colors flex items-center justify-center"
            aria-label="Share via SMS"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#142b6f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </button>
          {typeof navigator !== "undefined" && "share" in navigator && (
            <button
              onClick={() => handleShare("native")}
              className="w-10 h-10 rounded-full bg-brand-bg-secondary hover:bg-brand-border transition-colors flex items-center justify-center"
              aria-label="Share"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#142b6f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Section 3: Discount Code Card */}
      <div className="bg-brand-bg-secondary border border-brand-border rounded-2xl p-8 max-w-sm mx-auto mb-4 stagger-item" style={{ animationDelay: "0.6s" }}>
        <p className="text-brand-subtext text-xs mb-1 uppercase tracking-[0.2em]">
          You&apos;ve unlocked a personal reward
        </p>
        <p className="text-brand-muted text-xs mb-4">
          Created exclusively for you
        </p>
        <p className="text-3xl font-bold text-brand-navy tracking-[0.15em] mb-5 font-mono">
          {discountCode}
        </p>

        <div className="flex flex-col gap-3">
          <a
            href={autoApplyUrl}
            className="block"
          >
            <LiquidMetalButton
              label="Shop Now — 25% Off Applied"
              onClick={() => {}}
            />
          </a>
          <button
            onClick={copyCode}
            className="text-brand-navy text-sm font-medium hover:text-brand-navy-hover transition-colors"
          >
            {copied ? "Copied!" : "Or copy your code"}
          </button>
        </div>
      </div>

      <p className="text-brand-muted text-xs mb-10">
        Valid until {expirationStr}
      </p>

      {/* Section 4: Bestseller Products */}
      <div className="stagger-item" style={{ animationDelay: "0.8s" }}>
        <p className="text-brand-subtext text-sm mb-5">
          Your 25% off works on all our products — here are our most loved:
        </p>
        <div className="flex flex-col gap-3">
          {PRODUCTS.map((product) => (
            <a
              key={product.slug}
              href={`${autoApplyUrl}?redirect=/products/${product.slug}`}
              className="flex items-center gap-4 p-4 bg-brand-bg-secondary border border-brand-border rounded-xl hover:border-brand-navy/20 transition-all text-left group"
            >
              <div className="w-14 h-14 rounded-lg bg-white flex-shrink-0 flex items-center justify-center overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-12 h-12 object-contain"
                  loading="lazy"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-bold text-brand-navy text-sm">{product.name}</span>
                  <span className="text-[10px] font-medium text-brand-navy/60 bg-brand-navy/5 px-1.5 py-0.5 rounded">
                    {product.badge}
                  </span>
                </div>
                <p className="text-brand-muted text-xs leading-snug">{product.benefit}</p>
              </div>
              <div className="flex-shrink-0 text-right">
                <p className="text-brand-navy font-bold text-sm">{product.price}</p>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-brand-muted group-hover:text-brand-navy transition-colors ml-auto mt-1"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </div>
            </a>
          ))}
        </div>

        <a
          href={autoApplyUrl}
          className="inline-flex items-center gap-2 text-brand-navy hover:text-brand-navy-hover transition-colors text-sm font-medium mt-6"
        >
          Browse all products
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </a>
      </div>

      {/* Trust footer */}
      <div className="mt-12 pt-8 border-t border-brand-border flex flex-col gap-2 text-brand-muted text-xs">
        <p>Free shipping on orders over $50</p>
        <p>60-day money-back guarantee</p>
      </div>
    </div>
  );
}
