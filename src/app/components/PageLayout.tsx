import React from 'react';

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function PageLayout({ title, children }: PageLayoutProps) {
  return (
    <main className="min-h-screen pt-16 bg-gradient-to-br from-sky-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">{title}</h1>
        <div className="prose max-w-none">
          {children}
        </div>
      </div>
    </main>
  );
}
