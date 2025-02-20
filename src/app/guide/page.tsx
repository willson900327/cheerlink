import PageLayout from '../components/PageLayout';

export default function GuidePage() {
  const guides = [
    {
      title: '創建數位名片',
      steps: [
        '點擊首頁的「創建名片」按鈕',
        '填寫您的基本信息（姓名、職稱、公司等）',
        '上傳您的個人照片或公司標誌',
        '添加聯繫方式和社交媒體連結',
        '預覽並保存您的數位名片'
      ]
    },
    {
      title: '自定義您的名片',
      steps: [
        '選擇喜歡的模板樣式',
        '調整顏色和字體',
        '添加自定義背景圖片',
        '調整信息的顯示順序',
        '預覽在不同設備上的顯示效果'
      ]
    },
    {
      title: '分享您的名片',
      steps: [
        '生成專屬二維碼',
        '複製名片連結',
        '通過社交媒體分享',
        '直接發送給聯繫人',
        '在實體場合展示二維碼'
      ]
    },
    {
      title: '管理您的名片',
      steps: [
        '登入您的帳戶',
        '查看您的所有名片',
        '編輯現有名片信息',
        '查看訪問統計',
        '管理隱私設置'
      ]
    }
  ];

  return (
    <PageLayout title="使用指南">
      <div className="space-y-8">
        <p className="text-lg text-gray-700 mb-8">
          這份使用指南將幫助您了解如何充分利用我們的數位名片系統。按照以下步驟，您可以輕鬆創建和管理您的數位名片。
        </p>

        <div className="space-y-8">
          {guides.map((guide, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {guide.title}
              </h2>
              <ol className="list-decimal pl-6 space-y-3">
                {guide.steps.map((step, stepIndex) => (
                  <li 
                    key={stepIndex}
                    className="text-gray-700"
                  >
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>

        <div className="bg-sky-50 p-6 rounded-lg mt-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            提示
          </h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>定期更新您的名片信息，保持信息的時效性</li>
            <li>使用高質量的照片和圖片，提升專業形象</li>
            <li>添加社交媒體連結，擴展您的專業網絡</li>
            <li>使用數據分析功能，了解您的名片效果</li>
          </ul>
        </div>
      </div>
    </PageLayout>
  );
}
