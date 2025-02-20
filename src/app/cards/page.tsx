'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { getUserBusinessCards, deleteBusinessCard } from '../firebase/services';
import { BusinessCard } from '../types/businessCard';
import BusinessCardPreview from '../components/BusinessCardPreview';
import CreateCardModal from '../components/CreateCardModal';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const translations = {
  en: {
    myCards: 'My Business Cards',
    createCard: 'Create Card',
    noCards: 'No cards found',
    createFirst: 'Create First Card',
    edit: 'Edit',
    delete: 'Delete',
    pleaseSignIn: 'Please sign in',
  },
  zh: {
    myCards: '我的名片',
    createCard: '創建名片',
    noCards: '沒有找到名片',
    createFirst: '創建第一張名片',
    edit: '編輯',
    delete: '刪除',
    pleaseSignIn: '請先登入',
  }
};

export default function CardsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const lang = pathname.split('/')[1] === 'en' ? 'en' : 'zh';
  const t = translations[lang];

  const [cards, setCards] = useState<BusinessCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<BusinessCard | null>(null);

  const fetchCards = async () => {
    if (!session?.user?.email) {
      router.push('/');
      return;
    }
    try {
      const fetchedCards = await getUserBusinessCards(session.user.email);
      setCards(fetchedCards);
    } catch (error) {
      console.error('Error fetching cards:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, [session, router]);

  const handleDelete = async (cardId: string) => {
    if (!session?.user?.email) return;

    try {
      setDeleteLoading(cardId);
      await deleteBusinessCard(cardId);
      setCards(cards.filter(card => card.id !== cardId));
    } catch (error) {
      console.error('Error deleting card:', error);
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleEdit = (card: BusinessCard) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const handleCreateNew = () => {
    setSelectedCard(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
    // 重新獲取卡片列表以顯示最新的更改
    fetchCards();
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">{t.pleaseSignIn}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-16 bg-gradient-to-br from-sky-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t.myCards}</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCreateNew}
            className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 rounded-lg shadow-md flex items-center gap-2 transition-colors"
          >
            <FaPlus />
            {t.createCard}
          </motion.button>
        </div>

        {cards.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 mb-4">{t.noCards}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCreateNew}
              className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 rounded-lg shadow-md inline-flex items-center gap-2 transition-colors"
            >
              <FaPlus />
              {t.createFirst}
            </motion.button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="relative"
              >
                <BusinessCardPreview card={card} />
                <div className="mt-4 flex justify-end gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleEdit(card)}
                    className="flex items-center gap-2 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg shadow-md transition-colors"
                  >
                    <FaEdit className="w-4 h-4" />
                    {t.edit}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.preventDefault();
                      if (card.id) handleDelete(card.id);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md transition-colors"
                    disabled={deleteLoading === card.id}
                  >
                    {deleteLoading === card.id ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <FaTrash className="w-4 h-4" />
                        {t.delete}
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <CreateCardModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          initialData={selectedCard}
          mode={selectedCard ? 'edit' : 'create'}
        />
      </div>
    </main>
  );
}
