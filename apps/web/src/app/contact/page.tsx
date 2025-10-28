'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { NeumorphicButton } from '@/components/NeumorphicButton';
import { CONTACT_EMAIL, CONTACT_PHONE, TELEGRAM_USERNAME } from '@/config/constants';

const contactMethods = [
  {
    title: 'Telegram',
    detail: `@${TELEGRAM_USERNAME}`,
    href: `https://t.me/${TELEGRAM_USERNAME}`,
  },
  {
    title: 'Email',
    detail: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
  },
  {
    title: 'Phone',
    detail: CONTACT_PHONE,
    href: `tel:${CONTACT_PHONE.replace(/[^\d+]/g, '')}`,
  },
];

export default function ContactPage() {
  const handleNavigate = (href: string) => {
    if (typeof window !== 'undefined') {
      window.open(href, '_blank', 'noreferrer');
    }
  };

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-10">
      <header className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Get in touch</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Whether you need onboarding support, a custom workflow, or want to collaborate on new
          features, the Kuiper team is just a tap away.
        </p>
      </header>
      <div className="grid gap-6 sm:grid-cols-2">
        {contactMethods.map((method, index) => (
          <motion.div
            key={method.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            viewport={{ once: true, margin: '-80px' }}
            className="flex flex-col justify-between rounded-3xl bg-white/70 p-6 shadow-lg ring-1 ring-slate-200/60 backdrop-blur dark:bg-slate-900/70 dark:ring-slate-700/60"
          >
            <div>
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">{method.title}</h2>
              <Link
                href={method.href}
                target="_blank"
                rel="noreferrer"
                className="mt-2 text-sm text-slate-600 underline-offset-4 hover:underline dark:text-slate-300"
              >
                {method.detail}
              </Link>
            </div>
            <NeumorphicButton className="mt-6" onClick={() => handleNavigate(method.href)}>
              Reach out
            </NeumorphicButton>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
