'use client';

import { useEffect, useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { BusinessCard } from '@/app/types/types';
import { translations } from '@/app/i18n/translations';
import CreateCardModal from '@/app/components/CreateCardModal';
import { deleteBusinessCard, getBusinessCards } from '@/app/firebase/services';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';

interface CardsPageProps {
  params: {
    lang: string;
  };
}

export default function CardsPage({ params }: CardsPageProps) {
  const pathname = usePathname();
  const lang = pathname.split('/')[1] === 'en' ? 'en' : 'zh';
  const t = translations[lang];
  const { data: session, status } = useSession();
  const router = useRouter();
  const [cards, setCards] = useState<BusinessCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<BusinessCard | null>(null);
  const [editMode, setEditMode] = useState<'create' | 'edit'>('create');

  useEffect(() => {
    if (session?.user?.email) {
      loadCards();
    } else if (status !== 'loading') {
      setLoading(false);
    }
  }, [session, status]);

  const loadCards = async () => {
    try {
      const userCards = await getBusinessCards(session!.user!.email!);
      setCards(userCards);
    } catch (err) {
      console.error('Error loading cards:', err);
      setError(t.error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCard = () => {
    setSelectedCard(null);
    setEditMode('create');
    setIsModalOpen(true);
  };

  const handleEditCard = (card: BusinessCard) => {
    setSelectedCard({
      ...card,
      id: card.id,
      avatarImage: card.avatarImage || '',
      backgroundImage: card.backgroundImage || '',
      language: lang
    });
    setEditMode('edit');
    setIsModalOpen(true);
  };

  const handleDeleteCard = async (cardId: string) => {
    if (window.confirm(t.confirmDelete)) {
      try {
        await deleteBusinessCard(cardId);
        await loadCards();
      } catch (err) {
        console.error('Error deleting card:', err);
      }
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    loadCards();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-8 h-8 border-4 border-sky-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {lang === 'en' ? 'Please Sign In' : '請先登入'}
          </h2>
          <p className="text-gray-600 mb-8">
            {lang === 'en' 
              ? 'You need to sign in to view and manage your business cards.'
              : '您需要登入才能查看和管理您的名片。'
            }
          </p>
          <button
            onClick={() => signIn('google')}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 transition duration-150 ease-in-out"
          >
            <Image
              src="/images/google.svg"
              alt="Google"
              width={20}
              height={20}
              className="mr-2"
            />
            {lang === 'en' ? 'Sign in with Google' : '使用 Google 登入'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t.title}</h1>
          <button
            onClick={handleCreateCard}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700"
          >
            {t.createCard}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
            {error}
          </div>
        )}

        {cards.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">{t.noCards}</div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((card) => (
              <div
                key={card.id}
                className="bg-white overflow-hidden shadow rounded-lg relative group"
              >
                <Link href={`/${lang}/website/${card.id}`}>
                  <div className="relative h-48 bg-gray-200">
                    {card.backgroundImage ? (
                      <img
                        src={card.backgroundImage}
                        alt="Background"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-sky-100 to-gray-100" />
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
                      <div className="flex items-center">
                        <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-300 border-2 border-white">
                          {card.avatarImage ? (
                            <img
                              src={card.avatarImage}
                              alt={card.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full bg-gray-300 flex items-center justify-center">
                              <span className="text-2xl text-gray-600">
                                {card.name.charAt(0)}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="ml-3">
                          <h3 className="text-lg font-medium text-white">{card.name}</h3>
                          <p className="text-sm text-gray-200">{card.title}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleEditCard(card);
                      }}
                      className="bg-white text-gray-700 px-3 py-1 rounded shadow hover:bg-gray-50"
                    >
                      {t.edit}
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleDeleteCard(card.id);
                      }}
                      className="bg-white text-red-600 px-3 py-1 rounded shadow hover:bg-gray-50"
                    >
                      {t.delete}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <CreateCardModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          initialData={selectedCard}
          mode={editMode}
        />
      </div>
    </div>
  );
}
