'use client';

import { usePathname } from 'next/navigation';
import { Language } from '../../i18n/config';

const translations = {
  en: {
    title: 'User Guide',
    description: 'Learn how to make the most of your digital business card.',
    sections: [
      {
        title: 'Getting Started',
        content: 'Create your account and start building your digital presence with these simple steps.',
        steps: [
          'Sign up for an account using your email',
          'Verify your email address',
          'Log in to your account',
          'Create your first digital business card'
        ]
      },
      {
        title: 'Creating Your Card',
        content: 'Customize your digital business card to reflect your professional identity.',
        steps: [
          'Click "Create Card" button',
          'Fill in your personal and professional information',
          'Upload your profile photo',
          'Add your social media links',
          'Choose a background design'
        ]
      },
      {
        title: 'Sharing Your Card',
        content: 'Share your digital business card with others easily.',
        steps: [
          'Access your card\'s unique URL',
          'Share via QR code',
          'Send through email or messaging apps',
          'Add to your email signature'
        ]
      },
      {
        title: 'Managing Your Cards',
        content: 'Keep your digital business cards up to date.',
        steps: [
          'View all your cards in the dashboard',
          'Edit card information anytime',
          'Track views and interactions',
          'Create multiple cards for different purposes'
        ]
      }
    ]
  },
  zh: {
    title: '使用指南',
    description: '了解如何充分利用您的數位名片。',
    sections: [
      {
        title: '開始使用',
        content: '創建您的帳戶並開始建立您的數位形象，只需簡單幾步。',
        steps: [
          '使用電子郵件註冊帳戶',
          '驗證您的電子郵件地址',
          '登錄您的帳戶',
          '創建您的第一張數位名片'
        ]
      },
      {
        title: '創建名片',
        content: '自定義您的數位名片以反映您的專業形象。',
        steps: [
          '點擊"創建名片"按鈕',
          '填寫您的個人和專業信息',
          '上傳您的個人照片',
          '添加您的社交媒體連結',
          '選擇背景設計'
        ]
      },
      {
        title: '分享名片',
        content: '輕鬆分享您的數位名片。',
        steps: [
          '訪問您的名片唯一 URL',
          '通過 QR 碼分享',
          '通過電子郵件或即時通訊應用程序發送',
          '添加到您的電子郵件簽名'
        ]
      },
      {
        title: '管理名片',
        content: '保持您的數位名片更新。',
        steps: [
          '在儀表板中查看所有名片',
          '隨時編輯名片信息',
          '追蹤查看和互動',
          '為不同目的創建多張名片'
        ]
      }
    ]
  }
};

export default function GuidePage() {
  const pathname = usePathname();
  const lang = pathname.split('/')[1] as Language;
  const t = translations[lang];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">{t.title}</h1>
          <p className="text-xl text-gray-600 mb-12">{t.description}</p>
        </div>

        <div className="space-y-12">
          {t.sections.map((section, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {section.title}
              </h2>
              <p className="text-gray-600 mb-6">{section.content}</p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                {section.steps.map((step, stepIndex) => (
                  <li key={stepIndex}>{step}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
