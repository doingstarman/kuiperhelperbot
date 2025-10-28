import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import './globals.css';
import { RootThemeProvider } from '@/components/ThemeProvider';
import { TopBar } from '@/components/TopBar';
import { WEBAPP_URL } from '@/config/constants';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Kuiper Helper Bot',
  description: 'Telegram companion web app with smooth theming and delightful micro-interactions.',
  metadataBase: new URL(WEBAPP_URL),
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <RootThemeProvider>
          <div className="min-h-screen">
            <TopBar />
            <main className="px-4 pb-16 pt-24 sm:px-8 lg:px-16">{children}</main>
          </div>
        </RootThemeProvider>
      </body>
    </html>
  );
}
