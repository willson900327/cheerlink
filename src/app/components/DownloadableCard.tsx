'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { QRCodeSVG } from 'qrcode.react';
import { toPng } from 'html-to-image';
import { saveAs } from 'file-saver';
import { BusinessCard } from '../types/businessCard';
import { FaDownload } from 'react-icons/fa';

interface DownloadableCardProps {
  card: BusinessCard;
  baseUrl: string;
}

export default function DownloadableCard({ card, baseUrl }: DownloadableCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!cardRef.current) return;

    try {
      const dataUrl = await toPng(cardRef.current, {
        quality: 1.0,
        pixelRatio: 2,
      });
      
      saveAs(dataUrl, `${card.name}-business-card.png`);
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  const cardUrl = `${baseUrl}/card/${card.id}`;

  return (
    <div className="relative">
      {/* 可下載的名片預覽 */}
      <div
        ref={cardRef}
        className="w-[1000px] h-[600px] bg-white rounded-xl overflow-hidden shadow-lg"
        style={{ fontFamily: 'sans-serif' }}
      >
        {/* 背景 */}
        <div className="relative h-full">
          {card.backgroundImage ? (
            <Image
              src={card.backgroundImage}
              alt="Background"
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-sky-400 via-blue-500 to-purple-600" />
          )}
          <div className="absolute inset-0 bg-black/30" />

          {/* 內容 */}
          <div className="relative h-full p-12 flex">
            {/* 左側：頭像和基本信息 */}
            <div className="flex-1 flex flex-col justify-between text-white">
              <div className="flex items-start space-x-8">
                <div className="w-48 h-48 rounded-2xl overflow-hidden border-4 border-white/80 shadow-lg">
                  {card.avatarImage ? (
                    <Image
                      src={card.avatarImage}
                      alt={card.name}
                      width={192}
                      height={192}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                      <span className="text-5xl font-bold">{card.name.charAt(0)}</span>
                    </div>
                  )}
                </div>

                <div>
                  <h1 className="text-4xl font-bold mb-4">{card.name}</h1>
                  <p className="text-2xl opacity-90 mb-2">{card.title}</p>
                  <p className="text-xl opacity-80">{card.company}</p>
                </div>
              </div>

              <div className="space-y-4">
                {card.email && (
                  <p className="text-xl">
                    <span className="opacity-80">Email: </span>
                    {card.email}
                  </p>
                )}
                {card.phone && (
                  <p className="text-xl">
                    <span className="opacity-80">Phone: </span>
                    {card.phone}
                  </p>
                )}
              </div>
            </div>

            {/* 右側：QR Code */}
            <div className="w-48 flex flex-col items-center justify-center bg-white/90 rounded-xl p-6">
              <QRCodeSVG
                value={cardUrl}
                size={160}
                level="H"
                includeMargin
                className="mb-4"
              />
              <p className="text-center text-sm text-gray-600">
                掃描查看完整名片
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 下載按鈕 */}
      <button
        onClick={handleDownload}
        className="mt-4 flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-colors"
      >
        <FaDownload />
        下載名片
      </button>
    </div>
  );
}
