'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/config';
import { useSession } from 'next-auth/react';

export default function LogoUpload() {
  const [logo, setLogo] = useState<string>('/images/default-logo.png');
  const [isUploading, setIsUploading] = useState(false);
  const { data: session } = useSession();

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files[0]) return;
    if (!session?.user?.email) return;

    const file = event.target.files[0];
    
    // 檢查文件類型
    if (!file.type.startsWith('image/')) {
      alert('請上傳圖片文件');
      return;
    }

    // 檢查文件大小 (限制為 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('圖片大小不能超過 2MB');
      return;
    }

    try {
      setIsUploading(true);
      
      // 創建一個唯一的文件名
      const fileName = `logos/${session.user.email}/${Date.now()}-${file.name}`;
      const storageRef = ref(storage, fileName);
      
      // 上傳文件
      await uploadBytes(storageRef, file);
      
      // 獲取下載 URL
      const downloadURL = await getDownloadURL(storageRef);
      setLogo(downloadURL);
      
      // 這裡可以添加將 logo URL 保存到數據庫的邏輯
      
    } catch (error) {
      console.error('Error uploading logo:', error);
      alert('上傳失敗，請稍後再試');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="relative w-8 h-8 mr-2">
      <Image
        src={logo}
        alt="Logo"
        width={32}
        height={32}
        className="rounded-full object-cover"
      />
      <label
        htmlFor="logo-upload"
        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 rounded-full cursor-pointer transition-opacity"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </label>
      <input
        id="logo-upload"
        type="file"
        accept="image/*"
        onChange={handleLogoUpload}
        className="hidden"
        disabled={isUploading}
      />
      {isUploading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
