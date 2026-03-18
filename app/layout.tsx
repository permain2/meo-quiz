import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meo Nutrition \u2014 Quick Survey",
  description: "Help us understand what matters most to you. Takes 60 seconds.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-brand-bg text-white antialiased">
        <main className="max-w-lg mx-auto px-5 py-12 md:py-20">
          <div className="mb-10">
            <h1 className="text-lg font-semibold tracking-wide text-brand-accent">MEO NUTRITION</h1>
          </div>
          {children}
        </main>
      </body>
    </html>
  );
}
