'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaPhone, FaGlobe, FaLinkedin, FaGithub, FaTwitter, FaDownload, FaCopy, FaCheck, FaTimes } from 'react-icons/fa';
import { BusinessCard } from '../types/businessCard';
import { Language } from '../i18n/config';
import Image from 'next/image';
import { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import { QRCodeSVG } from 'qrcode.react';

interface BusinessCardWebsiteProps {
  card: BusinessCard;
  lang: Language;
}

type CardLayout = 'left' | 'right';

const translations = {
  en: {
    download: 'Download Card',
    preview: 'Preview Card',
    downloadingCard: 'Downloading card...',
    scanToView: 'Scan to view digital card',
    copyLink: 'Copy Link',
    linkCopied: 'Link Copied!',
    website: 'Website',
    selectLayout: 'Select Layout',
    leftLayout: 'Left Layout',
    rightLayout: 'Right Layout',
    downloadCard: 'Download Card',
    previewCard: 'Preview',
    applyLayout: 'Apply Layout'
  },
  zh: {
    download: '下載名片',
    preview: '預覽名片',
    downloadingCard: '下載名片中...',
    scanToView: '掃描查看數位名片',
    copyLink: '複製連結',
    linkCopied: '已複製連結！',
    website: '網站',
    selectLayout: '選擇版型',
    leftLayout: '左側版型',
    rightLayout: '右側版型',
    downloadCard: '下載名片',
    previewCard: '預覽',
    applyLayout: '套用版型'
  }
};

// 定義經過測試確定可以顯示的顏色組合
const validColors = [
  // 基本顏色
  { color: 'neutral', shades: ['200'] },
  // 暖色系
  { color: 'red', shades: ['300'] },
  { color: 'orange', shades: ['200', '300'] },
  { color: 'amber', shades: ['300'] },
  // 綠色系
  { color: 'emerald', shades: ['200', '300'] },
  { color: 'teal', shades: ['300'] },
  // 藍色系
  { color: 'sky', shades: ['200', '300'] },
  { color: 'blue', shades: ['300'] },
  { color: 'cyan', shades: ['200'] },
  { color: 'indigo', shades: ['200', '300'] },
  // 紫色系
  { color: 'purple', shades: ['200', '300'] },
  { color: 'pink', shades: ['300'] },
  // 白色選項
  { color: 'white', shades: [''] }, // 白色不需要深淺度
];

// 預先生成所有可能的漸層組合
const allGradients = (() => {
  const gradients = [];
  
  // 對每個顏色和深淺度進行組合
  validColors.forEach((color1) => {
    validColors.forEach((color2) => {
      if (color1.color !== color2.color) { // 避免同色漸層
        const shades1 = color1.color === 'white' ? [''] : color1.shades;
        const shades2 = color2.color === 'white' ? [''] : color2.shades;
        
        shades1.forEach((shade1) => {
          shades2.forEach((shade2) => {
            const fromColor = color1.color === 'white' ? 'white' : `${color1.color}-${shade1}`;
            const toColor = color2.color === 'white' ? 'white' : `${color2.color}-${shade2}`;
            
            gradients.push({
              name: `${color1.color}-${color2.color}`,
              value: `from-${fromColor} to-${toColor}`
            });
          });
        });
      }
    });
  });
  
  return gradients;
})();

// 從預生成的漸層中隨機選擇
function getRandomGradients(count: number) {
  const selected = new Set<number>();
  const result = [];
  
  while (result.length < count) {
    const index = Math.floor(Math.random() * allGradients.length);
    if (!selected.has(index)) {
      selected.add(index);
      const gradient = allGradients[index];
      // 為每個漸層生成一個友好的名稱
      const name = `漸層 ${result.length + 1}`;
      result.push({
        ...gradient,
        name
      });
    }
  }
  
  return result;
}

function generateRandomGradients() {
  return getRandomGradients(8);
}

function generateSingleGradient() {
  return getRandomGradients(1)[0];
}

// 使用經過測試的顏色組合
const initialBgColors = [
  { name: '天空藍', value: 'from-sky-300 to-blue-200' },
  { name: '海洋藍', value: 'from-blue-300 to-cyan-200' },
  { name: '靛青藍', value: 'from-indigo-300 to-blue-200' },
  { name: '翡翠綠', value: 'from-emerald-300 to-teal-200' },
  { name: '暖陽橘', value: 'from-orange-300 to-amber-200' },
  { name: '玫瑰紅', value: 'from-red-300 to-pink-200' },
  { name: '典雅灰', value: 'from-zinc-300 to-slate-200' },
  { name: '純白光', value: 'from-white to-sky-200' },
];

// 簡化版名片組件
function SimpleBusinessCard({ card, lang, layout, selectedBgColor }: BusinessCardWebsiteProps & { layout: CardLayout, selectedBgColor: string }) {
  const t = translations[lang];
  
  const cardContent = (
    <>
      {/* 頭像 */}
      <div className="relative w-64 h-64">
        <Image
          src={card.avatarImage || '/default-avatar.png'}
          alt={card.name}
          fill
          className="rounded-full object-cover border-8 border-white shadow-xl"
        />
      </div>

      {/* 基本信息 */}
      <div className="w-full flex flex-col space-y-4">
        <h1 className="text-6xl font-bold text-gray-800">{card.name}</h1>
        <p className="text-4xl text-gray-600">{card.title}</p>
        <p className="text-4xl text-gray-500">{card.company}</p>

        {/* 聯絡方式 */}
        <div className="space-y-3 w-full">
          {card.email && (
            <div className="flex items-center space-x-3">
              <FaEnvelope className="text-gray-700 text-3xl" />
              <span className="text-gray-700 text-3xl truncate max-w-[400px]">{card.email}</span>
            </div>
          )}
          {card.phone && (
            <div className="flex items-center space-x-3">
              <FaPhone className="text-gray-700 text-3xl" />
              <span className="text-gray-700 text-3xl truncate max-w-[400px]">{card.phone}</span>
            </div>
          )}
          {card.website && (
            <div className="flex items-center space-x-3">
              <FaGlobe className="text-gray-700 text-2xl" />
              <span className="text-gray-700 text-2xl truncate max-w-[400px]">{card.website}</span>
            </div>
          )}
        </div>
      </div>

      {/* QR Code */}
      <div className="flex flex-col items-center">
        <QRCodeSVG
          value={typeof window !== 'undefined' ? window.location.href : ''}
          size={300}
          level="H"
          includeMargin
        />
        <p className="mt-2 text-sm text-gray-500">{t.scanToView}</p>
      </div>
    </>
  );
  
  return (
    <div className={`w-[1200px] h-[630px] bg-gradient-to-br ${selectedBgColor} p-12`}>
      <div className="w-full h-full flex items-center justify-between">
        {layout === 'left' ? (
          <>
            <div className="flex-shrink-0">{cardContent.props.children[0]}</div>
            <div className="px-12 flex-1">{cardContent.props.children[1]}</div>
            <div className="flex-shrink-0">{cardContent.props.children[2]}</div>
          </>
        ) : (
          <>
            <div className="flex-shrink-0">{cardContent.props.children[2]}</div>
            <div className="px-12 flex-1">{cardContent.props.children[1]}</div>
            <div className="flex-shrink-0">{cardContent.props.children[0]}</div>
          </>
        )}
      </div>
    </div>
  );
}

export default function BusinessCardWebsite({ card, lang }: BusinessCardWebsiteProps) {
  const [downloading, setDownloading] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [showLayoutModal, setShowLayoutModal] = useState(false);
  const [selectedLayout, setSelectedLayout] = useState<CardLayout>('left');
  const [previewLayout, setPreviewLayout] = useState<CardLayout>('left');
  const [selectedBgColor, setSelectedBgColor] = useState(initialBgColors[0].value);
  const [bgColors, setBgColors] = useState(initialBgColors);
  const simpleCardRef = useRef<HTMLDivElement>(null);
  const t = translations[lang];

  const getCardUrl = () => {
    if (typeof window !== 'undefined') {
      return window.location.href;
    }
    return '';
  };

  const handleCopyLink = async () => {
    const url = getCardUrl();
    try {
      await navigator.clipboard.writeText(url);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleDownload = async () => {
    if (!simpleCardRef.current) return;
    
    setDownloading(true);
    try {
      const dataUrl = await toPng(simpleCardRef.current, {
        quality: 1.0,
        pixelRatio: 2
      });

      const link = document.createElement('a');
      link.download = `${card.name}_business_card.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setDownloading(false);
      setShowLayoutModal(false);
    }
  };

  const handleApplyLayout = () => {
    setSelectedLayout(previewLayout);
    setShowLayoutModal(false);
  };

  const refreshGradients = () => {
    setBgColors(generateRandomGradients());
  };

  const regenerateSingleGradient = (index: number) => {
    const newColors = [...bgColors];
    newColors[index] = generateSingleGradient();
    setBgColors(newColors);
  };

  return (
    <>
      {/* 主要網站視圖 */}
      <div className="min-h-screen pt-6 bg-gradient-to-br from-sky-50 to-blue-50">
        <div className="relative ">
          {/* Hero Section */}
          <div className="relative h-[60vh] min-h-[550px] w-full">
            {card.backgroundImage ? (
              <Image
                src={card.backgroundImage}
                alt="Cover"
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-sky-100 to-indigo-600" />
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
                    src={card.avatarImage || '/default-avatar.png'}
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
          <div className="flex flex-row ">
          <div className="flex justify-center w-2/3">
            <div className="w-full">
              <div className="relative w-[60%] max-w-4xl mx-auto px-4 py-12">
                {/* Contact Grid */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="grid grid-cols-1 md:grid-cols-1 gap-6"
                >
                  {card.email && (
                    <a
                      href={`mailto:${card.email}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-3 p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow"
                    >
                      <FaEnvelope className="text-sky-500 text-2xl" />
                      <span className="text-gray-700">{card.email}</span>
                    </a>
                  )}
                  {card.phone && (
                    <a
                      href={`tel:${card.phone}`}
                      className="flex items-center justify-center space-x-3 p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow"
                    >
                      <FaPhone className="text-sky-500 text-2xl" />
                      <span className="text-gray-700">{card.phone}</span>
                    </a>
                  )}
                  {card.website && (
                    <a
                      href={card.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-3 p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow"
                    >
                      <FaGlobe className="text-sky-500 text-2xl" />
                      <span className="text-gray-700">{t.website}</span>
                    </a>
                  )}
                </motion.div>

                {/* QR Code Section */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="mt-12 flex justify-center"
                >
                  <div className="bg-white p-4 rounded-xl shadow-md">
                    <QRCodeSVG
                      value={getCardUrl()}
                      size={150}
                      level="H"
                      includeMargin
                      imageSettings={{
                        src: card.avatarImage || '/default-avatar.png',
                        x: undefined,
                        y: undefined,
                        height: 30,
                        width: 30,
                        excavate: true,
                      }}
                    />
                    <p className="mt-2 text-center text-sm text-gray-500">
                      {t.scanToView}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {card.description && (
            <div className="w-full mx-auto px-8 py-12">
              <motion.div>
                <a
                  href={`${card.description}`}
                  className="flex items-center justify-center space-x-3 p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow"
                >
                  <span className="text-gray-700">{card.description}</span>
                </a>
              </motion.div>
            </div>
          )}
          </div>
        </div>
      </div>

      {/* 隱藏的簡化版名片 */}
      <div className="fixed -left-[9999px] -top-[9999px]">
        <div ref={simpleCardRef}>
          <SimpleBusinessCard card={card} lang={lang} layout={selectedLayout} selectedBgColor={selectedBgColor} />
        </div>
      </div>

      {/* 版型選擇模態框 */}
      <AnimatePresence>
        {showLayoutModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowLayoutModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-lg p-6 w-2/3 h-4/5 max-w-[1000px] max-h-[800px]"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">{t.selectLayout}</h3>
                  <button
                    onClick={() => setShowLayoutModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FaTimes className="text-xl" />
                  </button>
                </div>

                <div className="flex gap-6 flex-1">
                  {/* 左側 - 版型選擇 */}
                  <div className="w-[45%] space-y-4">
                    {/* 左側版型 */}
                    <button
                      onClick={() => setPreviewLayout('left')}
                      className={`w-full relative rounded-lg overflow-hidden border-2 transition-colors ${
                        previewLayout === 'left' ? 'border-sky-100' : 'border-gray-200'
                      }`}
                    >
                      <div className="aspect-[1200/630] bg-gradient-to-br from-sky-100 to-blue-100 p-3">
                        <div className="w-full h-full flex items-center justify-between">
                          <div className="w-1/4 bg-gray-200 rounded-full aspect-square" />
                          <div className="w-2/4 flex flex-col items-left px-6 space-y-2">
                            <div className="w-3/4 h-4 bg-gray-200 rounded" />
                            <div className="w-2/3 h-3 bg-gray-300 rounded" />
                            <div className="w-1/2 h-3 bg-gray-300 rounded" />
                          </div>
                          <div className="w-1/4 bg-gray-200 rounded-lg aspect-square" />
                        </div>
                      </div>
                      <div className="absolute bottom-0 inset-x-0 bg-black bg-opacity-50 text-white py-2 text-center">
                        {t.leftLayout}
                      </div>
                    </button>

                    {/* 右側版型 */}
                    <button
                      onClick={() => setPreviewLayout('right')}
                      className={`w-full relative rounded-lg overflow-hidden border-2 transition-colors ${
                        previewLayout === 'right' ? 'border-sky-100' : 'border-gray-200'
                      }`}
                    >
                      <div className="aspect-[1200/630] bg-gradient-to-br from-sky-100 to-blue-100 p-3">
                        <div className="w-full h-full flex items-center justify-between">
                          <div className="w-1/4 bg-gray-200 rounded-lg aspect-square" />
                          <div className="w-2/4 flex flex-col items-left space-y-2 px-6">
                            <div className="w-3/4 h-4 bg-gray-200 rounded" />
                            <div className="w-2/3 h-3 bg-gray-300 rounded" />
                            <div className="w-1/2 h-3 bg-gray-300 rounded" />
                          </div>
                          <div className="w-1/4 bg-gray-200 rounded-full aspect-square" />
                        </div>
                      </div>
                      <div className="absolute bottom-0 inset-x-0 bg-black bg-opacity-50 text-white py-2 text-center">
                        {t.rightLayout}
                      </div>
                    </button>
                  </div>

                  {/* 右側 - 預覽和按鈕 */}
                  <div className="w-[55%] h-[55%] flex flex-col">
                    {/* 預覽區域 */}
                    <div className="w-full h-[60%] flex-1 border rounded-lg overflow-hidden shadow-lg bg-gray-50 flex items-center justify-center">
                      <div className="px-[10px] w-full" style={{ transform: 'scale(0.42)', transformOrigin: 'left center' }}>
                        <SimpleBusinessCard card={card} lang={lang} layout={previewLayout} selectedBgColor={selectedBgColor} />
                      </div>
                    </div>

                    {/* 背景色選擇 */}
                    <div className="mt-4 mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-sm text-gray-500">選擇背景色</div>
                        <button
                          onClick={refreshGradients}
                          className="flex items-center space-x-1 text-sm text-sky-600 hover:text-sky-700"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          <span>更新配色</span>
                        </button>
                      </div>
                      <div className="grid grid-cols-8 gap-2">
                        {bgColors.map((color, index) => (
                          <div key={index} className="relative group">
                            <button
                              onClick={() => setSelectedBgColor(color.value)}
                              className={`w-full aspect-square rounded-lg bg-gradient-to-br ${color.value} ${
                                selectedBgColor === color.value ? 'ring-2 ring-sky-500' : 'ring-1 ring-gray-200'
                              } hover:ring-2 hover:ring-sky-400 transition-all`}
                              title={color.name}
                            />
                            <button
                              onClick={() => regenerateSingleGradient(index)}
                              className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                              title="重新生成這個顏色"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 按鈕區域 */}
                    <div className="flex justify-end space-x-4">
                      <button
                        onClick={() => setShowLayoutModal(false)}
                        className="px-6 py-2.5 text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        取消
                      </button>
                      <button
                        onClick={handleDownload}
                        disabled={downloading}
                        className="flex items-center space-x-2 px-6 py-2.5 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors disabled:opacity-50"
                      >
                        <FaDownload />
                        <span>{downloading ? t.downloadingCard : t.downloadCard}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 操作按鈕 */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-8 right-8 flex space-x-4"
      >
        <button
          onClick={handleCopyLink}
          className="flex items-center space-x-2 px-6 py-3 bg-sky-600 text-white rounded-full shadow-lg hover:bg-sky-700 transition-colors"
        >
          {linkCopied ? <FaCheck /> : <FaCopy />}
          <span>{linkCopied ? t.linkCopied : t.copyLink}</span>
        </button>
        <button
          onClick={() => setShowLayoutModal(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-sky-600 text-white rounded-full shadow-lg hover:bg-sky-700 transition-colors"
        >
          <FaDownload />
          <span>{t.download}</span>
        </button>
      </motion.div>
    </>
  );
}
