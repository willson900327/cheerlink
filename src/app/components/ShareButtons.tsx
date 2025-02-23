'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';

interface ShareButtonsProps {
  cardId: string;
  title: string;
  description?: string;
}

const translations = {
  en: {
    share: 'Share',
    copyLink: 'Copy Link',
    copied: 'Copied!',
    shareOn: 'Share on',
  },
  zh: {
    share: '分享',
    copyLink: '複製連結',
    copied: '已複製！',
    shareOn: '分享到',
  }
};

export default function ShareButtons({ cardId, title, description = '' }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const pathname = usePathname();
  const lang = pathname.split('/')[1] === 'en' ? 'en' : 'zh';
  const t = translations[lang];

  // 生成分享連結
  const shareUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/${lang}/preview/${cardId}`
    : '';

  // 複製連結
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // 社交媒體分享函數
  const shareHandlers = {
    facebook: () => {
      const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
      window.open(url, '_blank', 'width=600,height=400');
    },
    twitter: () => {
      const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`;
      window.open(url, '_blank', 'width=600,height=400');
    },
    linkedin: () => {
      const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
      window.open(url, '_blank', 'width=600,height=400');
    },
    line: () => {
      const url = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}`;
      window.open(url, '_blank', 'width=600,height=400');
    },
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex items-center space-x-4">
        {/* Facebook */}
        <button
          onClick={shareHandlers.facebook}
          className="p-2 rounded-full bg-[#1877f2] text-white hover:bg-[#166fe5] transition-colors"
          aria-label={`${t.shareOn} Facebook`}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
          </svg>
        </button>

        {/* Twitter/X */}
        <button
          onClick={shareHandlers.twitter}
          className="p-2 rounded-full bg-black text-white hover:bg-gray-800 transition-colors"
          aria-label={`${t.shareOn} X`}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </button>

        {/* LinkedIn */}
        <button
          onClick={shareHandlers.linkedin}
          className="p-2 rounded-full bg-[#0a66c2] text-white hover:bg-[#004182] transition-colors"
          aria-label={`${t.shareOn} LinkedIn`}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </button>

        {/* LINE */}
        <button
          onClick={shareHandlers.line}
          className="p-2 rounded-full bg-[#00b900] text-white hover:bg-[#009900] transition-colors"
          aria-label={`${t.shareOn} LINE`}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.057.592.121.303.079.778.039 1.085l-.171 1.027c-.053.303-.242 1.186 1.039.647 1.281-.54 6.911-4.069 9.428-6.967 1.739-1.907 2.572-3.843 2.572-5.992zm-18.988-2.595c.129 0 .234.105.234.234v4.153h2.287c.129 0 .233.104.233.233v.842c0 .129-.104.234-.233.234h-3.363c-.063 0-.119-.025-.161-.065-.043-.043-.068-.099-.068-.161v-5.235c0-.129.104-.234.233-.234h.838zm14.992 0c.129 0 .233.105.233.234v.842c0 .129-.104.234-.233.234h-2.287v.883h2.287c.129 0 .233.105.233.234v.842c0 .129-.104.234-.233.234h-2.287v.884h2.287c.129 0 .233.105.233.234v.842c0 .129-.104.234-.233.234h-3.363c-.063 0-.12-.025-.162-.065-.043-.043-.067-.099-.067-.161v-5.235c0-.129.104-.234.233-.234h3.363zm-10.442.001c.129 0 .234.104.234.233v5.235c0 .129-.105.234-.234.234h-.837c-.129 0-.234-.105-.234-.234v-5.235c0-.129.105-.233.234-.233h.837zm2.453 0c.018 0 .037.002.056.006.063.012.117.05.152.109l1.941 2.62v-2.501c0-.129.105-.233.234-.233h.838c.129 0 .233.104.233.233v5.235c0 .129-.104.234-.233.234h-.838c-.025 0-.047-.004-.068-.009-.067-.016-.121-.056-.154-.119l-1.932-2.615v2.509c0 .129-.105.234-.234.234h-.837c-.129 0-.234-.105-.234-.234v-5.235c0-.129.105-.233.234-.233h.837z"/>
          </svg>
        </button>

        {/* Copy Link Button */}
        <button
          onClick={copyToClipboard}
          className={`p-2 rounded-full transition-colors ${
            copied 
              ? 'bg-green-500 text-white'
              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
          }`}
          aria-label={copied ? t.copied : t.copyLink}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
