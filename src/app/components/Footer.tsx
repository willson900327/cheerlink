'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  const lang = pathname.split('/')[1] === 'en' ? 'en' : 'zh';

  const translations = {
    en: {
      about: 'About Us',
      contact: 'Contact Us',
      help: 'Help Center',
      faq: 'FAQ',
      guide: 'User Guide',
      legal: 'Legal',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      cookies: 'Cookie Policy',
      copyright: ' 2025 CheerLink. All rights reserved.',
    },
    zh: {
      about: '關於我們',
      contact: '聯繫我們',
      help: '幫助中心',
      faq: '常見問題',
      guide: '使用指南',
      legal: '法律條款',
      privacy: '隱私政策',
      terms: '使用條款',
      cookies: 'Cookie 政策',
      copyright: ' 2025 CheerLink. 保留所有權利。',
    }
  };

  const t = translations[lang];

  return (
    <footer className="bg-sky-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-sky-300 hover:text-sky-500">{t.about}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${lang}/about`} className="text-gray-600 hover:text-gray-900">
                  {t.about}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/contact`} className="text-gray-600 hover:text-gray-900">
                  {t.contact}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-sky-300 hover:text-sky-500">{t.help}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${lang}/faq`} className="text-gray-600 hover:text-gray-900">
                  {t.faq}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/guide`} className="text-gray-600 hover:text-gray-900">
                  {t.guide}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-sky-300 hover:text-sky-500">{t.legal}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${lang}/privacy`} className="text-gray-600 hover:text-gray-900">
                  {t.privacy}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/terms`} className="text-gray-600 hover:text-gray-900">
                  {t.terms}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/cookies`} className="text-gray-600 hover:text-gray-900">
                  {t.cookies}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-sky-300 hover:text-sky-500">關注我們</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
          <p>{t.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
