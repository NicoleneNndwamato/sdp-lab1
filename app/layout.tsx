// app/layout.tsx
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Todo',
  description: 'Local-first task manager',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className="border-b border-black/10 dark:border-white/10 px-6 py-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold">Todo</h1>
          <a href="/" className="text-sm underline text-black/60 dark:text-white/60">
            Home
          </a>
        </header>
        <main className="max-w-2xl mx-auto px-6 py-8">{children}</main>
      </body>
    </html>
  );
}