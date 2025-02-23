import { redirect } from 'next/navigation';
import { Language, languages } from '../i18n/config';
import { Metadata } from 'next';
import LayoutTemplate from './layout-template';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface LayoutProps {
  children: React.ReactNode;
  params: {
    lang: string;
  };
}

export const metadata: Metadata = {
  title: 'Digital Business Card',
  description: 'Create and share your digital business card',
};

export function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export default async function Layout({ children, params }: LayoutProps) {
  const lang = params.lang;
  
  if (!languages.includes(lang as Language)) {
    redirect('/zh');
  }

  return (
    <html lang={lang} className="h-full">
      <body className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-16 flex-grow"> 
          <LayoutTemplate lang={lang}>
            {children}
          </LayoutTemplate>
        </div>
        <Footer lang={lang} />
      </body>
    </html>
  );
}
