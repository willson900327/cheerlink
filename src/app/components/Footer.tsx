'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface FooterProps {
  lang: string;
}

export default function Footer({ lang }: FooterProps) {
  const pathname = usePathname();
  
  const translations = {
    en: {
      about: 'About',
      help: 'Help',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      cookies: 'Cookie Policy',
      contact: 'Contact',
      faq: 'FAQ',
      guide: 'Guide',
      legal: 'Legal'
    },
    zh: {
      about: '關於我們',
      help: '幫助中心',
      privacy: '隱私政策',
      terms: '服務條款',
      cookies: 'Cookie 政策',
      contact: '聯繫我們',
      faq: '常見問題',
      guide: '使用指南',
      legal: '法律信息'
    }
  };

  const t = translations[lang as keyof typeof translations];

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Digital Business Card</h3>
            <div className="text-sm text-gray-300">
              {new Date().getFullYear()} Digital Business Card. All rights reserved.
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{t.about}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${lang}/about`} className="text-sm text-gray-300 hover:text-white">
                  {t.about}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/contact`} className="text-sm text-gray-300 hover:text-white">
                  {t.contact}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{t.help}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${lang}/help`} className="text-sm text-gray-300 hover:text-white">
                  {t.help}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/faq`} className="text-sm text-gray-300 hover:text-white">
                  {t.faq}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/guide`} className="text-sm text-gray-300 hover:text-white">
                  {t.guide}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{t.legal}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${lang}/privacy`} className="text-sm text-gray-300 hover:text-white">
                  {t.privacy}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/terms`} className="text-sm text-gray-300 hover:text-white">
                  {t.terms}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/cookies`} className="text-sm text-gray-300 hover:text-white">
                  {t.cookies}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 flex justify-between items-center">
          <div className="text-sm text-gray-300">
            Made with ❤️ in Taiwan
          </div>
          <div>
            <Link
              href={`/${lang === 'en' ? 'zh' : 'en'}${pathname.substring(3)}`}
              className="text-sm text-gray-300 hover:text-white"
            >
              {lang === 'en' ? '中文' : 'English'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
