import PageLayout from '../components/PageLayout';
import Link from 'next/link';

export default function LegalPage() {
  const legalDocs = [
    {
      title: '隱私政策',
      description: '了解我們如何收集、使用和保護您的個人信息',
      link: '/privacy'
    },
    {
      title: '使用條款',
      description: '查看使用我們服務時需要遵守的條款和條件',
      link: '/terms'
    },
    {
      title: 'Cookie 政策',
      description: '了解我們如何使用 Cookie 來改善您的使用體驗',
      link: '/cookies'
    }
  ];

  return (
    <PageLayout title="法律條款">
      <div className="space-y-8">
        <p className="text-lg text-gray-700">
          我們致力於保護用戶的權益和隱私。以下是與我們服務相關的所有法律文件，請仔細閱讀。
        </p>

        <div className="grid grid-cols-1 gap-6">
          {legalDocs.map((doc) => (
            <Link 
              href={doc.link} 
              key={doc.title}
              className="block bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {doc.title}
              </h3>
              <p className="text-gray-600">
                {doc.description}
              </p>
            </Link>
          ))}
        </div>

        <div className="bg-gray-50 p-6 rounded-lg mt-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            重要提示
          </h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>使用我們的服務即表示您同意這些條款</li>
            <li>我們會定期更新這些文件，請經常查看</li>
            <li>如有任何問題，請聯繫我們的法務團隊</li>
          </ul>
        </div>

        <div className="text-sm text-gray-600">
          最後更新時間：2025年2月11日
        </div>
      </div>
    </PageLayout>
  );
}
