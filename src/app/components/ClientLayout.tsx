'use client';

import { Providers } from '../providers';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface ClientLayoutProps {
  children: React.ReactNode;
  lang: string;
}

export default function ClientLayout({ children, lang }: ClientLayoutProps) {
  const pathname = usePathname();
  
  // 計算另一個語言的路徑
  const getOtherLangPath = () => {
    const otherLang = lang === 'en' ? 'zh' : 'en';
    const pathWithoutLang = pathname.substring(3); // 移除 /en 或 /zh
    return `/${otherLang}${pathWithoutLang}`;
  };

  return (
    <body className="flex flex-col min-h-screen bg-gray-50">
      <Providers>
        <main className="flex-grow">
          {children}
        </main>
        <footer className="bg-gray-800 text-white py-6 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <div className="text-sm">
                © {new Date().getFullYear()} Digital Business Card. All rights reserved.
              </div>
              <div className="flex space-x-4">
                <Link
                  href={getOtherLangPath()}
                  className="text-sm hover:text-gray-300"
                >
                  {lang === 'en' ? '中文' : 'English'}
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </Providers>
    </body>
  );
}
