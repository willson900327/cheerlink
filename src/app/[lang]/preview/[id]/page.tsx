'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { BusinessCard } from '@/app/types/types';
import { getBusinessCard } from '@/app/firebase/services';
import ShareButtons from '@/app/components/ShareButtons';

interface PreviewPageProps {
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
    share: 'Share this Card'
  },
  zh: {
    loading: '載入中...',
    error: '載入名片時發生錯誤',
    notFound: '找不到名片',
    contact: '聯絡資訊',
    share: '分享此名片'
  }
};

export default function PreviewPage({ params }: PreviewPageProps) {
  const [card, setCard] = useState<BusinessCard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();
  const lang = pathname.split('/')[1] === 'en' ? 'en' : 'zh';
  const t = translations[lang];

  useEffect(() => {
    const loadCard = async () => {
      try {
        const data = await getBusinessCard(params.id);
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
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Card Preview */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Background Image */}
        {card.backgroundImage && (
          <div className="h-48 w-full relative">
            <img
              src={card.backgroundImage}
              alt="Background"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-6">
          <div className="flex items-center space-x-4">
            {/* Avatar */}
            {card.avatarImage && (
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img
                  src={card.avatarImage}
                  alt={card.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Basic Info */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{card.name}</h1>
              <p className="text-gray-600">{card.title}</p>
              {card.company && (
                <p className="text-gray-500">{card.company}</p>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {t.contact}
            </h2>
            <div className="space-y-3">
              {card.email && (
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href={`mailto:${card.email}`} className="text-sky-600 hover:text-sky-700">
                    {card.email}
                  </a>
                </div>
              )}
              {card.phone && (
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href={`tel:${card.phone}`} className="text-sky-600 hover:text-sky-700">
                    {card.phone}
                  </a>
                </div>
              )}
              {card.website && (
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  <a href={card.website} target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:text-sky-700">
                    {card.website}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Share Section */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">{t.share}</h2>
        <ShareButtons cardId={card.id} lang={lang} />
      </div>
    </div>
  );
}
