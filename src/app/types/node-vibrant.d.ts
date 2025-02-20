declare module 'node-vibrant/dist/vibrant' {
  export interface Swatch {
    getRgb(): [number, number, number];
    getHsl(): [number, number, number];
    getPopulation(): number;
    getHex(): string;
    hex: string;
    rgb: [number, number, number];
    hsl: [number, number, number];
    population: number;
  }

  export interface SwatchMap {
    Vibrant?: Swatch;
    Muted?: Swatch;
    DarkVibrant?: Swatch;
    DarkMuted?: Swatch;
    LightVibrant?: Swatch;
    LightMuted?: Swatch;
    [key: string]: Swatch | undefined;
  }

  export default class Vibrant {
    static from(src: string | Buffer): Vibrant;
    getPalette(): Promise<SwatchMap>;
  }
}
