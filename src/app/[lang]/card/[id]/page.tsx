'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { BusinessCard } from '@/app/types/types';
import { getBusinessCardById } from '@/app/firebase/services';
import ShareButtons from '@/app/components/ShareButtons';
import Image from 'next/image';

interface CardPageProps {
  params: {
    id: string;
    lang: string;
  };
}

const translations = {
  en: {
    loading: 'Loading...',
    error: 'Error loading business card',
    notFound: 'Business card not found',
    contact: 'Contact Information',
    share: 'Share Business Card',
    downloadVCard: 'Download vCard'
  },
  zh: {
    loading: '載入中...',
    error: '載入名片時發生錯誤',
    notFound: '找不到名片',
    contact: '聯絡資訊',
    share: '分享名片',
    downloadVCard: '下載電子名片'
  }
};

export default function CardPage({ params }: CardPageProps) {
  const [card, setCard] = useState<BusinessCard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();
  const lang = pathname.split('/')[1] === 'en' ? 'en' : 'zh';
  const t = translations[lang];

  useEffect(() => {
    const loadCard = async () => {
      try {
        const data = await getBusinessCardById(params.id);
        if (data) {
          setCard(data);
        } else {
          setError(t.notFound);
        }
      } catch (err) {
        console.error('Error loading card:', err);
        setError(t.error);
      } finally {
        setLoading(false);
      }
    };

    loadCard();
  }, [params.id, t.error, t.notFound]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-8 h-8 border-4 border-sky-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !card) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 背景圖片 */}
      {card.backgroundImage && (
        <div className="h-64 w-full relative">
          <img
            src={card.backgroundImage}
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50"></div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 py-8 -mt-32 relative">
        <div className="bg-white rounded-lg shadow-xl p-8">
          {/* 頭像和基本信息 */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {card.avatarImage && (
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg flex-shrink-0">
                <img
                  src={card.avatarImage}
                  alt={card.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="flex-grow text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900">{card.name}</h1>
              <p className="text-xl text-gray-600 mt-2">{card.title}</p>
              <p className="text-lg text-gray-600 mt-1">{card.company}</p>

              {/* 分享按鈕 */}
              <div className="mt-6">
                <ShareButtons
                  cardId={params.id}
                  title={`${card.name} - ${card.title}`}
                  description={card.description}
                />
              </div>
            </div>
          </div>

          {/* 聯絡信息 */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">{t.contact}</h2>
              <div className="space-y-4">
                {card.email && (
                  <a
                    href={`mailto:${card.email}`}
                    className="flex items-center text-gray-600 hover:text-sky-600 transition-colors"
                  >
                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                    {card.email}
                  </a>
                )}
                {card.phone && (
                  <a
                    href={`tel:${card.phone}`}
                    className="flex items-center text-gray-600 hover:text-sky-600 transition-colors"
                  >
                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                    {card.phone}
                  </a>
                )}
                {card.website && (
                  <a
                    href={card.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-600 hover:text-sky-600 transition-colors"
                  >
                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                    </svg>
                    {card.website}
                  </a>
                )}
                {card.address && (
                  <div className="flex items-center text-gray-600">
                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    {card.address}
                  </div>
                )}
              </div>
            </div>

            {/* 描述 */}
            {card.description && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">About</h2>
                <p className="text-gray-600 whitespace-pre-wrap">{card.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
