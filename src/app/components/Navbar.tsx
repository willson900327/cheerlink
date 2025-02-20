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

  const t = translations[lang];

  const handleCreateCard = () => {
    setIsCreateModalOpen(true);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href={`/${lang}`} className="flex items-center px-4">
              <Image src="/images/logo.png" alt="Logo" width={32} height={32} className="w-8 h-8" />
              <span className="ml-2 text-xl font-bold text-gray-900">CheerLink</span>
            </Link>
            <div className="hidden sm:flex sm:space-x-4 sm:ml-6 sm:items-center">
              <Link href={`/${lang}`} className="px-3 py-2 text-gray-700 hover:text-gray-900">
                {t.home}
              </Link>
              <Link href={`/${lang}/cards`} className="px-3 py-2 text-gray-700 hover:text-gray-900">
                {t.cards}
              </Link>
              <Link href={`/${lang}/about`} className="px-3 py-2 text-gray-700 hover:text-gray-900">
                {t.about}
              </Link>
              <div className="relative group">
                <button className="px-3 py-2 text-gray-700 hover:text-gray-900">
                  {t.help}
                </button>
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link href={`/${lang}/help`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    {t.help}
                  </Link>
                  <Link href={`/${lang}/faq`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    {t.faq}
                  </Link>
                  <Link href={`/${lang}/guide`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    {t.guide}
                  </Link>
                </div>
              </div>
              <Link href={`/${lang}/contact`} className="px-3 py-2 text-gray-700 hover:text-gray-900">
                {t.contact}
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            {session ? (
              <>
                <button
                  onClick={handleCreateCard}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  {t.createCard}
                </button>
                <button
                  onClick={() => signOut()}
                  className="text-gray-700 hover:text-gray-900 px-3 py-2"
                >
                  {t.logout}
                </button>
              </>
            ) : (
              <button
                onClick={() => signIn()}
                className="text-gray-700 hover:text-gray-900 px-3 py-2"
              >
                {t.login}
              </button>
            )}
          </div>
        </div>
      </div>

      <CreateCardModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </nav>
  );
}
