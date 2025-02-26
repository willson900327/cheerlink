'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { BusinessCard } from '../types/businessCard';
import { saveBusinessCard, updateBusinessCard } from '../firebase/services';
import { useSession } from 'next-auth/react';

interface CreateCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: BusinessCard | null;
  mode?: 'create' | 'edit';
}

const translations = {
  en: {
    title: 'Create Business Card',
    editTitle: 'Edit Business Card',
    name: 'Name',
    title: 'Title',
    company: 'Company',
    email: 'Email',
    phone: 'Phone',
    website: 'Website',
    address: 'Address',
    description: 'Description',
    save: 'Save',
    cancel: 'Cancel',
    required: 'This field is required',
    invalidEmail: 'Invalid email address',
    invalidPhone: 'Invalid phone number',
    invalidWebsite: 'Invalid website URL',
    success: 'Business card saved successfully',
    error: 'Failed to save business card',
    avatarImage: 'Avatar Image',
    backgroundImage: 'Background Image',
    uploadImage: 'Upload Image',
    change: 'Change',
    errorProcessingImage: 'Error processing image',
    redirecting: 'Redirecting to your business card...'
  },
  zh: {
    title: '創建名片',
    editTitle: '編輯名片',
    name: '姓名',
    title: '職稱',
    company: '公司',
    email: '電子郵件',
    phone: '電話',
    website: '網站',
    address: '地址',
    description: '描述',
    save: '保存',
    cancel: '取消',
    required: '此欄位為必填',
    invalidEmail: '無效的電子郵件地址',
    invalidPhone: '無效的電話號碼',
    invalidWebsite: '無效的網站網址',
    success: '名片保存成功',
    error: '保存名片失敗',
    avatarImage: '頭像圖片',
    backgroundImage: '背景圖片',
    uploadImage: '上傳圖片',
    change: '更改',
    errorProcessingImage: '處理圖片時出錯',
    redirecting: '正在跳轉到您的名片...'
  }
};

const MAX_IMAGE_SIZE = 800;

async function resizeImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      if (width > height && width > MAX_IMAGE_SIZE) {
        height = Math.round((height * MAX_IMAGE_SIZE) / width);
        width = MAX_IMAGE_SIZE;
      } else if (height > MAX_IMAGE_SIZE) {
        width = Math.round((width * MAX_IMAGE_SIZE) / height);
        height = MAX_IMAGE_SIZE;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', 0.8));
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    reader.readAsDataURL(file);
  });
}

export default function CreateCardModal({
  isOpen,
  onClose,
  initialData,
  mode = 'create'
}: CreateCardModalProps) {
  const pathname = usePathname();
  const router = useRouter();
  const lang = pathname.split('/')[1] === 'en' ? 'en' : 'zh';
  const t = translations[lang];
  const { data: session } = useSession();

  const [formData, setFormData] = useState<BusinessCard>(() => {
    if (initialData) {
      return {
        ...initialData,
        updatedAt: new Date().toISOString()
      };
    }
    return {
      id: '',
      name: '',
      title: '',
      company: '',
      email: session?.user?.email || '',
      phone: '',
      website: '',
      address: '',
      description: '',
      avatarImage: '',
      backgroundImage: '',
      userId: session?.user?.email || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      language: lang
    };
  });

  const [errors, setErrors] = useState<Partial<Record<keyof BusinessCard, string>>>({});
  const [saving, setSaving] = useState(false);
  
  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        updatedAt: new Date().toISOString()
      });
      setAvatarPreview(initialData.avatarImage || '');
      setBackgroundPreview(initialData.backgroundImage || '');
    }
  }, [initialData]);

  const [avatarPreview, setAvatarPreview] = useState(initialData?.avatarImage || '');
  const [backgroundPreview, setBackgroundPreview] = useState(initialData?.backgroundImage || '');

  const validateForm = () => {
    const newErrors: Partial<Record<keyof BusinessCard, string>> = {};

    if (!formData.name) newErrors.name = t.required;
    if (!formData.email) {
      newErrors.email = t.required;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.invalidEmail;
    }
    if (formData.phone && !/^\+?[\d\s-]{8,}$/.test(formData.phone)) {
      newErrors.phone = t.invalidPhone;
    }
    if (formData.website && !/^https?:\/\/.+\..+/.test(formData.website)) {
      newErrors.website = t.invalidWebsite;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>, type: 'avatar' | 'background') => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const resizedImage = await resizeImage(file);
      if (type === 'avatar') {
        setAvatarPreview(resizedImage);
        setFormData(prev => ({ ...prev, avatarImage: resizedImage }));
      } else {
        setBackgroundPreview(resizedImage);
        setFormData(prev => ({ ...prev, backgroundImage: resizedImage }));
      }
    } catch (error) {
      console.error('Error processing image:', error);
      alert(t.errorProcessingImage);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSaving(true);
    try {
      let cardId: string;
      if (mode === 'edit' && formData.id) {
        await updateBusinessCard(formData.id, formData);
        cardId = formData.id;
      } else {
        cardId = await saveBusinessCard(formData);
      }
      onClose();
      router.push(`/${lang}/website/${cardId}`);
    } catch (error) {
      console.error('Error saving business card:', error);
      alert(t.error);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      updatedAt: new Date().toISOString()
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="relative bg-white rounded-lg shadow-xl p-8 m-4 max-w-6xl w-full">
        <h2 className="text-2xl font-bold mb-6">
          {mode === 'edit' ? t.editTitle : t.title}
        </h2>
        <form onSubmit={handleSubmit} className="flex gap-8">
          {/* 左側：圖片上傳和預覽 */}
          <div className="w-1/3 space-y-6">
            {/* 頭像上傳 */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">{t.avatarImage}</label>
              <div className="flex flex-col items-center space-y-4">
                <div className="w-40 h-40 rounded-full overflow-hidden bg-gray-200 border-2 border-gray-300">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="Avatar preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="h-20 w-20 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                </div>
                <label className="cursor-pointer bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-md transition-colors">
                  <span>{avatarPreview ? t.change : t.uploadImage}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, 'avatar')}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* 背景圖片上傳 */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">{t.backgroundImage}</label>
              <div className="flex flex-col items-center space-y-4">
                <div className="w-full h-48 rounded-lg overflow-hidden bg-gray-200 border-2 border-gray-300">
                  {backgroundPreview ? (
                    <img
                      src={backgroundPreview}
                      alt="Background preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="h-20 w-20 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>
                <label className="cursor-pointer bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-md transition-colors">
                  <span>{backgroundPreview ? t.change : t.uploadImage}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, 'background')}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* 右側：個人資料表單 */}
          <div className="w-2/3 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">{t.name}</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm ${
                    errors.name ? 'border-red-500' : ''
                  }`}
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">{t.title}</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">{t.company}</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">{t.email}</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm ${
                    errors.email ? 'border-red-500' : ''
                  }`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">{t.phone}</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm ${
                    errors.phone ? 'border-red-500' : ''
                  }`}
                />
                {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">{t.website}</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm ${
                    errors.website ? 'border-red-500' : ''
                  }`}
                />
                {errors.website && <p className="mt-1 text-sm text-red-500">{errors.website}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">{t.address}</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">{t.description}</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                {t.cancel}
              </button>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 disabled:opacity-50"
              >
                {saving ? '...' : t.save}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
