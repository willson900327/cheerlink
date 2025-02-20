import PageLayout from '../components/PageLayout';
import Link from 'next/link';

export default function HelpPage() {
  const helpCategories = [
    {
      title: '常見問題',
      description: '查看用戶最常遇到的問題和解答',
      link: '/faq'
    },
    {
      title: '使用指南',
      description: '了解如何使用我們的數位名片系統',
      link: '/guide'
    },
    {
      title: '法律條款',
      description: '查看我們的法律條款和政策',
      link: '/legal'
    }
  ];

  return (
    <PageLayout title="幫助中心">
      <div className="space-y-8">
        <p className="text-lg text-gray-700">
          歡迎來到幫助中心。在這裡，您可以找到使用數位名片系統的所有相關資訊。
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
            需要更多幫助？
          </h3>
          <p className="text-gray-700 mb-4">
            如果您在上述資源中找不到所需的信息，請隨時聯繫我們的客服團隊。
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center text-sky-600 hover:text-sky-700"
          >
            聯繫客服 →
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
