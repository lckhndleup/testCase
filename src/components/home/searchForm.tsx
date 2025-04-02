'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from 'antd';
import dayjs from 'dayjs';
import { useSearch } from '@/hooks/useSearch';
import DestinationDropdown from '../dropdown/DestinationDropdown';
import DateRangePicker from '../DateRangePicker/DateRangePicker';
import PersonPicker from '../PersonPicker/personpicker';
import NightPicker from '@/components/NightPicker/NightPicker';
import Icon from '../../assets/icons/Icon';
import { useLanguage } from '@/hooks/useLanguage';

interface SearchParams {
  from?: string;
  destination?: string;
  date?: string;
  nights?: number;
  participants?: {
    adults: number;
    children: number;
  };
  travelType?: 'hotel' | 'flight' | 'package';
}

const SearchForm = () => {
  const router = useRouter();
  const { searchParams, updateSearchParams } = useSearch() as {
    searchParams: SearchParams;
    updateSearchParams: (params: Partial<SearchParams>) => void;
  };
  const { t } = useLanguage();
  const formRef = useRef<HTMLDivElement>(null);
  const dateFieldRef = useRef<HTMLDivElement>(null);
  const participantsRef = useRef<HTMLDivElement>(null);
  const nightsFieldRef = useRef<HTMLDivElement>(null);
  const [fromLocation, setFromLocation] = useState(searchParams.from || '');
  const [destination, setDestination] = useState(
    searchParams.destination || '',
  );
  const [date, setDate] = useState(
    searchParams.date ? dayjs(searchParams.date) : dayjs('2023-04-15'),
  );
  const [endDate, setEndDate] = useState(
    date.add(searchParams.nights || 5, 'day'),
  );
  const [nights, setNights] = useState(searchParams.nights || 5);
  const [adults, setAdults] = useState(searchParams.participants?.adults ?? 2);
  const [children, setChildren] = useState(
    searchParams.participants?.children ?? 0,
  );
  const people = adults + children;
  const [isClient, setIsClient] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showPersonPicker, setShowPersonPicker] = useState(false);
  const [showNightPicker, setShowNightPicker] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      updateSearchParams({
        from: '',
        destination: '',
        date: dayjs('2023-04-15').format('YYYY-MM-DD'),
        nights: 5,
        participants: { adults: 1, children: 0 },
      });
      setAdults(1);
      setChildren(0);
    }
  }, [isClient, updateSearchParams]);

  const handleSearch = (e: React.MouseEvent) => {
    e.preventDefault();

    updateSearchParams({
      from: fromLocation,
      destination,
      date: date.format('YYYY-MM-DD'),
      nights,
      participants: { adults, children },
    });

    setTimeout(() => {
      router.push('/search');
    }, 150);
  };

  const handleDateClick = () => {
    setShowDatePicker((prev) => !prev);
  };

  const handleParticipantsClick = () => {
    setShowPersonPicker((prev) => !prev);
  };

  const handleNightsClick = () => {
    setShowNightPicker((prev) => !prev);
  };

  const handleDateChange = (start: dayjs.Dayjs, end: dayjs.Dayjs) => {
    if (dayjs.isDayjs(start) && dayjs.isDayjs(end)) {
      setDate(start);
      setEndDate(end);
      const nightsCount = end.diff(start, 'day');
      setNights(nightsCount);

      updateSearchParams({
        date: start.format('YYYY-MM-DD'),
        nights: nightsCount,
      });
    }
  };

  const handlePersonChange = (newAdults: number, newChildren: number) => {
    setAdults(newAdults);
    setChildren(newChildren);

    updateSearchParams({
      participants: { adults: newAdults, children: newChildren },
    });
  };

  const handleNightChange = (val: number) => {
    setNights(val);
    if (date) {
      setEndDate(date.add(val, 'day'));
    }
    updateSearchParams({ nights: val });
  };

  const handleFromChange = (value: string) => {
    setFromLocation(value);
    updateSearchParams({ from: value });
  };

  const handleDestinationChange = (value: string) => {
    setDestination(value);
    updateSearchParams({ destination: value });
  };

  const travelType = searchParams.travelType || 'package';

  const renderPackageForm = () => (
    <>
      <div className="flex items-center search-form-field-from">
        <div>
          <Icon name="location" size={24} />
        </div>
        <div className="flex flex-col w-full">
          <DestinationDropdown
            value={fromLocation}
            onChange={handleFromChange}
            onSelect={handleFromChange}
            placeholder={t('SearchForm', 'from')}
            mode="city"
            className="w-full font-medium bg-transparent focus:outline-none search-form-dropdown"
          />
        </div>
      </div>
      <div className="flex items-center search-form-field-destination">
        <div>
          <Icon name="search" size={24} />
        </div>
        <div className="flex flex-col w-full">
          <DestinationDropdown
            value={destination}
            onChange={handleDestinationChange}
            onSelect={handleDestinationChange}
            placeholder={t('SearchForm', 'destination')}
            mode="city"
            className="w-full font-medium bg-transparent focus:outline-none search-form-dropdown"
          />
        </div>
      </div>
      <div
        ref={dateFieldRef}
        className="flex items-center relative cursor-pointer search-form-field-date"
        onClick={handleDateClick}
      >
        <div>
          <Icon name="calendar" size={24} />
        </div>
        <div className="flex flex-col w-full pl-2">
          <div className="field-label">{t('SearchForm', 'date')}</div>
          <div className="field-value cursor-pointer">
            {date.format('D MMM')}
          </div>
        </div>
      </div>
      <div
        ref={nightsFieldRef}
        className="flex items-center cursor-pointer search-form-field-nights"
        onClick={handleNightsClick}
      >
        <div>
          <Icon name="nights" size={24} />
        </div>
        <div className="flex flex-col w-full pl-2">
          <div className="field-label">{t('SearchForm', 'nights')}</div>
          <div className="field-value">
            {t('SearchForm', 'nightsCount', { count: nights })}
          </div>
        </div>
      </div>
      <div
        ref={participantsRef}
        className="flex items-center cursor-pointer search-form-field-participants"
        onClick={handleParticipantsClick}
      >
        <div>
          <Icon name="users" size={24} />
        </div>
        <div className="flex flex-col w-full pl-2">
          <div className="field-label">{t('SearchForm', 'participants')}</div>
          <div className="field-value">
            {t('SearchForm', 'people', { count: people })}
          </div>
        </div>
      </div>
    </>
  );

  const renderHotelForm = () => (
    <>
      <div className="flex items-center relative cursor-pointer hotel-form-field-destination">
        <div className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10">
          <Icon name="location" size={24} />
        </div>
        <div className="flex-1 pl-8">
          <DestinationDropdown
            value={destination}
            onChange={handleDestinationChange}
            onSelect={handleDestinationChange}
            placeholder={t('SearchForm', 'destination')}
            className="font-medium bg-transparent focus:outline-none border-none p-0 search-form-dropdown"
          />
        </div>
      </div>

      <div
        ref={dateFieldRef}
        className="flex items-center relative cursor-pointer hotel-form-field-date"
        onClick={handleDateClick}
      >
        <div>
          <Icon name="calendar" size={24} />
        </div>
        <div className="flex flex-col w-full pl-2 cursor-pointer">
          <div className="field-label">{t('SearchForm', 'date')}</div>
          <div className="field-value">
            {date.format('D MMM')} -{' '}
            {t('SearchForm', 'nightsCount', { count: nights })}
          </div>
        </div>
      </div>

      <div
        ref={participantsRef}
        className="flex items-center cursor-pointer hotel-form-field-participants"
        onClick={handleParticipantsClick}
      >
        <div className="cursor-pointer">
          <Icon name="users" size={24} />
        </div>
        <div className="flex flex-col w-full pl-2">
          <div className="field-label">{t('SearchForm', 'participants')}</div>
          <div className="field-value">
            {t('SearchForm', 'people', { count: people })}
          </div>
        </div>
      </div>
    </>
  );

  const renderFlightForm = () => (
    <>
      <div className="flex items-center search-form-field-from">
        <div>
          <Icon name="location" size={24} />
        </div>
        <div className="flex flex-col w-full">
          <DestinationDropdown
            value={fromLocation}
            onChange={handleFromChange}
            onSelect={handleFromChange}
            placeholder={t('SearchForm', 'from')}
            mode="city"
            className="w-full font-medium bg-transparent focus:outline-none search-form-dropdown"
          />
        </div>
      </div>
      <div className="flex items-center search-form-field-destination">
        <div>
          <Icon name="location" size={24} />
        </div>
        <div className="flex flex-col w-full">
          <DestinationDropdown
            value={destination}
            onChange={handleDestinationChange}
            onSelect={handleDestinationChange}
            placeholder={t('SearchForm', 'to')}
            mode="city"
            className="w-full font-medium bg-transparent focus:outline-none search-form-dropdown"
          />
        </div>
      </div>
      <div
        ref={dateFieldRef}
        className="flex items-center relative cursor-pointer flight-form-field-date"
        onClick={handleDateClick}
      >
        <div className="cursor-pointer">
          <Icon name="calendar" size={24} />
        </div>
        <div className="flex flex-col w-full pl-2 cursor-pointer">
          <div className="field-label">{t('SearchForm', 'date')}</div>
          <div className="field-value">
            {date.format('D MMM')} - {endDate.format('D MMM')}
          </div>
        </div>
      </div>
      <div
        ref={participantsRef}
        className="flex items-center cursor-pointer search-form-field-participants"
        onClick={handleParticipantsClick}
      >
        <div className="cursor-pointer">
          <Icon name="users" size={24} />
        </div>
        <div className="flex flex-col w-full pl-2 cursor-pointer">
          <div className="field-label">{t('SearchForm', 'participants')}</div>
          <div className="field-value">
            {t('SearchForm', 'people', { count: people })}
          </div>
        </div>
      </div>
    </>
  );
  const renderFormContent = () => {
    switch (travelType) {
      case 'hotel':
        return renderHotelForm();
      case 'flight':
        return renderFlightForm();
      case 'package':
      default:
        return renderPackageForm();
    }
  };

  return (
    <div
      ref={formRef}
      className="flex items-center justify-between bg-white/16 backdrop-blur-sm rounded-lg shadow-lg w-full search-form-container"
      data-travel-type={searchParams.travelType || 'package'}
    >
      <div className="flex items-center justify-between bg-white rounded-lg relative search-form-inner">
        {renderFormContent()}
      </div>

      <Button
        type="primary"
        onClick={handleSearch}
        className="h-full border-0 hover:bg-[#d88630] text-white font-bold uppercase flex items-center justify-center search-form-button"
      >
        {t('SearchForm', 'search')}
      </Button>
      {typeof window !== 'undefined' && showDatePicker && (
        <DateRangePicker
          startDate={date}
          endDate={endDate}
          onChange={handleDateChange}
          onClose={() => setShowDatePicker(false)}
          visible={showDatePicker}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          triggerRef={dateFieldRef}
        />
      )}
      {typeof window !== 'undefined' && showPersonPicker && (
        <PersonPicker
          adults={adults}
          children={children}
          onChange={handlePersonChange}
          onClose={() => setShowPersonPicker(false)}
          visible={showPersonPicker}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          triggerRef={participantsRef}
        />
      )}
      {typeof window !== 'undefined' && showNightPicker && (
        <NightPicker
          nights={nights}
          onChange={handleNightChange}
          onClose={() => setShowNightPicker(false)}
          visible={showNightPicker}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          triggerRef={nightsFieldRef}
        />
      )}
    </div>
  );
};

export default SearchForm;
