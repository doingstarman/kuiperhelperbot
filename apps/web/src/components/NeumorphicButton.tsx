'use client';

import { motion } from 'framer-motion';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

type Props = {
  children: ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function NeumorphicButton({ children, className, ...props }: Props) {
  return (
    <motion.button
      whileHover={{ y: -2, boxShadow: '0 20px 40px rgba(15, 23, 42, 0.25)' }}
      whileTap={{ scale: 0.98 }}
      className={clsx(
        'inline-flex items-center justify-center rounded-2xl bg-slate-100 px-4 py-2 font-medium text-slate-900 shadow-lg transition-all duration-200 dark:bg-slate-800 dark:text-slate-100',
        'shadow-[10px_10px_25px_rgba(15,23,42,0.12),-10px_-10px_25px_rgba(255,255,255,0.2)] dark:shadow-[10px_10px_25px_rgba(0,0,0,0.45),-10px_-10px_25px_rgba(148,163,184,0.1)]',
        className,
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
