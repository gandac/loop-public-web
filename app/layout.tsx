import { type ReactNode } from 'react';

import '../styles/globals.css';

// import { Inter } from 'next/font/google';

// const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Notion Next.js blog',
  description: 'Notion Next.js blog'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      {/* <body className={inter.className}> */}
      <body>{children}</body>
    </html>
  );
}
