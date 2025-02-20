'use client';

import { usePathname } from 'next/navigation';
import { Language } from '../../i18n/config';

const translations = {
  en: {
    title: 'Legal Terms',
    description: 'Please read these legal terms carefully before using our service.',
    sections: [
      {
        title: 'Terms of Service',
        content: 'By accessing and using our digital business card service, you agree to be bound by these terms and conditions. Our service is provided "as is" and "as available" basis.'
      },
      {
        title: 'User Responsibilities',
        content: 'You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.'
      },
      {
        title: 'Intellectual Property',
        content: 'The service and its original content, features, and functionality are owned by CheerLink and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.'
      },
      {
        title: 'Privacy Policy',
        content: 'Your privacy is important to us. It is our policy to respect your privacy regarding any information we may collect from you across our service. Please refer to our Privacy Policy page for more details.'
      },
      {
        title: 'Limitation of Liability',
        content: 'In no event shall CheerLink, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages.'
      }
    ]
  },
  zh: {
    title: '法律條款',
    description: '使用我們的服務前，請仔細閱讀這些法律條款。',
    sections: [
      {
        title: '服務條款',
        content: '通過訪問和使用我們的數位名片服務，您同意受這些條款和條件的約束。我們的服務按"現狀"和"可用"的基礎提供。'
      },
      {
        title: '用戶責任',
        content: '您有責任維護您的帳戶和密碼的機密性。您同意對在您帳戶下發生的所有活動承擔責任。'
      },
      {
        title: '知識產權',
        content: '該服務及其原創內容、功能和功能性歸 CheerLink 所有，並受國際版權、商標、專利、商業秘密和其他知識產權法律的保護。'
      },
      {
        title: '隱私政策',
        content: '您的隱私對我們很重要。我們的政策是尊重您的隱私，涉及我們可能從您那裡收集的任何信息。詳情請參閱我們的隱私政策頁面。'
      },
      {
        title: '責任限制',
        content: '在任何情況下，CheerLink 及其董事、員工、合作夥伴、代理人、供應商或附屬機構均不對任何間接、偶然、特殊、後果性或懲罰性損害承擔責任。'
      }
    ]
  }
};

export default function LegalPage() {
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
          {t.sections.map((section, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {section.title}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
