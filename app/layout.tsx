import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meo Nutrition \u2014 Quick Survey",
  description: "Help us understand what matters most to you. Takes 60 seconds.",
  icons: {
    icon: "https://cdn.shopify.com/s/files/1/0694/3840/6879/files/Favicon.png?v=1711105316",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-brand-bg antialiased">
        <main className="max-w-lg mx-auto px-5 py-10 md:py-16">
          {/* Logo header */}
          <div className="mb-10 flex justify-center">
            <img
              src="https://cdn.shopify.com/s/files/1/0694/3840/6879/files/Meo_Nutrition_Submark.png?v=1733901512"
              alt="Meo Nutrition"
              className="h-20 w-auto"
            />
          </div>
          {children}
        </main>
      </body>
    </html>
  );
}
