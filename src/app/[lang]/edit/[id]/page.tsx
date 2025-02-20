'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { getBusinessCard } from '../../../firebase/services';
import { BusinessCard } from '../../../types/businessCard';
import { Language } from '../../../i18n/config';
import CreateCardModal from '../../../components/CreateCardModal';
import { useRouter } from 'next/navigation';

interface EditPageProps {
  params: {
    id: string;
    lang: Language;
  };
}

export default function EditPage({ params }: EditPageProps) {
  const { id, lang } = params;
  const { data: session, status } = useSession();
  const router = useRouter();
  const [card, setCard] = useState<BusinessCard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCard = async () => {
      if (status === 'loading') return;

      if (!session) {
        router.push(`/${lang}`);
        return;
      }

      try {
        const cardData = await getBusinessCard(id);
        if (!cardData) {
          setError('Card not found');
          return;
        }

        if (cardData.userId !== session.user?.email) {
          setError('You do not have permission to edit this card');
          return;
        }

        setCard(cardData);
      } catch (error) {
        console.error('Error fetching card:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch card');
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, [id, session, status, lang, router]);

  const handleClose = () => {
    router.push(`/${lang}/cards`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <CreateCardModal
      isOpen={true}
      onClose={handleClose}
      initialData={card}
      mode="edit"
    />
  );
}
