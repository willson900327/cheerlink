'use client';

import { useEffect, useState, use } from 'react';
import { useSession } from 'next-auth/react';
import { getBusinessCard } from '../../../firebase/services';
import { BusinessCard } from '../../../types/businessCard';
import { Language } from '../../../i18n/config';
import CreateCardModal from '../../../components/CreateCardModal';
import { useRouter } from 'next/navigation';

interface EditPageProps {
  params: Promise<{
    id: string;
    lang: Language;
  }>;
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function EditPage({ params, searchParams }: EditPageProps) {
  const { id, lang } = use(params);
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
  }, [id, session, status, router, lang]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!card) {
    return <div>Card not found</div>;
  }

  return (
    <div>
      <CreateCardModal
        isOpen={true}
        onClose={() => router.push(`/${lang}/cards`)}
        initialData={card}
        isEditing={true}
        lang={lang}
      />
    </div>
  );
}
