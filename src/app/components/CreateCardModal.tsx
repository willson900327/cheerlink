'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { BusinessCard } from '../types/businessCard';
import { saveBusinessCard, updateBusinessCard } from '../firebase/services';

interface CreateCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: BusinessCard | null;
  mode?: 'create' | 'edit';
}

const translations = {
  en: {
    createCard: 'Create New Card',
    editCard: 'Edit Card',
    name: 'Name',
    title: 'Title',
    company: 'Company',
    email: 'Email',
    phone: 'Phone',
    bio: 'Bio',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    twitter: 'Twitter',
    cancel: 'Cancel',
    creating: 'Creating...',
    updating: 'Updating...',
    create: 'Create Card',
    update: 'Update Card',
    uploadImage: 'Upload Image',
    required: 'Required',
    errorProcessingImage: 'Error processing image',
    pleaseUploadImage: 'Please upload an image file',
    avatarImage: 'Avatar Image',
    backgroundImage: 'Background Image',
    change: 'Change',
  },
  zh: {
    createCard: '創建新名片',
    editCard: '編輯名片',
    name: '姓名',
    title: '職稱',
    company: '公司',
    email: '電子郵件',
    phone: '電話',
    bio: '簡介',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    twitter: 'Twitter',
    cancel: '取消',
    creating: '創建中...',
    updating: '更新中...',
    create: '創建名片',
    update: '更新名片',
    uploadImage: '上傳圖片',
    required: '必填',
    errorProcessingImage: '處理圖片時出錯',
    pleaseUploadImage: '請上傳圖片文件',
    avatarImage: '頭像圖片',
    backgroundImage: '背景圖片',
    change: '更改',
  }
};

const MAX_IMAGE_SIZE = 800;

const initialFormData = {
  name: '',
  title: '',
  company: '',
  email: '',
  phone: '',
  bio: '',
  avatarImage: '',
  backgroundImage: '',
  linkedin: '',
  github: '',
  twitter: '',
  createdAt: '',
  updatedAt: '',
  userEmail: '',
};

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
  const lang = pathname.split('/')[1] === 'en' ? 'en' : 'zh';
  const t = translations[lang];

  const [formData, setFormData] = useState<BusinessCard>(() => {
    if (mode === 'edit' && initialData) {
      return { ...initialData };
    }
    return {
      ...initialFormData,
      id: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>('');
  const [backgroundPreview, setBackgroundPreview] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && initialData) {
        setFormData({ ...initialData });
        setAvatarPreview(initialData.avatarImage || '');
        setBackgroundPreview(initialData.backgroundImage || '');
      } else {
        setFormData({
          ...initialFormData,
          id: '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
        setAvatarPreview('');
        setBackgroundPreview('');
      }
      setError(null);
    }
  }, [isOpen, mode, initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === 'edit' && initialData?.id) {
        const { id, ...updateData } = formData;
        await updateBusinessCard(initialData.id, {
          ...updateData,
          updatedAt: new Date().toISOString()
        });
      } else {
        await saveBusinessCard(formData);
      }
      onClose();
    } catch (error) {
      console.error(`Error ${mode === 'edit' ? 'updating' : 'creating'} card:`, error);
      setError(error instanceof Error ? error.message : `Failed to ${mode === 'edit' ? 'update' : 'create'} card`);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>, type: 'avatar' | 'background') => {
    const file = e.target.files?.[0];
    if (!file) {
      setError(t.pleaseUploadImage);
      return;
    }

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
      setError(t.errorProcessingImage);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">
            {mode === 'edit' ? t.editCard : t.createCard}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t.name} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t.title}
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t.company}
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t.email} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t.phone}
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t.linkedin}
                </label>
                <input
                  type="url"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t.github}
                </label>
                <input
                  type="url"
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t.twitter}
                </label>
                <input
                  type="url"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t.bio}
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.avatarImage}
                </label>
                <div className="flex items-center space-x-4">
                  {avatarPreview && (
                    <img
                      src={avatarPreview}
                      alt="Avatar preview"
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  )}
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.backgroundImage}
                </label>
                <div className="flex items-center space-x-4">
                  {backgroundPreview && (
                    <img
                      src={backgroundPreview}
                      alt="Background preview"
                      className="w-20 h-20 rounded object-cover"
                    />
                  )}
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

            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                {t.cancel}
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading
                  ? mode === 'edit'
                    ? t.updating
                    : t.creating
                  : mode === 'edit'
                  ? t.update
                  : t.create}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
