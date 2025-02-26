'use client';

import { Language } from '../i18n/config';
import { translations as enTranslations } from '../i18n/translations/en';
import { translations as zhTranslations } from '../i18n/translations/zh';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function HomePage() {
  const params = useParams();
  const [lang, setLang] = useState<Language>('en');
  const translations = lang === 'en' ? enTranslations : zhTranslations;

  useEffect(() => {
    // Set language after component mounts to avoid hydration mismatch
    setLang(params?.lang === 'zh' ? 'zh' : 'en');
  }, [params?.lang]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-gray-100">
      <div className="pt-56 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block xl:inline">CHEERLINK</span>
              <span className="block text-sky-600 xl:inline">
                {lang === 'en' ? ' - Professional E-card' : ' - 您的專業線上名片'}
              </span>
            </h1>
            <p className="mt-6 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-8 md:text-xl md:max-w-3xl">
              {lang === 'en' 
                ? 'Create, customize, and share your digital business card in minutes. Connect with professionals worldwide.'
                : '在幾分鐘內創建、自訂和分享您的數位名片。與全球專業人士建立聯繫。'
              }
            </p>
            <div className="mt-8 max-w-md mx-auto sm:flex sm:justify-center md:mt-10">
              <div className="rounded-md shadow">
                <Link
                  href={`/${lang}/cards`}
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 md:py-4 md:text-lg md:px-10"
                >
                  {translations.common.createCard}
                </Link>
              </div>
            </div>
          </div>

          {/* Demo Video Section */}
          <div className="mt-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-gray-900">
                {lang === 'en' ? 'See How It Works' : '觀看示範'}
              </h2>
              <p className="mt-4 text-lg text-gray-500">
                {lang === 'en'
                  ? 'Watch our demo video to see how easy it is to create and manage your digital business cards.'
                  : '觀看我們的示範影片，了解如何輕鬆創建和管理您的數位名片。'
                }
              </p>
              <div className="mt-8 aspect-video w-full max-w-4xl mx-auto rounded-lg overflow-hidden shadow-xl">
                <video
                  className="w-full h-full object-cover"
                  controls
                  poster="/demo-poster.jpg"
                >
                  <source src="/demo.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
          
          <div className="mt-32">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="pt-6">
                <div className="flow-root bg-white rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div className="inline-flex items-center justify-center p-3 bg-sky-500 rounded-md shadow-lg">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                      {lang === 'en' ? 'Easy to Create' : '輕鬆創建'}
                    </h3>
                    <p className="mt-5 text-base text-gray-500">
                      {lang === 'en' 
                        ? 'Create your digital business card in minutes with our intuitive interface.'
                        : '使用我們直觀的界面，在幾分鐘內創建您的數位名片。'
                      }
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <div className="flow-root bg-white rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div className="inline-flex items-center justify-center p-3 bg-sky-500 rounded-md shadow-lg">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                      {lang === 'en' ? 'Customizable Design' : '自訂設計'}
                    </h3>
                    <p className="mt-5 text-base text-gray-500">
                      {lang === 'en'
                        ? 'Personalize your card with custom colors, images, and information.'
                        : '使用自訂顏色、圖像和信息個性化您的名片。'
                      }
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <div className="flow-root bg-white rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div className="inline-flex items-center justify-center p-3 bg-sky-500 rounded-md shadow-lg">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                      {lang === 'en' ? 'Easy to Share' : '輕鬆分享'}
                    </h3>
                    <p className="mt-5 text-base text-gray-500">
                      {lang === 'en'
                        ? 'Share your digital card via QR code, link, or email with anyone.'
                        : '通過二維碼、連結或電子郵件與任何人分享您的數位名片。'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
