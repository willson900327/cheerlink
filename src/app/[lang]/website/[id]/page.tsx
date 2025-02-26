'use client';

import { useEffect, useState } from 'react';
import { getBusinessCard } from '../../../firebase/services';
import { BusinessCard } from '../../../types/businessCard';
import { Language } from '../../../i18n/config';
import BusinessCardWebsite from '../../../components/BusinessCardWebsite';
import { useSession } from 'next-auth/react';

interface WebsitePageProps {
  params: {
    id: string;
    lang: Language;
  };
}

export default function WebsitePage({ params }: WebsitePageProps) {
  const { id, lang } = params;
  const { data: session } = useSession();
  const [card, setCard] = useState<BusinessCard | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCard() {
      if (!id) {
        const baseUrl = window.location.origin;
        window.location.href = `${baseUrl}/${lang}/cards`;
        return;
      }

      try {
        if (session?.user?.email) {
          // 登入用戶：從 Firebase 獲取名片
          const cardData = await getBusinessCard(id);
          if (!cardData) {
            const baseUrl = window.location.origin;
            window.location.href = `${baseUrl}/${lang}/cards`;
            return;
          }
          setCard(cardData);
        } else {
          // 未登入用戶：從 localStorage 獲取名片
          const savedCards = localStorage.getItem('tempBusinessCards');
          if (savedCards) {
            const cards = JSON.parse(savedCards);
            const foundCard = cards.find((c: BusinessCard) => c.id === id);
            if (foundCard) {
              setCard(foundCard);
            } else {
              const baseUrl = window.location.origin;
              window.location.href = `${baseUrl}/${lang}/cards`;
            }
          } else {
            const baseUrl = window.location.origin;
            window.location.href = `${baseUrl}/${lang}/cards`;
          }
        }
      } catch (error) {
        console.error('Error fetching card:', error);
        const baseUrl = window.location.origin;
        window.location.href = `${baseUrl}/${lang}/cards`;
      } finally {
        setLoading(false);
      }
    }

    fetchCard();
  }, [id, lang, session]);

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
