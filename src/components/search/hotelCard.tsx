'use client';

import React, { JSX } from 'react';
import { Hotel } from '../../../data/mockData';
import { Button } from 'antd';
import Icon from '../../assets/icons/Icon';
import { useLanguage } from '@/hooks/useLanguage';
import { useRouter } from 'next/navigation';

interface HotelCardProps {
  hotel: Hotel;
}

const HotelCard = ({ hotel }: HotelCardProps): JSX.Element => {
  const { t } = useLanguage();
  const router = useRouter();

  const handleContinue = () => {
    router.push('/comingsoon');
  };

  return (
    <div className="hotel-card-container flex flex-col lg:flex-row items-start gap-4 w-full">
      <div className="hotel-card-image-container w-full h-[268px] rounded-[8px] overflow-hidden lg:w-[363px] xl:flex-1">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="hotel-card-image w-full h-full object-cover"
        />
      </div>
      <div className="hotel-card-content w-full border border-[#F0F4F8] rounded-[8px] bg-white p-6 flex flex-col gap-4 lg:w-[457px] xl:flex-1">
        <div className="flex flex-col gap-2">
          <h3 className="hotel-card-title text-xl font-bold text-[#142347] m-0">
            {hotel.name}
          </h3>
          <div className="flex items-center gap-2">
            <div className="hotel-card-stars">
              {Array.from({ length: hotel.stars }).map((_, i) => (
                <Icon key={i} name="Star" size={16} />
              ))}
            </div>
            <span className="hotel-card-location">{hotel.location}</span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-6 flex-1">
          <div className="flex flex-col border-r border-[#F0F4F8] pr-0 md:pr-6 w-full md:w-1/2 justify-between">
            <div className="flex items-center gap-2 text-sm text-[#142347]">
              <Icon name="users" />
              <span>
                {t('HotelCard', 'adults', { count: hotel.adults })} -
                {hotel.children === 1
                  ? ` ${t('HotelCard', 'child', { count: hotel.children })}`
                  : ` ${t('HotelCard', 'children', { count: hotel.children })}`}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#142347]">
              <Icon name="calendar" />
              <span>{hotel.date}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#142347]">
              <Icon name="nights" />
              <span>{t('HotelCard', 'nights', { count: hotel.nights })}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#142347]">
              <Icon name="beds" />
              <span>{hotel.categories.join(', ')}</span>
            </div>
          </div>
          <div className="flex flex-col w-full md:w-1/2 md:pl-6 gap-2 items-stretch md:items-end">
            <div className="hotel-card-price-container mt-auto lg:mt-auto flex flex-col items-end w-full">
              <span className="hotel-card-old-price">{hotel.price + 200}€</span>
              <div className="flex items-baseline gap-2 justify-end">
                <span className="hotel-card-from-price">
                  {t('HotelCard', 'fromPP')}
                </span>
                <span className="hotel-card-price-value">{hotel.price}€</span>
              </div>
            </div>
            <Button onClick={handleContinue} className="hotel-card-book-btn">
              {t('HotelCard', 'continue')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
