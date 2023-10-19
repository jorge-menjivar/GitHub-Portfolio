import { Analytics } from '@vercel/analytics/react';

import { Metadata } from 'next';
import { Inter } from 'next/font/google';

import '@/styles/globals.css';

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Jorge Menjivar',
  description: "Jorge Menjivar's website",
  viewport:
    'height=device-height, width=device-width, initial-scale=1, user-scalable=no viewport-fit=cover',
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="overflow-y-auto overscroll-none h-full w-full">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
