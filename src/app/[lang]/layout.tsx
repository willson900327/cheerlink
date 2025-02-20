import { languages, Language } from '../i18n/config';
import { redirect } from 'next/navigation';

export async function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

interface LayoutProps {
  children: React.ReactNode;
  params: {
    lang: string;
  };
}

export default async function Layout({ children, params }: LayoutProps) {
  // 驗證語言參數
  if (!languages.includes(params.lang as Language)) {
    redirect('/zh'); // 如果語言無效，重定向到中文版
  }

  return <>{children}</>;
}
