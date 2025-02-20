'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { getBusinessCard, deleteBusinessCard } from '@/app/firebase/services';
import { BusinessCard } from '@/app/types/businessCard';
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaTwitter, FaArrowLeft, FaMapMarkerAlt, FaGlobe, FaDownload } from 'react-icons/fa';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

const DownloadableCard = dynamic(() => import('@/app/components/DownloadableCard'), {
  ssr: false,
});

export default function CardPage() {
  const { id } = useParams();
  const router = useRouter();
  const [card, setCard] = useState<BusinessCard | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDownloadCard, setShowDownloadCard] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        if (typeof id === 'string') {
          const cardData = await getBusinessCard(id);
          setCard(cardData);
        }
      } catch (error) {
        console.error('Error fetching card:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500"></div>
      </div>
    );
  }

  if (!card) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-2xl font-bold mb-4">Card not found</h1>
        <Link
          href="/cards"
          className="text-sky-600 hover:text-sky-700 flex items-center gap-2"
        >
          <FaArrowLeft />
          Back to cards
        </Link>
      </div>
    );
  }

  const handleDelete = async () => {
    if (!card?.id || !window.confirm('確定要刪除這張名片嗎？')) return;

    try {
      setIsDeleting(true);
      await deleteBusinessCard(card.id);
      router.push('/cards');
    } catch (error) {
      console.error('Error deleting card:', error);
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 返回按鈕 */}
      <motion.div 
        className="fixed top-6 left-6 z-50 flex items-center gap-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Link
          href="/cards"
          className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 px-4 py-2 rounded-full shadow-lg flex items-center gap-2 transition-all"
        >
          <FaArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to cards</span>
        </Link>

        {/* 編輯和刪除按鈕 */}
        <div className="flex items-center gap-2">
          <motion.button
            onClick={() => router.push(`/edit/${card?.id}`)}
            className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 px-4 py-2 rounded-full shadow-lg flex items-center gap-2 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span className="text-sm font-medium">Edit</span>
          </motion.button>

          <motion.button
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-500/90 backdrop-blur-sm hover:bg-red-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 transition-all disabled:opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isDeleting ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            )}
            <span className="text-sm font-medium">Delete</span>
          </motion.button>
        </div>
      </motion.div>

      {/* 主要內容 */}
      <div className="relative">
        {/* 頂部背景區域 */}
        <div className="h-[40vh] relative overflow-hidden">
          {card.backgroundImage ? (
            <Image
              src={card.backgroundImage}
              alt="Background"
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-sky-400 via-blue-500 to-purple-600" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
        </div>

        {/* 名片內容 */}
        <div className="relative -mt-32 pb-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl shadow-xl overflow-hidden"
            >
              <div className="p-8 sm:p-12">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  {/* 左側：頭像和基本信息 */}
                  <div className="w-full md:w-1/3">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="relative w-40 h-40 mx-auto md:mx-0"
                    >
                      {card.avatarImage ? (
                        <Image
                          src={card.avatarImage}
                          alt={card.name}
                          fill
                          className="rounded-2xl object-cover shadow-lg"
                        />
                      ) : (
                        <div className="w-full h-full rounded-2xl bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center shadow-lg">
                          <span className="text-5xl font-bold text-white">
                            {card.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="mt-6 text-center md:text-left"
                    >
                      <h1 className="text-3xl font-bold text-gray-900">{card.name}</h1>
                      <h2 className="text-xl text-gray-600 mt-1">{card.title}</h2>
                      <p className="text-gray-500 mt-1">{card.company}</p>
                    </motion.div>

                    {/* 下載按鈕 */}
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      onClick={() => setShowDownloadCard(true)}
                      className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-colors"
                    >
                      <FaDownload />
                      Download card
                    </motion.button>
                  </div>

                  {/* 右側：聯繫方式和其他信息 */}
                  <div className="w-full md:w-2/3 md:border-l border-gray-100 md:pl-8">
                    {/* 聯繫信息 */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                      {card.email && (
                        <a
                          href={`mailto:${card.email}`}
                          className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center">
                            <FaEnvelope className="w-5 h-5 text-sky-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="text-gray-900">{card.email}</p>
                          </div>
                        </a>
                      )}
                      {card.phone && (
                        <a
                          href={`tel:${card.phone}`}
                          className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                            <FaPhone className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Phone</p>
                            <p className="text-gray-900">{card.phone}</p>
                          </div>
                        </a>
                      )}
                    </motion.div>

                    {/* 社交媒體鏈接 */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="mt-8"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Social media</h3>
                      <div className="flex flex-wrap gap-4">
                        {card.linkedin && (
                          <a
                            href={card.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0077B5]/10 hover:bg-[#0077B5]/20 text-[#0077B5] transition-colors"
                          >
                            <FaLinkedin className="w-5 h-5" />
                            <span>LinkedIn</span>
                          </a>
                        )}
                        {card.github && (
                          <a
                            href={card.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900/10 hover:bg-gray-900/20 text-gray-900 transition-colors"
                          >
                            <FaGithub className="w-5 h-5" />
                            <span>GitHub</span>
                          </a>
                        )}
                        {card.twitter && (
                          <a
                            href={card.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 text-[#1DA1F2] transition-colors"
                          >
                            <FaTwitter className="w-5 h-5" />
                            <span>Twitter</span>
                          </a>
                        )}
                      </div>
                    </motion.div>

                    {/* 個人簡介 */}
                    {card.bio && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                        className="mt-8"
                      >
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">About me</h3>
                        <p className="text-gray-600 leading-relaxed">{card.bio}</p>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 下載名片對話框 */}
      {showDownloadCard && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl p-6 max-w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Download card</h2>
              <button
                onClick={() => setShowDownloadCard(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <DownloadableCard card={card} baseUrl={window.location.origin} />
          </div>
        </div>
      )}
    </div>
  );
}
