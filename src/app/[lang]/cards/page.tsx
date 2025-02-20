'use client';

import { useEffect, useState, use } from 'react';
import { useSession } from 'next-auth/react';
import { BusinessCard } from '../../types/businessCard';
import { getUserBusinessCards, deleteBusinessCard } from '../../firebase/services';
import Link from 'next/link';
import { Language } from '../../i18n/config';
import { useRouter } from 'next/navigation';

interface CardsPageProps {
  params: Promise<{
    lang: Language;
  }>;
}

export default function CardsPage({ params }: CardsPageProps) {
  const { lang } = use(params);
  const { data: session } = useSession();
  const [cards, setCards] = useState<BusinessCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchCards() {
      if (session?.user?.email) {
        const fetchedCards = await getUserBusinessCards(session.user.email);
        setCards(fetchedCards);
        setLoading(false);
      }
    }

    fetchCards();
  }, [session]);

  const handleDelete = async (cardId: string) => {
    if (!window.confirm(lang === 'en' ? 'Are you sure you want to delete this card?' : '確定要刪除這張名片嗎？')) {
      return;
    }

    try {
      setDeleting(cardId);
      await deleteBusinessCard(cardId);
      setCards(cards.filter(card => card.id !== cardId));
    } catch (error) {
      console.error('Error deleting card:', error);
      alert(lang === 'en' ? 'Failed to delete card' : '刪除名片失敗');
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-sky-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {lang === 'en' ? 'My Business Cards' : '我的名片'}
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            {lang === 'en' 
              ? 'Manage and share your digital business cards'
              : '管理和分享您的數位名片'
            }
          </p>
        </div>

        <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.id}
              className="bg-white overflow-hidden shadow rounded-lg hover:shadow-2xl hover:scale-105 transition-shadow duration-300 cursor-pointer"
              onClick={() => router.push(`/${lang}/website/${card.id}`)}
            >
              <div className="relative h-48">
                {card.backgroundImage ? (
                  <img
                    src={card.backgroundImage}
                    alt="Background"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-sky-400 to-sky-600" />
                )}
                {card.avatarImage && (
                  <img
                    src={card.avatarImage}
                    alt="Avatar"
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-24 h-24 rounded-full border-4 border-white object-cover"
                  />
                )}
              </div>
              <div className="px-6 pt-16 pb-6">
                <h3 className="text-xl font-semibold text-gray-900 text-center">
                  {card.name}
                </h3>
                <p className="mt-1 text-gray-500 text-center">{card.title}</p>
                <p className="mt-1 text-gray-500 text-center">{card.company}</p>
                
                <div className="mt-6 flex justify-center space-x-4" onClick={(e) => e.stopPropagation()}>
                  <Link
                    href={`/${lang}/edit/${card.id}`}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700"
                  >
                    {lang === 'en' ? 'Edit' : '編輯'}
                  </Link>
                  <button
                    onClick={() => handleDelete(card.id)}
                    disabled={deleting === card.id}
                    className="inline-flex items-center px-4 py-2 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {deleting === card.id ? (
                      <span className="inline-block animate-spin mr-2">⌛</span>
                    ) : null}
                    {lang === 'en' ? 'Delete' : '刪除'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {cards.length === 0 && (
          <div className="mt-12 text-center">
            <h3 className="text-xl font-medium text-gray-900">
              {lang === 'en' ? 'No business cards yet' : '還沒有名片'}
            </h3>
            <p className="mt-2 text-gray-500">
              {lang === 'en' 
                ? 'Create your first business card to get started'
                : '創建您的第一張名片開始使用'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
