'use client';

import { usePathname } from 'next/navigation';
import { Language } from '../../i18n/config';

const translations = {
  en: {
    title: 'Terms of Service',
    description: 'Please read these terms of service carefully before using our service.',
    lastUpdated: 'Last Updated: February 12, 2025',
    sections: [
      {
        title: 'Acceptance of Terms',
        content: 'By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.'
      },
      {
        title: 'Description of Service',
        content: 'CheerLink provides a digital business card platform that allows users to create, manage, and share their digital business cards. The service includes features for customization, sharing, and analytics.'
      },
      {
        title: 'User Account',
        content: 'To use certain features of the service, you must register for an account. You agree to provide accurate information and keep it updated. You are responsible for maintaining the security of your account.'
      },
      {
        title: 'Acceptable Use',
        content: 'You agree not to use the service for any unlawful purpose or in any way that could damage, disable, overburden, or impair our service.'
      },
      {
        title: 'Content Ownership',
        content: 'You retain all ownership rights to the content you upload to our service. By uploading content, you grant us a license to use, store, and share the content in connection with the service.'
      },
      {
        title: 'Service Modifications',
        content: 'We reserve the right to modify or discontinue the service with or without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuance of the service.'
      },
      {
        title: 'Termination',
        content: 'We may terminate or suspend your account and access to the service immediately, without prior notice or liability, for any reason.'
      }
    ]
  },
  zh: {
    title: '服務條款',
    description: '使用我們的服務前，請仔細閱讀這些服務條款。',
    lastUpdated: '最後更新：2025年2月12日',
    sections: [
      {
        title: '條款接受',
        content: '通過訪問和使用本網站，您接受並同意受本協議的條款和規定的約束。'
      },
      {
        title: '服務說明',
        content: 'CheerLink 提供一個數位名片平台，允許用戶創建、管理和分享他們的數位名片。該服務包括自定義、分享和分析功能。'
      },
      {
        title: '用戶帳戶',
        content: '要使用某些服務功能，您必須註冊帳戶。您同意提供準確的信息並保持更新。您有責任維護您帳戶的安全。'
      },
      {
        title: '可接受的使用',
        content: '您同意不將服務用於任何非法目的，或以任何可能損壞、禁用、使負擔過重或損害我們服務的方式使用。'
      },
      {
        title: '內容所有權',
        content: '您保留您上傳到我們服務的內容的所有所有權。通過上傳內容，您授予我們許可使用、存儲和分享與服務相關的內容。'
      },
      {
        title: '服務修改',
        content: '我們保留修改或終止服務的權利，無論是否通知。對於任何修改、暫停或終止服務，我們不對您或任何第三方承擔責任。'
      },
      {
        title: '終止',
        content: '我們可以因任何原因立即終止或暫停您的帳戶和服務訪問權限，無需事先通知或承擔責任。'
      }
    ]
  }
};

export default function TermsPage() {
  const pathname = usePathname();
  const lang = pathname.split('/')[1] as Language;
  const t = translations[lang];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.title}</h1>
          <p className="text-xl text-gray-600 mb-4">{t.description}</p>
          <p className="text-sm text-gray-500 mb-12">{t.lastUpdated}</p>
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
