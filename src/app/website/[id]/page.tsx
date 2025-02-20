'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaGlobe, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import { getBusinessCard } from '@/app/firebase/services';
import { BusinessCard } from '@/app/types/businessCard';

export default function WebsitePage() {
  const { id } = useParams();
  const [card, setCard] = useState<BusinessCard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCard = async () => {
      if (!id) return;
      
      try {
        const cardData = await getBusinessCard(id as string);
        setCard(cardData);
      } catch (err) {
        setError('Error loading card');
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16"
        >
          <div className="w-full h-full border-4 border-sky-500 border-t-transparent rounded-full" />
        </motion.div>
      </div>
    );
  }

  if (error || !card) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-white">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Card not found</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] w-full">
        {card.imageUrl ? (
          <Image
            src={card.imageUrl}
            alt="Cover"
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-sky-400 to-indigo-600" />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        
        {/* Profile Info */}
        <div className="absolute inset-0 flex items-center justify-center text-center text-white">
          <div className="space-y-6 p-4">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-40 h-40 mx-auto"
            >
              <Image
                src={card.avatar || '/default-avatar.png'}
                alt={card.name}
                fill
                className="rounded-full object-cover border-4 border-white shadow-lg"
              />
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-4xl font-bold text-white mb-2">{card.name}</h1>
              <p className="text-xl text-gray-200">{card.title}</p>
              <p className="text-lg text-gray-300">{card.company}</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Contact Grid */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <a
            href={`mailto:${card.email}`}
            className="flex items-center justify-center space-x-3 p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow"
          >
            <FaEnvelope className="text-sky-500 text-2xl" />
            <span className="text-gray-700">{card.email}</span>
          </a>
          <a
            href={`tel:${card.phone}`}
            className="flex items-center justify-center space-x-3 p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow"
          >
            <FaPhone className="text-sky-500 text-2xl" />
            <span className="text-gray-700">{card.phone}</span>
          </a>
          {card.website && (
            <a
              href={card.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-3 p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow"
            >
              <FaGlobe className="text-sky-500 text-2xl" />
              <span className="text-gray-700">Website</span>
            </a>
          )}
        </motion.div>

        {/* Bio Section */}
        {card.bio && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">About Me</h2>
            <div className="bg-white rounded-xl shadow-md p-6">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{card.bio}</p>
            </div>
          </motion.div>
        )}

        {/* Social Links */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 flex justify-center space-x-6"
        >
          {card.linkedin && (
            <a
              href={card.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-sky-500 transition-colors"
            >
              <FaLinkedin className="text-3xl" />
            </a>
          )}
          {card.github && (
            <a
              href={card.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-sky-500 transition-colors"
            >
              <FaGithub className="text-3xl" />
            </a>
          )}
          {card.twitter && (
            <a
              href={card.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-sky-500 transition-colors"
            >
              <FaTwitter className="text-3xl" />
            </a>
          )}
        </motion.div>
      </div>
    </div>
  );
}
