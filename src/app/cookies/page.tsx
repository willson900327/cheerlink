import PageLayout from '../components/PageLayout';

export default function CookiesPage() {
  return (
    <PageLayout title="Cookie 政策">
      <div className="space-y-8">
        <p className="text-lg text-gray-700">
          本政策說明我們如何使用 Cookie 和類似技術，以及您如何控制這些技術。使用我們的服務即表示您同意我們使用 Cookie。
        </p>

        <div className="space-y-6">
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">什麼是 Cookie？</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                Cookie 是放置在您的設備上的小型文本文件。它們被廣泛用於使網站正常運作，以及提供信息給網站擁有者。
              </p>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">我們使用的 Cookie 類型</h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">必要性 Cookie</h3>
                <p>這些 Cookie 對於網站的正常運作是必需的，無法在我們的系統中關閉。</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">功能性 Cookie</h3>
                <p>這些 Cookie 使我們能夠為您提供增強的功能和個性化設置。</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">分析性 Cookie</h3>
                <p>這些 Cookie 幫助我們了解訪客如何使用我們的網站。</p>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">我們如何使用 Cookie</h2>
            <div className="space-y-3 text-gray-700">
              <ul className="list-disc pl-6 space-y-2">
                <li>記住您的登入狀態</li>
                <li>記住您的語言偏好</li>
                <li>提供個性化的用戶體驗</li>
                <li>分析網站流量和使用情況</li>
                <li>改進我們的服務</li>
              </ul>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">控制 Cookie</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                大多數網絡瀏覽器允許您控制 Cookie。您可以：
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>查看您的瀏覽器中存儲的 Cookie</li>
                <li>刪除個別 Cookie</li>
                <li>阻止某些網站的 Cookie</li>
                <li>阻止所有網站的 Cookie</li>
                <li>在關閉瀏覽器時刪除所有 Cookie</li>
              </ul>
              <p className="mt-4">
                請注意，如果您選擇阻止 Cookie，我們網站的某些功能可能無法正常工作。
              </p>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">更多信息</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                如果您對我們如何使用 Cookie 有任何疑問，請聯繫我們的客服團隊。
              </p>
              <p>
                我們可能會不時更新此 Cookie 政策。任何更改都將在此頁面上發布。
              </p>
            </div>
          </section>
        </div>

        <div className="text-sm text-gray-600">
          最後更新時間：2025年2月11日
        </div>
      </div>
    </PageLayout>
  );
}
