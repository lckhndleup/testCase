'use client';

import React, { JSX } from 'react';
import { Flight } from '../../../data/mockData';
import { Button } from 'antd';
import Icon from '../../assets/icons/Icon';
import { useLanguage } from '@/hooks/useLanguage';
import { useRouter } from 'next/navigation';

interface FlightCardProps {
  flight: Flight;
}

const FlightCard = ({ flight }: FlightCardProps): JSX.Element => {
  const { t } = useLanguage();
  const router = useRouter();

  const translateFlightConcept = (concept: string): string => {
    return concept;
  };

  const handleBookNow = () => {
    router.push('/comingsoon');
  };
  return (
    <div className="flight-card-container flex flex-col lg:flex-row items-start gap-2 w-full">
      <div className="flight-card-image-container w-full h-[268px] rounded-[8px] overflow-hidden lg:w-[363px] xl:flex-1">
        <img
          src={flight.image}
          alt={flight.name}
          className="flight-card-image w-full h-full object-cover"
        />
      </div>
      <div className="flight-card-content w-full border border-[#F0F4F8] rounded-[8px] bg-white p-6 flex flex-col gap-4 lg:w-[457px] xl:flex-1">
        <div className="flight-card-header flex flex-col gap-2">
          <h3 className="flight-card-title text-xl font-bold text-[#142347] m-0">
            {flight.name}
          </h3>
          <div className="flight-card-rating-location flex items-center gap-2">
            <div className="flight-card-stars">
              {Array.from({ length: flight.stars }).map((_, i) => (
                <Icon key={i} name="Star" size={16} />
              ))}
            </div>
            <span className="flight-card-location">{flight.location}</span>
          </div>
        </div>
        <div className="flight-card-details flex flex-col md:flex-row gap-6 flex-1">
          <div className="flight-card-details-left flex flex-col border-r border-[#F0F4F8] pr-0 md:pr-6 w-full md:w-1/2 justify-between">
            <div className="flight-card-detail-row flex items-center gap-2 text-sm text-[#142347]">
              <Icon name="users" />
              <span>
                {t('FlightCard', 'adults', { count: flight.adults })} -
                {flight.children === 1
                  ? ` ${t('FlightCard', 'child', { count: flight.children })}`
                  : ` ${t('FlightCard', 'children', { count: flight.children })}`}
              </span>
            </div>
            <div className="flight-card-detail-row flex items-center gap-2 text-sm text-[#142347]">
              <Icon name="calendar" />
              <span>{flight.date}</span>
            </div>
            <div className="flight-card-detail-row flex items-center gap-2 text-sm text-[#142347]">
              <Icon name="nights" />
              <span>
                {flight.nights} {t('FlightCard', 'hours')}
              </span>
            </div>
            <div className="flight-card-detail-row flex items-center gap-2 text-sm text-[#142347]">
              <Icon name="flight" size={16} color="#142347" />
              <span>{translateFlightConcept(flight.concept)}</span>
            </div>
          </div>
          <div className="flight-card-details-right flex flex-col w-full md:w-1/2 md:pl-6 gap-2 items-stretch md:items-end">
            <div className="flight-card-price mt-auto lg:mt-auto flex flex-col items-end w-full">
              <span className="flight-card-old-price">
                {flight.price + 200}€
              </span>
              <div className="flight-card-price-info flex items-baseline gap-2 justify-end">
                <span className="flight-card-from-price">
                  {t('FlightCard', 'fromPrice')}
                </span>
                <span className="flight-card-price-value">{flight.price}€</span>
              </div>
            </div>
            <Button onClick={handleBookNow} className="flight-card-book-btn">
              {t('FlightCard', 'bookNow')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
