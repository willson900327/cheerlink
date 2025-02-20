import PageLayout from '../components/PageLayout';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

export default function ContactPage() {
  return (
    <PageLayout title="聯繫我們">
      <div className="space-y-8">
        <p className="text-lg text-gray-700">
          如果您有任何問題或建議，歡迎隨時與我們聯繫。我們的團隊將竭誠為您服務。
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center space-x-4 mb-4">
              <FaEnvelope className="text-2xl text-sky-500" />
              <div>
                <h3 className="font-semibold text-gray-900">電子郵件</h3>
                <a href="mailto:support@example.com" className="text-sky-600 hover:text-sky-700">
                  support@example.com
                </a>
              </div>
            </div>
            <p className="text-gray-600">
              工作日回覆時間：24小時內
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center space-x-4 mb-4">
              <FaPhone className="text-2xl text-sky-500" />
              <div>
                <h3 className="font-semibold text-gray-900">客服專線</h3>
                <a href="tel:+886-2-12345678" className="text-sky-600 hover:text-sky-700">
                  (02) 1234-5678
                </a>
              </div>
            </div>
            <p className="text-gray-600">
              服務時間：週一至週五 9:00-18:00
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <div className="flex items-center space-x-4 mb-4">
            <FaMapMarkerAlt className="text-2xl text-sky-500" />
            <div>
              <h3 className="font-semibold text-gray-900">公司地址</h3>
              <p className="text-gray-700">台北市信義區信義路五段7號</p>
            </div>
          </div>
          <p className="text-gray-600">
            歡迎預約參觀
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
