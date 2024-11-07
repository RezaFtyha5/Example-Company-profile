// app/components/Hero.tsx
'use client';

import { useLanguage } from '../LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="min-h-screen flex items-center bg-gradient-to-br from-blue-50 to-white pt-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-6 animate-fade-in-up">
          {t('welcome')}
        </h1>
        <p className="text-xl text-gray-600 mb-8 animate-fade-in-up animate-delay-100">
          {t('tagline')}
        </p>
        <a
          href="#kontak"
          className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-all duration-300 hover:scale-105 animate-fade-in-up animate-delay-200"
        >
          {t('cta')}
        </a>
      </div>
    </section>
  );
}