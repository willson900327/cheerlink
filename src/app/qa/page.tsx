'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const faqs = [
  {
    question: '什麼是數字名片？',
    answer: '數字名片是一種現代化的電子名片，它可以包含您的個人信息、聯繫方式、社交媒體鏈接等。與傳統紙質名片相比，數字名片更環保、更容易更新和分享。'
  },
  {
    question: '如何創建我的數字名片？',
    answer: '點擊頂部導航欄的「建立名片」按鈕，填寫您的個人信息，上傳頭像，系統會自動為您生成一個美觀的數字名片。您可以預覽效果，並可以隨時修改內容。'
  },
  {
    question: '如何分享我的數字名片？',
    answer: '創建完成後，您可以：\n1. 下載名片圖片直接分享\n2. 分享您的個人網站鏈接\n3. 讓對方掃描您名片背面的 QR Code'
  },
  {
    question: '我的數據安全嗎？',
    answer: '我們非常重視用戶隱私和數據安全。您的所有信息都經過加密存儲，並且您可以隨時刪除或修改您的數據。我們不會將您的信息分享給第三方。'
  },
  {
    question: '支持哪些自定義選項？',
    answer: '目前支持：\n1. 上傳個人頭像\n2. 自動生成匹配的背景顏色\n3. 添加個人簡介\n4. 自定義聯繫方式和社交媒體鏈接'
  }
];

export default function QAPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-50 pt-24 pb-12 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-900 mb-8 text-center"
        >
          常見問題
        </motion.h1>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-medium text-gray-900">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-gray-500 transform transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-6 py-4 bg-gray-50"
                >
                  <p className="text-gray-600 whitespace-pre-line">{faq.answer}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
