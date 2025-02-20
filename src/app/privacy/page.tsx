'use client';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">隱私政策</h1>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. 資料收集</h2>
          <p className="text-gray-600">
            我們收集的資訊包括但不限於：
          </p>
          <ul className="list-disc list-inside mt-2 text-gray-600">
            <li>您提供的個人資訊（姓名、電子郵件地址等）</li>
            <li>名片資訊</li>
            <li>使用我們服務時的日誌資訊</li>
            <li>設備資訊</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. 資料使用</h2>
          <p className="text-gray-600">
            我們使用收集的資訊用於：
          </p>
          <ul className="list-disc list-inside mt-2 text-gray-600">
            <li>提供、維護和改進我們的服務</li>
            <li>處理您的要求和交易</li>
            <li>與您溝通</li>
            <li>防止濫用和詐騙</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. 資料保護</h2>
          <p className="text-gray-600">
            我們採取適當的技術和組織措施來保護您的個人資料免受未經授權的訪問、更改、披露或破壞。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Cookie 使用</h2>
          <p className="text-gray-600">
            我們使用 cookie 和類似技術來：
          </p>
          <ul className="list-disc list-inside mt-2 text-gray-600">
            <li>記住您的偏好設置</li>
            <li>分析網站流量</li>
            <li>改善用戶體驗</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. 您的權利</h2>
          <p className="text-gray-600">
            您有權：
          </p>
          <ul className="list-disc list-inside mt-2 text-gray-600">
            <li>訪問您的個人資料</li>
            <li>更正不準確的資料</li>
            <li>要求刪除您的資料</li>
            <li>反對資料處理</li>
            <li>資料可攜性</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. 聯繫我們</h2>
          <p className="text-gray-600">
            如果您對我們的隱私政策有任何疑問，請聯繫我們：
          </p>
          <div className="mt-2 text-gray-600">
            <p>電子郵件：privacy@digitalbusinesscard.com</p>
            <p>電話：(02) 1234-5678</p>
            <p>地址：台北市信義區信義路五段7號</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. 政策更新</h2>
          <p className="text-gray-600">
            我們可能會不時更新此隱私政策。任何重大變更都會通過電子郵件通知您或在我們的網站上發布通知。
          </p>
        </section>
      </div>

      <div className="mt-8 text-gray-500 text-sm">
        最後更新日期：2024年2月10日
      </div>
    </div>
  );
}
