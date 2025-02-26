'use client';

import { useEffect, useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { BusinessCard } from '@/app/types/types';
import { translations } from '@/app/i18n/translations';
import CreateCardModal from '@/app/components/CreateCardModal';
import BusinessCardPreview from '@/app/components/BusinessCardPreview';
import { deleteBusinessCard, getBusinessCards, saveBusinessCard } from '@/app/firebase/services';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

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
    } else {
      // 如果未登入，從 localStorage 讀取暫存的名片
      const savedCards = localStorage.getItem('tempBusinessCards');
      if (savedCards) {
        setCards(JSON.parse(savedCards));
      }
      setLoading(false);
    }
  }, [session]);

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
        if (session?.user?.email) {
          await deleteBusinessCard(cardId);
          await loadCards();
        } else {
          // 如果未登入，從 localStorage 刪除
          const savedCards = localStorage.getItem('tempBusinessCards');
          if (savedCards) {
            const cards = JSON.parse(savedCards);
            const updatedCards = cards.filter((c: BusinessCard) => c.id !== cardId);
            localStorage.setItem('tempBusinessCards', JSON.stringify(updatedCards));
            setCards(updatedCards);
          }
        }
      } catch (err) {
        console.error('Error deleting card:', err);
      }
    }
  };

  const handleModalClose = async (savedCard?: BusinessCard) => {
    setIsModalOpen(false);
    
    if (savedCard) {
      try {
        const cardId = await saveBusinessCard(savedCard);
        // 直接跳轉到 website 頁面
        router.push(`/${lang}/website/${cardId}`);
      } catch (err) {
        console.error('Error saving card:', err);
        setError(t.error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-8 h-8 border-4 border-sky-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <motion.h1 
            className="text-3xl font-bold text-gray-900"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t.title}
          </motion.h1>
          <motion.button
            onClick={handleCreateCard}
            className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-lg shadow-md transition-colors font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {t.createCard}
          </motion.button>
        </div>

        {error && (
          <motion.div 
            className="bg-red-50 text-red-500 p-4 rounded-lg mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.div>
        )}

        {!session && (
          <motion.div 
            className="bg-sky-50 p-6 rounded-lg mb-8 border border-sky-100"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <p className="text-sky-800 font-medium mb-2">
                  {lang === 'en' 
                    ? 'You are creating cards without signing in. Your cards will be stored temporarily. Sign in to save them permanently.'
                    : '您正在未登入狀態下建立名片。名片將暫時儲存。登入以永久保存您的名片。'
                  }
                </p>
                <button
                  onClick={() => signIn('google')}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 shadow-sm transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                    />
                  </svg>
                  {lang === 'en' ? 'Sign in with Google' : '使用 Google 登入'}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {cards.length === 0 ? (
          <motion.div 
            className="text-center text-gray-500 mt-16 py-12 bg-white rounded-lg shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            <p className="text-lg font-medium">{t.noCards}</p>
          </motion.div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {cards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <BusinessCardPreview card={card} />
                
                {/* 編輯和刪除按鈕 */}
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleEditCard(card);
                    }}
                    className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                  >
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleDeleteCard(card.id);
                    }}
                    className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-red-500 hover:text-white transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      <CreateCardModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        initialData={selectedCard}
        mode={editMode}
      />
    </div>
  );
}
