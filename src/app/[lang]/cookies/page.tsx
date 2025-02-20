'use client';

import { usePathname } from 'next/navigation';
import { Language } from '../../i18n/config';

const translations = {
  en: {
    title: 'Cookie Policy',
    description: 'This Cookie Policy explains how we use cookies and similar technologies on our website.',
    lastUpdated: 'Last Updated: February 12, 2025',
    sections: [
      {
        title: 'What Are Cookies',
        content: 'Cookies are small text files that are placed on your computer or mobile device when you visit our website. They are widely used to make websites work more efficiently and provide information to the website owners.'
      },
      {
        title: 'How We Use Cookies',
        content: 'We use cookies for various purposes including:\n• Authentication and security\n• Preferences and settings\n• Analytics and performance\n• Advertising and targeting'
      },
      {
        title: 'Types of Cookies We Use',
        content: '1. Essential Cookies: Required for the website to function properly\n2. Preference Cookies: Remember your settings and preferences\n3. Analytics Cookies: Help us understand how visitors interact with our website\n4. Marketing Cookies: Used to track visitors across websites'
      },
      {
        title: 'Managing Cookies',
        content: 'Most web browsers allow you to control cookies through their settings. You can usually find these settings in the "options" or "preferences" menu of your browser.'
      },
      {
        title: 'Third-Party Cookies',
        content: 'Some cookies are placed by third party services that appear on our pages. We do not control the dissemination of these cookies.'
      },
      {
        title: 'Updates to This Policy',
        content: 'We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page.'
      }
    ]
  },
  zh: {
    title: 'Cookie 政策',
    description: '本 Cookie 政策說明我們如何在網站上使用 cookie 和類似技術。',
    lastUpdated: '最後更新：2025年2月12日',
    sections: [
      {
        title: '什麼是 Cookie',
        content: 'Cookie 是當您訪問我們的網站時放置在您的計算機或移動設備上的小型文本文件。它們被廣泛用於使網站更有效地運作並向網站所有者提供信息。'
      },
      {
        title: '我們如何使用 Cookie',
        content: '我們將 Cookie 用於各種目的，包括：\n• 身份驗證和安全\n• 偏好和設置\n• 分析和性能\n• 廣告和定位'
      },
      {
        title: '我們使用的 Cookie 類型',
        content: '1. 必要 Cookie：網站正常運行所需\n2. 偏好 Cookie：記住您的設置和偏好\n3. 分析 Cookie：幫助我們了解訪問者如何與我們的網站互動\n4. 營銷 Cookie：用於跨網站追蹤訪問者'
      },
      {
        title: '管理 Cookie',
        content: '大多數網絡瀏覽器允許您通過其設置控制 cookie。您通常可以在瀏覽器的"選項"或"偏好"菜單中找到這些設置。'
      },
      {
        title: '第三方 Cookie',
        content: '某些 cookie 是由出現在我們頁面上的第三方服務放置的。我們不控制這些 cookie 的傳播。'
      },
      {
        title: '本政策的更新',
        content: '我們可能會不時更新本 Cookie 政策。我們將通過在此頁面上發布新的 Cookie 政策來通知您任何更改。'
      }
    ]
  }
};

export default function CookiesPage() {
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
              <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                {section.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
