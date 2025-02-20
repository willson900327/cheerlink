'use client';

import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/zh');
  return (
    <main className="min-h-screen pt-16 bg-gradient-to-br from-sky-50 to-white">
      {null}
    </main>
  );
}
