'use client';

import { Providers } from '../providers';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface LayoutTemplateProps {
  children: React.ReactNode;
  lang: string;
}

export default function LayoutTemplate({ children, lang }: LayoutTemplateProps) {
  const pathname = usePathname();

  return (
    <Providers>
      <main className="flex-grow">
        {children}
      </main>
    </Providers>
  );
}
