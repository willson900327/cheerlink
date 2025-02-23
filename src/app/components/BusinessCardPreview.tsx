'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BusinessCard } from '../types/businessCard';
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

interface BusinessCardPreviewProps {
  card: BusinessCard;
}

export default function BusinessCardPreview({ card }: BusinessCardPreviewProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/${card.language}/website/${card.id}`}>
      <motion.div
        className="relative w-full aspect-[1.618/1] rounded-2xl overflow-hidden shadow-lg cursor-pointer bg-white"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ 
          scale: 1.02,
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        }}
        transition={{ duration: 0.2 }}
      >
        {/* 背景圖片或漸變 */}
        <div className="absolute inset-0">
          {card.backgroundImage ? (
            <Image
              src={card.backgroundImage}
              alt="Background"
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-sky-400 via-blue-500 to-purple-600" />
          )}
          {/* 優雅的遮罩效果 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        </div>

        {/* 內容容器 */}
        <div className="relative h-full p-6 flex flex-col justify-between">
          {/* 頂部區域：頭像和姓名 */}
          <div className="flex items-start space-x-4">
            <motion.div 
              className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-white/80 shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              {card.avatarImage ? (
                <Image
                  src={card.avatarImage}
                  alt={card.name}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {card.name.charAt(0)}
                  </span>
                </div>
              )}
            </motion.div>

            <div className="text-white pt-2">
              <motion.h3 
                className="text-2xl font-bold tracking-tight"
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
              >
                {card.name}
              </motion.h3>
              <motion.div
                initial={{ opacity: 0.7 }}
                whileHover={{ opacity: 1 }}
                className="space-y-1"
              >
                <p className="text-sm font-medium">{card.title}</p>
                <p className="text-sm">{card.company}</p>
              </motion.div>
            </div>
          </div>

          {/* 底部區域：聯繫方式和社交媒體 */}
          <motion.div 
            className="space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.2 }}
          >
            {/* 聯繫信息 */}
            <div className="flex items-center space-x-4">
              {card.email && (
                <div className="flex items-center space-x-2 text-white/90">
                  <FaEnvelope className="w-4 h-4" />
                  <span className="text-sm truncate max-w-[150px]">{card.email}</span>
                </div>
              )}
              {card.phone && (
                <div className="flex items-center space-x-2 text-white/90">
                  <FaPhone className="w-4 h-4" />
                  <span className="text-sm">{card.phone}</span>
                </div>
              )}
            </div>

            {/* 社交媒體圖標 */}
            <div className="flex space-x-4">
              {card.linkedin && (
                <motion.div whileHover={{ scale: 1.1 }}>
                  <FaLinkedin className="text-white/90 w-5 h-5" />
                </motion.div>
              )}
              {card.github && (
                <motion.div whileHover={{ scale: 1.1 }}>
                  <FaGithub className="text-white/90 w-5 h-5" />
                </motion.div>
              )}
              {card.twitter && (
                <motion.div whileHover={{ scale: 1.1 }}>
                  <FaTwitter className="text-white/90 w-5 h-5" />
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* 懸停時顯示的查看更多提示 */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.8
            }}
            transition={{ duration: 0.2 }}
          >
            <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
              查看完整名片
            </span>
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
}
