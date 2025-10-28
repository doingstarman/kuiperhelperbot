'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { NeumorphicButton } from '@/components/NeumorphicButton';
import { TelegramIcon } from '@/icons/Telegram';
import { SunIcon } from '@/icons/Sun';
import { MoonIcon } from '@/icons/Moon';
import { useTelegramWebApp } from '@/lib/useTelegramWebApp';

const navLinks = [
  { href: '/', label: 'Overview' },
  { href: '/links', label: 'Links' },
  { href: '/contact', label: 'Contact' },
];

export function TopBar() {
  const pathname = usePathname();
  const { setTheme, resolvedTheme } = useTheme();
  const { colorScheme } = useTelegramWebApp();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!colorScheme) {
      return;
    }
    setTheme(colorScheme);
  }, [colorScheme, setTheme]);

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/60 bg-slate-100/80 backdrop-blur-md dark:border-slate-700/60 dark:bg-slate-900/80">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
          <span className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-lg">
            <TelegramIcon className="h-5 w-5" />
          </span>
          Kuiper Helper
        </Link>
        <nav className="relative hidden gap-3 sm:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-x-1 -bottom-2 h-1 rounded-full bg-gradient-to-r from-primary to-accent"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          {mounted && (
            <NeumorphicButton
              aria-label="Toggle theme"
              onClick={toggleTheme}
              className="grid h-12 w-12 place-items-center p-0"
            >
              {resolvedTheme === 'dark' ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </NeumorphicButton>
          )}
        </div>
      </div>
      <div className="flex justify-center gap-2 px-4 pb-4 sm:hidden">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg'
                  : 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </header>
  );
}
