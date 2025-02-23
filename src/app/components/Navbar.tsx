'use client';

import React, { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import CreateCardModal from './CreateCardModal';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();

  // 從 pathname 獲取當前語言
  const getCurrentLanguage = () => {
    const pathSegments = pathname.split('/');
    if (pathSegments[1] === 'en' || pathSegments[1] === 'zh') {
      return pathSegments[1];
    }
    return 'zh';
  };

  const lang = getCurrentLanguage();

  const translations = {
    en: {
      home: 'Home',
      cards: 'My Cards',
      about: 'About',
      help: 'Help',
      contact: 'Contact',
      createCard: 'Create Card',
      faq: 'FAQ',
      guide: 'Guide',
      login: 'Login',
      logout: 'Logout'
    },
    zh: {
      home: '首頁',
      cards: '我的名片',
      about: '關於我們',
      help: '幫助中心',
      contact: '聯繫我們',
      createCard: '創建名片',
      faq: '常見問題',
      guide: '使用指南',
      login: '登入',
      logout: '登出'
    }
  };

  const t = translations[lang as keyof typeof translations];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href={`/${lang}`} className="flex items-center">
                <Image
                  src="/images/logo.png"
                  alt="Digital Card Logo"
                  width={32}
                  height={32}
                  className="w-8 h-8 mr-2"
                />
                <span className="text-xl font-bold text-gray-800">
                  Digital Card
                </span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href={`/${lang}`}
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  pathname === `/${lang}` ? 'text-sky-600 border-b-2 border-sky-600' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {t.home}
              </Link>
              {session && (
                <Link
                  href={`/${lang}/cards`}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                    pathname === `/${lang}/cards` ? 'text-sky-600 border-b-2 border-sky-600' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {t.cards}
                </Link>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            {session ? (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700"
                >
                  {t.createCard}
                </button>
                <button
                  onClick={() => signOut()}
                  className="text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  {t.logout}
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn()}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700"
              >
                {t.login}
              </button>
            )}
          </div>
        </div>
      </div>
      {isCreateModalOpen && (
        <CreateCardModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          mode="create"
        />
      )}
    </nav>
  );
}
