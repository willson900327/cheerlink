import PageLayout from '../components/PageLayout';

export default function TermsPage() {
  return (
    <PageLayout title="使用條款">
      <div className="space-y-8">
        <p className="text-lg text-gray-700">
          歡迎使用我們的數位名片服務。請仔細閱讀以下條款，使用我們的服務即表示您同意這些條款。
        </p>

        <div className="space-y-6">
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. 服務說明</h2>
            <div className="space-y-3 text-gray-700">
              <p>我們提供數位名片的創建、管理和分享服務。</p>
              <p>我們保留隨時修改、暫停或終止服務的權利。</p>
              <p>我們可能會定期更新這些條款，更新後的條款將在網站上公布。</p>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. 用戶責任</h2>
            <div className="space-y-3 text-gray-700">
              <p>用戶必須提供真實、準確的信息。</p>
              <p>用戶需要對其帳戶的所有活動負責。</p>
              <p>禁止使用服務進行任何非法或未經授權的活動。</p>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. 知識產權</h2>
            <div className="space-y-3 text-gray-700">
              <p>服務中的所有內容和功能均為我們的財產。</p>
              <p>用戶保留其上傳內容的所有權，但授予我們使用權。</p>
              <p>禁止未經授權複製或使用我們的知識產權。</p>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. 免責聲明</h2>
            <div className="space-y-3 text-gray-700">
              <p>服務按「現狀」提供，不提供任何明示或暗示的保證。</p>
              <p>我們不對任何直接或間接損失負責。</p>
              <p>我們不保證服務不會中斷或出錯。</p>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. 終止服務</h2>
            <div className="space-y-3 text-gray-700">
              <p>我們可能因違反條款而終止用戶的服務使用權。</p>
              <p>用戶可以隨時停止使用服務。</p>
              <p>終止後，部分條款仍將繼續有效。</p>
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
