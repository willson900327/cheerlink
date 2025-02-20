'use client';

import PageLayout from '../../components/PageLayout';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Language } from '../../i18n/config';

const translations = {
  en: {
    title: 'Help Center',
    description: 'Welcome to the Help Center. Here you can find all the information about using our digital business card system.',
    categories: [
      {
        title: 'FAQ',
        description: 'View the most common questions and answers from users'
      },
      {
        title: 'User Guide',
        description: 'Learn how to use our digital business card system'
      },
      {
        title: 'Legal',
        description: 'View our legal terms and policies'
      }
    ],
    needMoreHelp: 'Need More Help?',
    contactSupport: 'If you cannot find what you are looking for, please contact our support team.',
    contactUs: 'Contact Us'
  },
  zh: {
    title: '幫助中心',
    description: '歡迎來到幫助中心。在這裡，您可以找到使用數位名片系統的所有相關資訊。',
    categories: [
      {
        title: '常見問題',
        description: '查看用戶最常遇到的問題和解答'
      },
      {
        title: '使用指南',
        description: '了解如何使用我們的數位名片系統'
      },
      {
        title: '法律條款',
        description: '查看我們的法律條款和政策'
      }
    ],
    needMoreHelp: '需要更多幫助？',
    contactSupport: '如果您找不到所需的信息，請聯繫我們的支持團隊。',
    contactUs: '聯繫我們'
  }
};

export default function HelpPage({ params }: { params: { lang: Language } }) {
  const pathname = usePathname();
  const lang = pathname.split('/')[1] as Language;
  const t = translations[lang];

  const helpCategories = t.categories.map((category, index) => ({
    ...category,
    link: `/${lang}/${['faq', 'guide', 'legal'][index]}`
  }));

  return (
    <PageLayout title={t.title}>
      <div className="space-y-8">
        <p className="text-lg text-gray-700">
          {t.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {helpCategories.map((category) => (
            <Link 
              href={category.link} 
              key={category.title}
              className="block bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {category.title}
              </h3>
              <p className="text-gray-600">
                {category.description}
              </p>
            </Link>
          ))}
        </div>

        <div className="bg-sky-50 p-6 rounded-lg mt-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            {t.needMoreHelp}
          </h3>
          <p className="text-gray-700 mb-4">
            {t.contactSupport}
          </p>
          <Link
            href={`/${lang}/contact`}
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700"
          >
            {t.contactUs}
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
