'use client';

import { useState, useEffect } from 'react';
import { Empty, Spin } from 'antd';
import { useSearch } from '@/hooks/useSearch';
import { hotels, flights } from '../../../data/mockData';
import HotelCard from './hotelCard';
import FlightCard from './FlightCard';
import { useLanguage } from '@/hooks/useLanguage';

const HotelList = () => {
  const { filters, searchParams } = useSearch();
  const { t } = useLanguage();
  const travelType = searchParams.travelType || 'package';
  const [filteredHotels, setFilteredHotels] = useState(hotels);
  const [filteredFlights, setFilteredFlights] = useState(flights);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (travelType !== 'flight') {
      setLoading(true);
      const timer = setTimeout(() => {
        let filtered = [...hotels];
        if (filters.destination) {
          filtered = filtered.filter((hotel) =>
            hotel.location
              .toLowerCase()
              .includes(filters.destination.toLowerCase()),
          );
        }
        if (filters.hotelConcepts && filters.hotelConcepts.length > 0) {
          filtered = filtered.filter((hotel) =>
            hotel.categories.some((category) =>
              filters.hotelConcepts.includes(category),
            ),
          );
        }
        if (filters.stars && filters.stars.length > 0) {
          filtered = filtered.filter((hotel) =>
            filters.stars.some((star) => hotel.stars >= star),
          );
        }
        setFilteredHotels(filtered);
        setLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [filters, travelType]);

  useEffect(() => {
    if (travelType === 'flight') {
      setLoading(true);
      const timer = setTimeout(() => {
        let filtered = [...flights];
        if (filters.destination) {
          filtered = filtered.filter((flight) =>
            flight.location
              .toLowerCase()
              .includes(filters.destination.toLowerCase()),
          );
        }

        if (filters.from) {
          filtered = filtered.filter((flight) =>
            flight.name.toLowerCase().includes(filters.from.toLowerCase()),
          );
        }

        if (filters.stars && filters.stars.length > 0) {
          filtered = filtered.filter((flight) =>
            filters.stars.some((star) => flight.stars >= star),
          );
        }

        if (filters.flightConcepts && filters.flightConcepts.length > 0) {
          filtered = filtered.filter((flight) =>
            filters.flightConcepts.includes(flight.categories[0]),
          );
        }

        setFilteredFlights(filtered);
        setLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [filters, travelType]);

  if (loading) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-sm flex flex-col items-center justify-center min-h-[300px]">
        <Spin size="large" />
        <p className="mt-4 text-gray-500">{t('SearchPage', 'loading')}</p>
      </div>
    );
  }

  const showFlights = travelType === 'flight';
  const items = showFlights ? filteredFlights : filteredHotels;

  if (items.length === 0) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-sm flex flex-col items-center justify-center min-h-[300px]">
        <Empty description={t('SearchPage', 'noResults')} />
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-8">
      {showFlights
        ? filteredFlights.map((flight) => (
            <FlightCard key={flight.id} flight={flight} />
          ))
        : filteredHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
    </div>
  );
};

export default HotelList;
