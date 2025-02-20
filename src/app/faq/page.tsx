import PageLayout from '../components/PageLayout';

export default function FAQPage() {
  const faqs = [
    {
      question: '什麼是數位名片？',
      answer: '數位名片是一種電子版的傳統名片，可以包含您的聯繫信息、社交媒體連結、個人照片等。它可以輕鬆分享，並且可以隨時更新。'
    },
    {
      question: '如何創建數位名片？',
      answer: '只需點擊首頁的「創建名片」按鈕，填寫您的個人信息，上傳照片，然後保存即可。整個過程只需要幾分鐘。'
    },
    {
      question: '如何分享我的數位名片？',
      answer: '您可以通過分享二維碼、直接發送連結，或在社交媒體上分享您的數位名片。對方只需掃描二維碼或點擊連結即可查看。'
    },
    {
      question: '數位名片可以更新嗎？',
      answer: '是的，您可以隨時登入系統更新您的數位名片信息。所有更改都會即時生效，確保您的聯繫人始終能看到最新信息。'
    },
    {
      question: '數位名片是否安全？',
      answer: '我們採用先進的加密技術保護您的數據。您可以選擇公開或私密分享您的名片，完全掌控誰可以查看您的信息。'
    },
    {
      question: '支持哪些語言？',
      answer: '目前我們支持中文和英文兩種語言，未來會加入更多語言支持。'
    }
  ];

  return (
    <PageLayout title="常見問題">
      <div className="space-y-8">
        <p className="text-lg text-gray-700 mb-8">
          以下是用戶最常問到的問題和答案。如果您沒有找到需要的信息，請隨時聯繫我們的客服團隊。
        </p>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {faq.question}
              </h3>
              <p className="text-gray-700">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
