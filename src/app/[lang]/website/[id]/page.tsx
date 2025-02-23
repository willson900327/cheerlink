'use client';

import { useEffect, useState } from 'react';
import { getBusinessCard } from '../../../firebase/services';
import { BusinessCard } from '../../../types/businessCard';
import { Language } from '../../../i18n/config';
import BusinessCardWebsite from '../../../components/BusinessCardWebsite';

interface WebsitePageProps {
  params: {
    id: string;
    lang: Language;
  };
}

export default function WebsitePage({ params }: WebsitePageProps) {
  const { id, lang } = params;
  const [card, setCard] = useState<BusinessCard | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function fetchCard() {
      if (!id) {
        const baseUrl = window.location.origin;
        window.location.href = `${baseUrl}/${lang}/cards`;
        return;
      }

      getBusinessCard(id)
        .then((cardData) => {
          if (!cardData) {
            const baseUrl = window.location.origin;
            window.location.href = `${baseUrl}/${lang}/cards`;
            return;
          }
          setCard(cardData);
        })
        .catch((error) => {
          console.error('Error fetching card:', error);
          const baseUrl = window.location.origin;
          window.location.href = `${baseUrl}/${lang}/cards`;
        })
        .finally(() => {
          setLoading(false);
        });
    }

    fetchCard();
  }, [id, lang]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-sky-500"></div>
      </div>
    );
  }

  if (!card) {
    return (
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center pt-24">
            <h1 className="text-3xl font-extrabold text-gray-900">
              {lang === 'en' ? 'Card not found' : '找不到名片'}
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              {lang === 'en' 
                ? 'The business card you are looking for does not exist.'
                : '您要查看的名片不存在。'
              }
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <BusinessCardWebsite card={card} lang={lang} />;
}
