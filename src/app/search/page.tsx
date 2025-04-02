'use client';

import React, { JSX, useEffect } from 'react';
import Header from '@/components/layout/header';
import Filters from '@/components/search/filters';
import HotelList from '@/components/search/hotelList';
import { useSearch } from '@/hooks/useSearch';
import '@/styles/layouts/search.css';

export default function SearchPage(): JSX.Element {
  const { refreshSearchData } = useSearch();
  useEffect(() => {
    refreshSearchData();
  }, [refreshSearchData]);
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <section className="search-container">
        <div className="search-content">
          <div className="search-grid">
            <div className="p-0">
              <Filters />
            </div>
            <div className="p-0">
              <HotelList />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
