'use client';

import { useEffect, useState, use } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { BusinessCard } from '@/app/types/businessCard';
import { getBusinessCard } from '@/app/firebase/services';
import EditCardModal from '@/app/components/EditCardModal';
import LoadingSpinner from '@/app/components/LoadingSpinner';

interface EditPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EditPage({ params }: EditPageProps) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [card, setCard] = useState<BusinessCard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id: cardId } = use(params);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        if (status === 'loading') return;
        
        if (!session) {
          router.push('/');
          return;
        }

        const cardData = await getBusinessCard(cardId);
        if (!cardData) {
          setError('Card not found');
          return;
        }

        // 檢查用戶是否有權限編輯此卡片
        if (cardData.userId !== session.user?.email) {
          setError('You do not have permission to edit this card');
          return;
        }

        setCard(cardData);
      } catch (error) {
        console.error('Error fetching card:', error);
        setError('Failed to load card');
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, [cardId, status, session, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  if (!card) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          Card not found
        </div>
      </div>
    );
  }

  return (
    <EditCardModal
      cardData={card}
      onClose={() => router.push('/cards')}
    />
  );
}
