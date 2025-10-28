'use client';

import { useEffect, useState } from 'react';

type TelegramWebApp = {
  ready: () => void;
  expand: () => void;
  colorScheme: 'light' | 'dark';
  onEvent: (event: string, handler: () => void) => void;
  offEvent: (event: string, handler: () => void) => void;
};

type Telegram = {
  WebApp?: TelegramWebApp;
};

declare global {
  interface Window {
    Telegram?: Telegram;
  }
}

export function useTelegramWebApp() {
  const [webApp, setWebApp] = useState<TelegramWebApp | null>(null);
  const [colorScheme, setColorScheme] = useState<'light' | 'dark' | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const instance = window.Telegram?.WebApp ?? null;

    if (!instance) {
      return;
    }

    instance.ready();
    instance.expand();
    setWebApp(instance);
    setColorScheme(instance.colorScheme);

    const handleThemeChange = () => {
      setColorScheme(instance.colorScheme);
    };

    instance.onEvent?.('themeChanged', handleThemeChange);

    return () => {
      instance.offEvent?.('themeChanged', handleThemeChange);
    };
  }, []);

  return { webApp, colorScheme } as const;
}
