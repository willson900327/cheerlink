'use client';

import { usePathname } from 'next/navigation';
import { Language } from '../../i18n/config';

const translations = {
  en: {
    title: 'Contact Us',
    description: 'Have questions? We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.',
    email: 'Email',
    phone: 'Phone',
    address: 'Address',
    emailValue: 'support@cheerlink.com',
    phoneValue: '+886 123456789',
    addressValue: 'No. 1, Section 1, Zhongxiao W. Road, Zhongzheng District, Taipei City 100, Taiwan',
    businessHours: 'Business Hours',
    businessHoursValue: 'Monday - Friday: 9:00 AM - 6:00 PM (GMT+8)',
    getInTouch: 'Get in Touch',
    name: 'Name',
    message: 'Message',
    send: 'Send Message',
    sending: 'Sending...',
  },
  zh: {
    title: '聯繫我們',
    description: '有任何問題嗎？我們很樂意聆聽。發送訊息給我們，我們會盡快回覆。',
    email: '電子郵件',
    phone: '電話',
    address: '地址',
    emailValue: 'support@cheerlink.com',
    phoneValue: '+886 123456789',
    addressValue: '台北市中正區忠孝西路一段1號',
    businessHours: '營業時間',
    businessHoursValue: '週一至週五：上午 9:00 - 下午 6:00 (GMT+8)',
    getInTouch: '聯絡我們',
    name: '姓名',
    message: '訊息',
    send: '發送訊息',
    sending: '發送中...',
  }
};

export default function ContactPage() {
  const pathname = usePathname();
  const lang = pathname.split('/')[1] as Language;
  const t = translations[lang];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">{t.title}</h1>
          <p className="text-xl text-gray-600 mb-12">{t.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t.getInTouch}</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{t.email}</h3>
                <p className="text-gray-600">{t.emailValue}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">{t.phone}</h3>
                <p className="text-gray-600">{t.phoneValue}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">{t.address}</h3>
                <p className="text-gray-600">{t.addressValue}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">{t.businessHours}</h3>
                <p className="text-gray-600">{t.businessHoursValue}</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  {t.name}
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  {t.email}
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  {t.message}
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-sky-600 text-white py-2 px-4 rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
              >
                {t.send}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
