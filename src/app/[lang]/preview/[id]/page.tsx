'use client';

import { useEffect, useState } from 'react';
import { getBusinessCard } from '../../../firebase/services';
import { BusinessCard } from '../../../types/businessCard';
import { use } from 'react';
import { Language } from '../../../i18n/config';
import BusinessCardPreview from '../../../components/BusinessCardPreview';

interface PreviewPageProps {
  params: Promise<{
    id: string;
    lang: Language;
  }>;
}

export default function PreviewPage({ params }: PreviewPageProps) {
  const { id, lang } = use(params);
  const [card, setCard] = useState<BusinessCard | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCard() {
      try {
        const cardData = await getBusinessCard(id);
        setCard(cardData);
      } catch (error) {
        console.error('Error fetching card:', error);
      }
      setLoading(false);
    }

    fetchCard();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-sky-500"></div>
      </div>
    );
  }

  if (!card) {
    return (
      <div className="min-h-screen pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900">
              {lang === 'en' ? 'Card not found' : '找不到名片'}
            </h1>
            <p className="mt-4 text-gray-500">
              {lang === 'en'
                ? 'The card you are looking for does not exist.'
                : '您要找的名片不存在。'
              }
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BusinessCardPreview card={card} />
      </div>
    </div>
  );
}
