'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  FaEnvelope,
  FaPhone,
  FaGlobe,
  FaLinkedin,
  FaGithub,
  FaTwitter,
} from 'react-icons/fa';

interface BusinessCard {
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  website?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  bio: string;
  avatar: string;
  theme?: {
    background: string;
    text: string;
  };
  profileId?: string;
}

export default function ProfileContent({ id }: { id: string }) {
  const [cardData, setCardData] = useState<BusinessCard | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = localStorage.getItem('cardData');
        if (data) {
          const parsedData = JSON.parse(data);
          if (parsedData.profileId === id) {
            setCardData(parsedData);
          }
        }
      } catch (error) {
        console.error('Error loading profile data:', error);
      }
    };

    loadData();
  }, [id]);

  if (!cardData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <p className="text-xl text-gray-800">找不到個人檔案</p>
          <p className="mt-2 text-gray-600">這個檔案可能已經被刪除或是連結無效</p>
        </div>
      </div>
    );
  }

  const theme = cardData.theme || { background: '#FFFFF0', text: '#000000' };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 背景圖層 */}
      <div 
        className="absolute inset-0 z-0"
        style={{ 
          backgroundColor: theme.background,
          backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))'
        }}
      />
      
      {/* 頭像背景效果 */}
      <div 
        className="absolute inset-0 z-0 opacity-10 blur-2xl"
        style={{
          backgroundImage: `url(${cardData.avatar})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mixBlendMode: 'overlay'
        }}
      />

      {/* 內容 */}
      <div className="relative z-10">
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* 頭像和基本信息 */}
          <div className="text-center mb-12">
            <div className="relative w-40 h-40 mx-auto mb-6">
              <Image
                src={cardData.avatar}
                alt={cardData.name}
                fill
                className="rounded-full object-cover border-4 border-white shadow-lg"
              />
            </div>
            <h1 
              className="text-4xl font-bold mb-2"
              style={{ color: theme.text }}
            >
              {cardData.name}
            </h1>
            <p 
              className="text-xl mb-1"
              style={{ color: theme.text }}
            >
              {cardData.title}
            </p>
            <p 
              className="text-lg"
              style={{ color: theme.text }}
            >
              {cardData.company}
            </p>
          </div>

          {/* 聯繫方式 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div 
              className="p-6 rounded-lg shadow-md backdrop-blur-sm bg-white/30"
              style={{ color: theme.text }}
            >
              <h2 className="text-2xl font-semibold mb-4">聯絡方式</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FaEnvelope className="w-5 h-5" />
                  <a href={`mailto:${cardData.email}`} className="hover:underline">
                    {cardData.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <FaPhone className="w-5 h-5" />
                  <a href={`tel:${cardData.phone}`} className="hover:underline">
                    {cardData.phone}
                  </a>
                </div>
                {cardData.website && (
                  <div className="flex items-center gap-3">
                    <FaGlobe className="w-5 h-5" />
                    <a 
                      href={cardData.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      個人網站
                    </a>
                  </div>
                )}
              </div>
            </div>

            <div 
              className="p-6 rounded-lg shadow-md backdrop-blur-sm bg-white/30"
              style={{ color: theme.text }}
            >
              <h2 className="text-2xl font-semibold mb-4">社群媒體</h2>
              <div className="space-y-4">
                {cardData.linkedin && (
                  <div className="flex items-center gap-3">
                    <FaLinkedin className="w-5 h-5" />
                    <a 
                      href={cardData.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      LinkedIn
                    </a>
                  </div>
                )}
                {cardData.github && (
                  <div className="flex items-center gap-3">
                    <FaGithub className="w-5 h-5" />
                    <a 
                      href={cardData.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      GitHub
                    </a>
                  </div>
                )}
                {cardData.twitter && (
                  <div className="flex items-center gap-3">
                    <FaTwitter className="w-5 h-5" />
                    <a 
                      href={cardData.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      Twitter
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 簡介 */}
          <div 
            className="p-6 rounded-lg shadow-md backdrop-blur-sm bg-white/30"
            style={{ color: theme.text }}
          >
            <h2 className="text-2xl font-semibold mb-4">關於我</h2>
            <div className="prose max-w-none">
              <p className="whitespace-pre-wrap text-lg">{cardData.bio}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
