import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meo Nutrition \u2014 Quick Survey",
  description: "Help us understand what matters most to you. Takes 60 seconds.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-brand-bg antialiased">
        <main className="relative z-10 max-w-lg mx-auto px-5 py-12 md:py-20">
          {/* Branded header */}
          <div className="mb-12 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center">
              <span className="text-brand-accent font-bold text-sm">M</span>
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-[0.15em] text-brand-accent uppercase">
                Meo Nutrition
              </h1>
              <p className="text-[10px] text-brand-muted tracking-[0.1em] uppercase">
                Where Wellness Meets Excellence
              </p>
            </div>
          </div>
          {children}
        </main>
      </body>
    </html>
  );
}
