import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import BackLink from './back-link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Authkit examples',
  description: 'A collection of examples for Authkit',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BackLink />
        {children}
      </body>
    </html>
  );
}
