'use client';

import { useSession, signIn } from 'next-auth/react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import ShareButtons from '@/app/components/ShareButtons';

export default function HomePage() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const lang = pathname.split('/')[1] === 'en' ? 'en' : 'zh';

  const translations = {
    en: {
      title: "Digital Business Card",
      subtitle: "Create and share your digital business card in seconds",
      description: 'Transform your networking experience with our digital business cards. Share your contact information instantly and make a lasting impression.',
      features: {
        title: "Features",
        items: [
          {
            title: "Easy to Create",
            description: "Create your digital business card in minutes with our intuitive interface"
          },
          {
            title: "Share Instantly",
            description: "Share your card via QR code, social media, or direct link"
          },
          {
            title: "Always Updated",
            description: "Update your information anytime, everywhere"
          },
          {
            title: "Eco-Friendly",
            description: "Go green with digital cards and reduce paper waste.",
            icon: '🌱'
          }
        ]
      },
      cta: "Get Started",
      demo: "View Demo",
      share: "Share this App"
    },
    zh: {
      title: "數位名片",
      subtitle: "在幾秒鐘內創建和分享您的數位名片",
      description: '使用我們的數字名片改變您的社交網絡體驗。即時分享您的聯繫信息，留下持久的印象。',
      features: {
        title: "功能特點",
        items: [
          {
            title: "輕鬆創建",
            description: "使用我們的直觀界面，在幾分鐘內創建您的數位名片"
          },
          {
            title: "即時分享",
            description: "通過二維碼、社交媒體或直接連結分享您的名片"
          },
          {
            title: "隨時更新",
            description: "隨時隨地更新您的信息"
          },
          {
            title: "環保理念",
            description: "使用數字名片，減少紙張浪費。",
            icon: '🌱'
          }
        ]
      },
      cta: "立即開始",
      demo: "查看演示",
      share: "分享此應用"
    }
  };

  const t = translations[lang];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-br from-sky-400 to-blue-600 text-white">
        <div className="max-w-6xl mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{t.title}</h1>
          <p className="text-xl md:text-2xl mb-12 text-sky-100">{t.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            {session ? (
              <Link
                href={`/${lang}/cards`}
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-sky-50 transition-colors duration-300"
              >
                {t.cta}
              </Link>
            ) : (
              <button
                onClick={() => signIn('google')}
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-sky-50 transition-colors duration-300"
              >
                <Image
                  src="/images/google.svg"
                  alt="Google"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                {t.cta}
              </button>
            )}
            <Link
              href={`/${lang}/demo`}
              className="inline-flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white/10 transition-colors duration-300"
            >
              {t.demo}
            </Link>
          </div>
          
          {/* Share Section */}
          <div className="mt-12">
            <h2 className="text-xl font-semibold mb-4">{t.share}</h2>
            <div className="flex justify-center">
              <ShareButtons
                cardId="home"
                title={t.title}
                description={t.subtitle}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="w-full py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">{t.features.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.features.items.map((feature, index) => (
              <div key={index} className="p-6 rounded-lg bg-sky-50 hover:bg-sky-100 transition-colors duration-300">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
