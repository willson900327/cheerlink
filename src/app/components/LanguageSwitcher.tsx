'use client';

import { useRouter, usePathname } from 'next/navigation';
import { languages, Language } from '../i18n/config';
import { useState, useCallback, useMemo } from 'react';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [isChanging, setIsChanging] = useState(false);

  const currentLang = useMemo((): Language => {
    const pathSegments = pathname.split('/');
    const langSegment = pathSegments[1];
    return languages.includes(langSegment as Language) ? (langSegment as Language) : 'zh';
  }, [pathname]);

  const getNewPathname = useCallback((newLang: Language) => {
    if (pathname === '/') {
      return `/${newLang}`;
    }
    return pathname.replace(`/${currentLang}`, `/${newLang}`);
  }, [pathname, currentLang]);

  const handleLanguageChange = useCallback(async (newLang: Language) => {
    if (isChanging || newLang === currentLang) return;
    
    setIsChanging(true);
    const newPathname = getNewPathname(newLang);
    
    try {
      await router.push(newPathname);
    } catch (error) {
      console.error('Failed to change language:', error);
    } finally {
      setIsChanging(false);
    }
  }, [isChanging, currentLang, getNewPathname, router]);

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => handleLanguageChange('zh')}
        disabled={isChanging || currentLang === 'zh'}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
          isChanging ? 'opacity-50 cursor-not-allowed' :
          currentLang === 'zh'
            ? 'bg-sky-100 text-sky-700'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        中文
      </button>
      <button
        onClick={() => handleLanguageChange('en')}
        disabled={isChanging || currentLang === 'en'}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
          isChanging ? 'opacity-50 cursor-not-allowed' :
          currentLang === 'en'
            ? 'bg-sky-100 text-sky-700'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        EN
      </button>
    </div>
  );
}
