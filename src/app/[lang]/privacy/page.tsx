'use client';

import { use } from 'react';
import { Language } from '../../../i18n/config';

interface PrivacyPageProps {
  params: Promise<{
    lang: Language;
  }>;
}

export default function PrivacyPage({ params }: PrivacyPageProps) {
  const { lang } = use(params);

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-sky max-w-none">
          <h1>{lang === 'en' ? 'Privacy Policy' : '隱私權政策'}</h1>
          
          {lang === 'en' ? (
            <>
              <h2>1. Information We Collect</h2>
              <p>We collect information that you provide directly to us, including:</p>
              <ul>
                <li>Name and contact information</li>
                <li>Business card details</li>
                <li>Profile information</li>
              </ul>

              <h2>2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Provide and maintain our services</li>
                <li>Create and display your digital business cards</li>
                <li>Communicate with you about our services</li>
              </ul>

              <h2>3. Information Sharing</h2>
              <p>We do not sell your personal information. We may share your information only:</p>
              <ul>
                <li>With your consent</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights and prevent abuse</li>
              </ul>

              <h2>4. Data Security</h2>
              <p>We implement appropriate security measures to protect your information.</p>

              <h2>5. Your Rights</h2>
              <p>You have the right to:</p>
              <ul>
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
              </ul>
            </>
          ) : (
            <>
              <h2>1. 我們收集的資訊</h2>
              <p>我們收集您直接提供給我們的資訊，包括：</p>
              <ul>
                <li>姓名和聯絡資訊</li>
                <li>名片詳細資訊</li>
                <li>個人資料資訊</li>
              </ul>

              <h2>2. 我們如何使用您的資訊</h2>
              <p>我們使用收集的資訊來：</p>
              <ul>
                <li>提供和維護我們的服務</li>
                <li>創建和顯示您的數位名片</li>
                <li>就我們的服務與您溝通</li>
              </ul>

              <h2>3. 資訊分享</h2>
              <p>我們不會出售您的個人資訊。我們只會在以下情況下分享您的資訊：</p>
              <ul>
                <li>經您同意</li>
                <li>為遵守法律義務</li>
                <li>為保護我們的權利並防止濫用</li>
              </ul>

              <h2>4. 資料安全</h2>
              <p>我們實施適當的安全措施來保護您的資訊。</p>

              <h2>5. 您的權利</h2>
              <p>您有權：</p>
              <ul>
                <li>存取您的個人資訊</li>
                <li>更正不準確的資訊</li>
                <li>要求刪除您的資訊</li>
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
