import { Analytics } from '@vercel/analytics/react';

import { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Footer } from '@/components/Common/Footer';

import '@/styles/globals.css';

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_SITE_TITLE,
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
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
      <body className="flex flex-col overflow-hidden overflow-y-auto min-h-screen w-screen">
        <Analytics />
        <div className="block grow h-full w-full">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
