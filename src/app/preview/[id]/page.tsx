'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getBusinessCard } from '@/app/firebase/services';
import { BusinessCard } from '@/app/types/businessCard';
import { QRCodeSVG } from 'qrcode.react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone } from 'react-icons/fa';

export default function PreviewPage() {
  const params = useParams();
  const [card, setCard] = useState<BusinessCard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCard = async () => {
      try {
        if (!params.id) return;
        const cardData = await getBusinessCard(params.id as string);
        setCard(cardData);
      } catch (err) {
        setError('Card not found');
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, [params.id]);

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
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">
            {error || 'Card not found'}
          </h1>
          <p className="text-gray-600 mb-8">The card you're looking for doesn't exist.</p>
          <a
            href="/cards"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          >
            Back to Cards
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="relative h-48 bg-gradient-to-r from-sky-500 to-sky-600">
            {card.backgroundImage && (
              <Image
                src={card.backgroundImage}
                alt="Background"
                layout="fill"
                objectFit="cover"
              />
            )}
          </div>
          
          <div className="relative px-4 sm:px-6 -mt-16">
            <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white bg-white shadow-lg">
              {card.avatarImage ? (
                <Image
                  src={card.avatarImage}
                  alt={card.name}
                  layout="fill"
                  objectFit="cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-4xl font-semibold text-gray-400">
                    {card.name[0]}
                  </span>
                </div>
              )}
            </div>
            
            <div className="mt-6 text-center">
              <h1 className="text-3xl font-bold text-gray-900">{card.name}</h1>
              <p className="mt-1 text-xl text-gray-600">{card.title}</p>
              <p className="mt-1 text-lg text-gray-500">{card.company}</p>
            </div>

            <div className="mt-6">
              <div className="flex flex-col space-y-4">
                <a
                  href={`mailto:${card.email}`}
                  className="flex items-center px-4 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <FaEnvelope className="text-gray-500 mr-3" />
                  <span className="text-gray-800">{card.email}</span>
                </a>
                <a
                  href={`tel:${card.phone}`}
                  className="flex items-center px-4 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <FaPhone className="text-gray-500 mr-3" />
                  <span className="text-gray-800">{card.phone}</span>
                </a>
              </div>
            </div>

            {card.bio && (
              <div className="mt-6">
                <p className="text-gray-600 text-center">{card.bio}</p>
              </div>
            )}

            <div className="mt-8 border-t border-gray-200 pt-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Scan QR Code
              </h2>
              <div className="flex justify-center">
                <QRCodeSVG
                  value={`${window.location.origin}/card/${card.id}`}
                  size={200}
                  level="H"
                  includeMargin
                  className="border-8 border-white rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
