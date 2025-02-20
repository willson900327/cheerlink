'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getBusinessCard } from '@/app/firebase/services';
import { BusinessCard } from '@/app/types/businessCard';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

interface PageParams {
  id: string;
  [key: string]: string;
}

export default function ProfilePage() {
  const params = useParams<PageParams>();
  const [cardData, setCardData] = useState<BusinessCard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      if (!params?.id) return;

      try {
        // First try to get data from localStorage
        const data = localStorage.getItem(`profile_${params.id}`);
        if (data) {
          const parsedData = JSON.parse(data);
          if (parsedData.id === params.id) {
            setCardData(parsedData);
            setLoading(false);
            return;
          }
        }

        // If not in localStorage or outdated, fetch from Firebase
        const fetchedCard = await getBusinessCard(params.id);
        setCardData(fetchedCard);
        
        // Save to localStorage for future use
        localStorage.setItem(`profile_${params.id}`, JSON.stringify(fetchedCard));
      } catch (err) {
        console.error('Error loading profile:', err);
        setError('Error loading profile');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [params?.id]);

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

  if (error || !cardData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-white">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Profile not found</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] w-full">
        {cardData.imageUrl ? (
          <Image
            src={cardData.imageUrl}
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
                src={cardData.avatar || '/default-avatar.png'}
                alt={cardData.name}
                fill
                className="rounded-full object-cover border-4 border-white shadow-lg"
              />
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-4xl font-bold text-white mb-2">{cardData.name}</h1>
              <p className="text-xl text-gray-200">{cardData.title}</p>
              <p className="text-lg text-gray-300">{cardData.company}</p>
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
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <a
            href={`mailto:${cardData.email}`}
            className="flex items-center justify-center space-x-3 p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow"
          >
            <FaEnvelope className="text-sky-500 text-2xl" />
            <span className="text-gray-700">{cardData.email}</span>
          </a>
          <a
            href={`tel:${cardData.phone}`}
            className="flex items-center justify-center space-x-3 p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow"
          >
            <FaPhone className="text-sky-500 text-2xl" />
            <span className="text-gray-700">{cardData.phone}</span>
          </a>
        </motion.div>

        {/* Bio Section */}
        {cardData.bio && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">About Me</h2>
            <div className="bg-white rounded-xl shadow-md p-6">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{cardData.bio}</p>
            </div>
          </motion.div>
        )}

        {/* Social Links */}
        {(cardData.linkedin || cardData.github || cardData.twitter) && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Connect With Me</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cardData.linkedin && (
                <a
                  href={cardData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-3 p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow group"
                >
                  <FaLinkedin className="text-2xl text-gray-400 group-hover:text-[#0077b5]" />
                  <span className="text-gray-700">LinkedIn</span>
                </a>
              )}
              {cardData.github && (
                <a
                  href={cardData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-3 p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow group"
                >
                  <FaGithub className="text-2xl text-gray-400 group-hover:text-gray-900" />
                  <span className="text-gray-700">GitHub</span>
                </a>
              )}
              {cardData.twitter && (
                <a
                  href={cardData.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-3 p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow group"
                >
                  <FaTwitter className="text-2xl text-gray-400 group-hover:text-[#1da1f2]" />
                  <span className="text-gray-700">Twitter</span>
                </a>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
