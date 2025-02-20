import PageLayout from '../../components/PageLayout';

export default function AboutPage() {
  return (
    <PageLayout title="關於我們">
      <div className="space-y-6">
        <p className="text-lg text-gray-700">
          數位名片是一個現代化的名片解決方案，幫助專業人士以更環保、更智能的方式分享他們的聯繫信息。
        </p>

        <h2 className="text-2xl font-semibold text-gray-900">我們的使命</h2>
        <p className="text-gray-700">
          我們致力於通過數位化轉型，簡化人與人之間的專業連接。我們相信，通過提供直觀、環保的數位名片解決方案，
          可以幫助人們建立更有效的專業網絡。
        </p>

        <h2 className="text-2xl font-semibold text-gray-900">我們的願景</h2>
        <p className="text-gray-700">
          成為全球領先的數位名片平台，為所有專業人士提供最佳的網絡建立體驗。
        </p>

        <h2 className="text-2xl font-semibold text-gray-900">我們的價值觀</h2>
        <ul className="list-disc pl-6 text-gray-700">
          <li>創新：持續探索新技術和解決方案</li>
          <li>用戶至上：以用戶需求為核心</li>
          <li>環保：推動無紙化辦公</li>
          <li>簡約：保持產品簡單易用</li>
        </ul>
      </div>
    </PageLayout>
  );
}
