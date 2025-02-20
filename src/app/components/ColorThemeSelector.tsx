'use client';

import { useState } from 'react';
import { FaRedo } from 'react-icons/fa';

interface ColorTheme {
  background: string;
  text: string;
}

interface ColorThemeSelectorProps {
  onSelectTheme: (theme: ColorTheme) => void;
  selectedTheme?: ColorTheme;
}

const baseThemes: ColorTheme[] = [
  { background: '#FFFFF0', text: '#000000' }, // 預設：象牙白配黑色
  { background: '#000000', text: '#FFFFFF' }, // 黑配白
  { background: '#2C3E50', text: '#ECF0F1' }, // 深藍配淺灰
  { background: '#F9F3E6', text: '#4A4A4A' }, // 米色配深灰
  { background: '#E8F3F9', text: '#2C5282' }, // 淺藍配深藍
  { background: '#FFF5F5', text: '#742A2A' }, // 淺粉配酒紅
  { background: '#F0FFF4', text: '#276749' }, // 淺綠配深綠
  { background: '#FAF5FF', text: '#553C9A' }, // 淺紫配深紫
];

function generateRandomColor(): string {
  return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
}

function generateRandomThemes(): ColorTheme[] {
  return Array(8).fill(null).map(() => ({
    background: generateRandomColor(),
    text: generateRandomColor(),
  }));
}

export default function ColorThemeSelector({ onSelectTheme, selectedTheme }: ColorThemeSelectorProps) {
  const [themes, setThemes] = useState<ColorTheme[]>(baseThemes);

  const refreshThemes = () => {
    setThemes(generateRandomThemes());
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={refreshThemes}
          className="flex items-center gap-2 px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
          <FaRedo className="w-4 h-4" />
          刷新配色
        </button>
      </div>
      <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
        {themes.map((theme, index) => (
          <div
            key={index}
            onClick={() => onSelectTheme(theme)}
            className={`cursor-pointer rounded-lg overflow-hidden h-16 ${
              selectedTheme === theme ? 'ring-2 ring-blue-500 scale-105' : ''
            } hover:scale-105 transition-all`}
            style={{ backgroundColor: theme.background }}
          >
            <div className="h-full flex items-center justify-center">
              <span style={{ color: theme.text }}>Aa</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
