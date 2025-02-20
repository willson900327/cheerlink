'use client';

import { usePathname } from 'next/navigation';
import { Language } from '../../i18n/config';

const translations = {
  en: {
    title: 'Frequently Asked Questions',
    description: 'Find answers to common questions about our digital business card service.',
    questions: [
      {
        q: 'What is a digital business card?',
        a: 'A digital business card is a modern alternative to traditional paper business cards. It allows you to share your contact information, social media profiles, and other professional details electronically through a unique URL or QR code.'
      },
      {
        q: 'How do I create a digital business card?',
        a: 'Creating a digital business card is simple: 1) Sign up for an account, 2) Click "Create Card" and fill in your information, 3) Upload your photo and customize the design, 4) Save and share your card.'
      },
      {
        q: 'Can I edit my card after creating it?',
        a: 'Yes, you can edit your digital business card at any time. Simply log in to your account, go to your cards, and click the edit button to make changes.'
      },
      {
        q: 'How do I share my digital business card?',
        a: 'You can share your digital business card in several ways: 1) Share your unique URL directly, 2) Show your QR code for others to scan, 3) Send via email or messaging apps.'
      },
      {
        q: 'Is my information secure?',
        a: 'Yes, we take security seriously. Your information is encrypted and stored securely. You can control what information is visible on your card and who can access it.'
      }
    ]
  },
  zh: {
    title: '常見問題',
    description: '找到關於我們數位名片服務的常見問題解答。',
    questions: [
      {
        q: '什麼是數位名片？',
        a: '數位名片是傳統紙質名片的現代替代品。它允許您通過唯一的 URL 或 QR 碼以電子方式分享您的聯繫信息、社交媒體資料和其他專業詳細信息。'
      },
      {
        q: '如何創建數位名片？',
        a: '創建數位名片很簡單：1) 註冊帳戶，2) 點擊"創建名片"並填寫您的信息，3) 上傳照片並自定義設計，4) 保存並分享您的名片。'
      },
      {
        q: '創建後可以編輯名片嗎？',
        a: '是的，您可以隨時編輯您的數位名片。只需登錄您的帳戶，進入您的名片列表，點擊編輯按鈕即可進行修改。'
      },
      {
        q: '如何分享我的數位名片？',
        a: '您可以通過多種方式分享您的數位名片：1) 直接分享您的唯一 URL，2) 展示您的 QR 碼供他人掃描，3) 通過電子郵件或即時通訊應用程序發送。'
      },
      {
        q: '我的信息安全嗎？',
        a: '是的，我們非常重視安全性。您的信息經過加密並安全存儲。您可以控制在名片上顯示哪些信息以及誰可以訪問這些信息。'
      }
    ]
  }
};

export default function FAQPage() {
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

        <div className="space-y-8">
          {t.questions.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{item.q}</h3>
              <p className="text-gray-600">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
