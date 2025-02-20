import Vibrant from 'node-vibrant/dist/vibrant';

export interface ColorPalette {
  primary: string;
  secondary: string;
  background: string;
  text: string;
}

export async function extractColors(imageUrl: string): Promise<ColorPalette> {
  try {
    const palette = await Vibrant.from(imageUrl).getPalette();
    
    // 獲取主要顏色
    const primary = palette.Vibrant?.hex || '#000000';
    const secondary = palette.LightVibrant?.hex || '#ffffff';
    const background = palette.Muted?.hex || '#f3f4f6';
    
    // 根據背景色的亮度決定文字顏色
    const backgroundRgb = hexToRgb(background);
    const textColor = isLightColor(backgroundRgb) ? '#000000' : '#ffffff';

    return {
      primary,
      secondary,
      background,
      text: textColor,
    };
  } catch (error) {
    console.error('Error extracting colors:', error);
    return {
      primary: '#000000',
      secondary: '#ffffff',
      background: '#f3f4f6',
      text: '#000000',
    };
  }
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
}

function isLightColor(rgb: { r: number; g: number; b: number }): boolean {
  // 使用 YIQ 公式計算亮度
  const yiq = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  return yiq >= 128;
}
