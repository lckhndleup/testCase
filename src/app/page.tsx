'use client';

import Header from '@/components/layout/header';
import TravelTabs from '@/components/home/travelTabs';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';

const SearchForm = dynamic(() => import('@/components/home/searchForm'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-16 bg-white/30 backdrop-blur-sm rounded-lg animate-pulse"></div>
  ),
});

export default function Home() {
  useEffect(() => {
    document.body.style.background = '#FFFFFF';
    return () => {
      document.body.style.background = '';
    };
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden">
      <Header />
      <div
        className="relative h-[500px] overflow-hidden bg-blue-400"
        style={{
          width: '100%',
          height: '500px',
        }}
      >
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?q=80&w=3433&auto=format&fit=crop')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 40%',
            transform: 'scale(1.05)',
            filter: 'brightness(1.05) saturate(1.1)',
          }}
        ></div>
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.05), rgba(0,0,0,0.15))',
          }}
        ></div>
        <div className="relative z-20 container mx-auto h-full flex flex-col justify-center items-center px-4">
          <div className="w-full max-w-4xl">
            <div className="mb-4 mt-56">
              <TravelTabs />
            </div>
            <div className="transform transition-transform duration-300">
              <SearchForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
