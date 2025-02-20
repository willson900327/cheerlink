'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaEnvelope, FaPhone, FaGlobe, FaLinkedin, FaDownload } from 'react-icons/fa';
import ColorThemeSelector from '../components/ColorThemeSelector';
import html2canvas from 'html2canvas';
import { QRCodeSVG } from 'qrcode.react';
import { v4 as uuidv4 } from 'uuid';

interface BusinessCard {
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  website?: string;
  linkedin?: string;
  bio: string;
  avatar: string;
  theme?: {
    background: string;
    text: string;
  };
  profileId?: string;
}

export default function PreviewPage() {
  const router = useRouter();
  const [cardData, setCardData] = useState<BusinessCard | null>(null);
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [profileUrl, setProfileUrl] = useState<string>('');

  useEffect(() => {
    const data = localStorage.getItem('cardData');
    if (data) {
      const parsedData = JSON.parse(data);
      // 如果沒有 profileId，生成一個並保存
      if (!parsedData.profileId) {
        const profileId = uuidv4();
        const updatedData = { ...parsedData, profileId };
        localStorage.setItem('cardData', JSON.stringify(updatedData));
        setCardData(updatedData);
      } else {
        setCardData(parsedData);
      }
    }
  }, []);

  useEffect(() => {
    if (cardData?.profileId) {
      // 使用完整的 URL，包括協議
      const url = window.location.origin + '/profile/' + cardData.profileId;
      setProfileUrl(url);
      console.log('Profile URL:', url); // 添加日誌
    }
  }, [cardData?.profileId]);

  const handleThemeChange = (newTheme: { background: string; text: string }) => {
    if (cardData) {
      const updatedCardData = {
        ...cardData,
        theme: newTheme
      };
      setCardData(updatedCardData);
      localStorage.setItem('cardData', JSON.stringify(updatedCardData));
    }
  };

  const handleDownload = async () => {
    if (cardRef.current) {
      try {
        const canvas = await html2canvas(cardRef.current);
        const link = document.createElement('a');
        link.download = 'business-card.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      } catch (error) {
        console.error('Error downloading card:', error);
      }
    }
  };

  if (!cardData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">No card data found. Please create a card first.</p>
      </div>
    );
  }

  const theme = cardData.theme || { background: '#FFFFF0', text: '#000000' };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        {/* 名片預覽 */}
        <div className="w-full max-w-2xl mb-8" ref={cardRef}>
          <div 
            className="bg-white rounded-lg shadow-2xl overflow-hidden relative"
            style={{ backgroundColor: theme.background }}
          >
            <div className="relative h-48 bg-gradient-to-r from-gray-100 to-gray-200">
              {cardData.avatar && (
                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                  <Image
                    src={cardData.avatar}
                    alt={cardData.name}
                    width={128}
                    height={128}
                    className="rounded-full border-4 border-white shadow-lg"
                  />
                </div>
              )}
              {/* QR Code 和個人網站連結 */}
              {profileUrl && (
                <div className="absolute top-4 right-4 flex flex-col items-center">
                  <div className="bg-white p-2 rounded-lg shadow mb-2">
                    <QRCodeSVG
                      value={profileUrl}
                      size={80}
                      level="H"
                      includeMargin={true}
                    />
                  </div>
                  <a
                    href={profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm bg-white px-3 py-1 rounded-full shadow hover:bg-gray-50 transition-colors"
                    style={{ color: theme.text }}
                  >
                    查看個人檔案
                  </a>
                </div>
              )}
            </div>

            <div className="pt-20 pb-8 px-8 text-center" style={{ color: theme.text }}>
              <h1 className="text-3xl font-bold">{cardData.name}</h1>
              <p className="text-xl mt-2">{cardData.title}</p>
              <p className="text-lg mt-1">{cardData.company}</p>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-center gap-2">
                  <FaEnvelope className="w-5 h-5" />
                  <span>{cardData.email}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <FaPhone className="w-5 h-5" />
                  <span>{cardData.phone}</span>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-2">About Me</h2>
                <p className="text-lg">{cardData.bio}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 按鈕區域 */}
        <div className="flex gap-4">
          <button
            onClick={() => setShowThemeSelector(!showThemeSelector)}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-colors"
          >
            {showThemeSelector ? '隱藏配色' : '選擇配色'}
          </button>
          <button
            onClick={handleDownload}
            className="px-6 py-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition-colors flex items-center gap-2"
          >
            <FaDownload />
            下載名片
          </button>
          <button
            onClick={() => router.push('/create')}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600 transition-colors"
          >
            編輯名片
          </button>
        </div>

        {/* 顏色選擇器 */}
        {showThemeSelector && (
          <div className="mt-8 w-full max-w-4xl bg-white rounded-lg shadow-lg">
            <ColorThemeSelector
              onSelectTheme={handleThemeChange}
              selectedTheme={theme}
            />
          </div>
        )}
      </div>
    </div>
  );
}
