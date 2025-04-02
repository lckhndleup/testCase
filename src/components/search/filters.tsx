'use client';

import React, { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import { useSearch } from '@/hooks/useSearch';
import { Button } from 'antd';
import Icon from '../../assets/icons/Icon';
import { useLanguage } from '@/hooks/useLanguage';
import DateRangePicker from '@/components/DateRangePicker/DateRangePicker';
import PersonPicker from '@/components/PersonPicker/personpicker';
import DestinationDropdown from '@/components/dropdown/DestinationDropdown';
import NightPicker from '@/components/NightPicker/NightPicker';

const baseConcepts = [
  'Beach Hotel',
  'Adult Hotel',
  'Boutique Hotel',
  'Family Hotel',
  'Pet Friendly',
  'Spa',
  'Golf',
  'Mountain Resort',
];

const flightConcepts = [
  'Economy Class',
  'Business Class',
  'First Class',
  'Premium Economy',
  'Direct Flight',
  'One Stop',
  'Multiple Stops',
  'Domestic',
];

const Filters: React.FC = () => {
  const { filters, updateFilters, searchParams } = useSearch();
  const { t } = useLanguage();

  const travelType = searchParams.travelType || 'package';

  const [from, setFrom] = useState<string>(
    filters.from || searchParams.from || '',
  );
  const [destination, setDestination] = useState<string>(
    filters.destination || searchParams.destination || '',
  );

  const [adults, setAdults] = useState<number>(
    filters.participants?.adults || searchParams.participants?.adults || 2,
  );
  const [children, setChildren] = useState<number>(
    filters.participants?.children || searchParams.participants?.children || 0,
  );
  const [people, setPeople] = useState<number>(adults + children);

  const [nights, setNights] = useState<number>(
    filters.nights || searchParams.nights || 5,
  );

  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(() => {
    if (filters.date) return dayjs(filters.date);
    if (searchParams.date) return dayjs(searchParams.date);
    return null;
  });

  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(() => {
    if (startDate) return startDate.add(nights, 'day');
    return null;
  });

  const [stars, setStars] = useState<number[]>(filters.stars || []);
  const [concepts, setConcepts] = useState<string[]>(
    filters.hotelConcepts || [],
  );
  const [flightConceptsSelected, setFlightConceptsSelected] = useState<
    string[]
  >(filters.flightConcepts || []);

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const dateFieldRef = useRef<HTMLDivElement>(
    null,
  ) as React.RefObject<HTMLDivElement>;

  const [showPersonPicker, setShowPersonPicker] = useState<boolean>(false);
  const peopleFieldRef = useRef<HTMLDivElement>(
    null,
  ) as React.RefObject<HTMLDivElement>;

  const [showNightPicker, setShowNightPicker] = useState<boolean>(false);
  const nightsFieldRef = useRef<HTMLDivElement>(
    null,
  ) as React.RefObject<HTMLDivElement>;

  const [showMore, setShowMore] = useState<boolean>(false);
  const [showMoreFlight, setShowMoreFlight] = useState<boolean>(false);

  useEffect(() => {
    const syncWithSearchParams = async () => {
      if (typeof window !== 'undefined') {
        updateFilters({
          from: searchParams.from || '',
          destination: searchParams.destination || '',
          date: searchParams.date || '',
          nights: searchParams.nights || 5,
          participants: searchParams.participants || { adults: 2, children: 0 },
        });
      }
    };

    syncWithSearchParams();
  }, []);

  useEffect(() => {
    if (filters) {
      setFrom(filters.from || '');
      setDestination(filters.destination || '');

      const newAdults = filters.participants?.adults || 2;
      const newChildren = filters.participants?.children || 0;
      setAdults(newAdults);
      setChildren(newChildren);
      setPeople(newAdults + newChildren);

      const newNights = filters.nights || 5;
      setNights(newNights);

      const newStartDate = filters.date ? dayjs(filters.date) : null;
      setStartDate(newStartDate);

      if (newStartDate) {
        setEndDate(newStartDate.add(newNights, 'day'));
      } else {
        setEndDate(null);
      }

      setStars(filters.stars || []);
      setConcepts(filters.hotelConcepts || []);
      setFlightConceptsSelected(filters.flightConcepts || []);
    }
  }, [filters]);

  const resetFilters = () => {
    setFrom('');
    setDestination('');
    setAdults(2);
    setChildren(0);
    setPeople(2);
    setStartDate(null);
    setEndDate(null);
    setNights(5);
    setStars([]);
    setConcepts([]);
    setFlightConceptsSelected([]);
    setShowMore(false);
    setShowMoreFlight(false);

    updateFilters({
      from: '',
      destination: '',
      participants: { adults: 2, children: 0 },
      date: '',
      nights: 5,
      hotelConcepts: [],
      flightConcepts: [],
      stars: [],
    });
  };

  const handleFromChange = (val: string) => {
    setFrom(val);
    updateFilters({ from: val });
  };

  const handleDestinationChange = (val: string) => {
    setDestination(val);
    updateFilters({ destination: val });
  };

  const handlePersonChange = (newAdults: number, newChildren: number) => {
    setAdults(newAdults);
    setChildren(newChildren);
    setPeople(newAdults + newChildren);
    updateFilters({
      participants: { adults: newAdults, children: newChildren },
    });
  };

  const handlePersonPickerClose = () => {
    setShowPersonPicker(false);
  };

  const handleDateChange = (start: dayjs.Dayjs, end: dayjs.Dayjs) => {
    setStartDate(start);
    setEndDate(end);
    const nightCount = end.diff(start, 'day');
    setNights(nightCount);
    updateFilters({ date: start.format('YYYY-MM-DD'), nights: nightCount });
  };

  const handleDatePickerClose = () => {
    setShowDatePicker(false);
  };

  const handleNightChange = (val: number) => {
    setNights(val);
    if (startDate) {
      setEndDate(startDate.add(val, 'day'));
    }
    updateFilters({ nights: val });
  };

  const handleNightPickerClose = () => {
    setShowNightPicker(false);
  };

  const handleStarClick = (starValue: number) => {
    let newStars: number[];
    if (stars.includes(starValue)) {
      newStars = stars.filter((s) => s !== starValue);
    } else {
      newStars = [...stars, starValue];
    }
    setStars(newStars);
    updateFilters({ stars: newStars });
  };

  const handleConceptChange = (concept: string) => {
    let newConcepts: string[];
    if (concepts.includes(concept)) {
      newConcepts = concepts.filter((c) => c !== concept);
    } else {
      newConcepts = [...concepts, concept];
    }
    setConcepts(newConcepts);
    updateFilters({ hotelConcepts: newConcepts });
  };

  const handleFlightConceptChange = (concept: string) => {
    let newConcepts: string[];
    if (flightConceptsSelected.includes(concept)) {
      newConcepts = flightConceptsSelected.filter((c) => c !== concept);
    } else {
      newConcepts = [...flightConceptsSelected, concept];
    }
    setFlightConceptsSelected(newConcepts);
    updateFilters({ flightConcepts: newConcepts });
  };

  const visibleConcepts = showMore ? baseConcepts : baseConcepts.slice(0, 5);
  const visibleFlightConcepts = showMoreFlight
    ? flightConcepts
    : flightConcepts.slice(0, 5);

  const translateConcept = (concept: string): string => {
    const key = concept
      .replace(/\s+/g, '')
      .replace(/(?:^|\s)(\w)/g, (match, p1) => p1.toLowerCase());
    return t('HotelConcepts', key);
  };

  const translateFlightConcept = (concept: string): string => {
    const key = concept
      .replace(/\s+/g, '')
      .replace(/(?:^|\s)(\w)/g, (match, p1) => p1.toLowerCase());
    return t('FlightConcepts', key);
  };

  return (
    <div className="filters-container">
      <div className="filters-group">
        <h3 className="filters-title">{t('Filters', 'title')}</h3>

        {(travelType === 'package' || travelType === 'flight') && (
          <div className="filters-input-wrapper">
            <div className="filters-input-field">
              <div className="filters-icon-container">
                <Icon name="location" size={16} color="#142347" />
              </div>
              <DestinationDropdown
                value={from}
                onChange={handleFromChange}
                onSelect={handleFromChange}
                placeholder={t('Filters', 'from')}
                mode="city"
                className="h-full rounded-md text-[#142347] placeholder:text-[#142347] w-full border-none focus:outline-none"
              />
            </div>
          </div>
        )}

        <div>
          <div className="filters-input-field">
            <div className="filters-icon-container">
              <Icon name="location" size={16} color="#142347" />
            </div>
            <DestinationDropdown
              value={destination}
              onChange={handleDestinationChange}
              onSelect={handleDestinationChange}
              placeholder={t('Filters', 'destination')}
              mode={travelType === 'hotel' ? 'hotel' : 'city'}
              className="h-full rounded-md text-[#142347] placeholder:text-[#142347] w-full border-none focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="filters-group">
        <label className="filters-label">{t('Filters', 'participants')}</label>
        <div
          ref={peopleFieldRef}
          className="filters-input-field filters-clickable"
          onClick={() => setShowPersonPicker(true)}
        >
          <div className="filters-icon-container">
            <Icon name="users" size={16} color="#142347" />
          </div>
          <div className="filters-flex-container filters-field-text">
            {t('Filters', 'people', { count: people })}
          </div>
        </div>

        {typeof window !== 'undefined' && showPersonPicker && (
          <PersonPicker
            adults={adults}
            children={children}
            onChange={handlePersonChange}
            onClose={handlePersonPickerClose}
            visible={showPersonPicker}
            triggerRef={peopleFieldRef}
          />
        )}
      </div>

      <div className="filters-group">
        <label className="filters-label">{t('Filters', 'date')}</label>
        <div
          ref={dateFieldRef}
          className="filters-input-field filters-clickable"
          onClick={() => setShowDatePicker(true)}
        >
          <div className="filters-icon-container">
            <Icon name="calendar" size={16} color="#142347" />
          </div>
          <div className="filters-flex-container filters-field-text">
            {startDate ? (
              <span>{startDate.format('DD MMM YYYY')}</span>
            ) : (
              <span className="text-gray-400">{t('Filters', 'date')}</span>
            )}
          </div>
        </div>

        {typeof window !== 'undefined' && showDatePicker && (
          <DateRangePicker
            startDate={startDate || undefined}
            endDate={endDate || undefined}
            onChange={handleDateChange}
            onClose={handleDatePickerClose}
            visible={showDatePicker}
            triggerRef={dateFieldRef}
          />
        )}
      </div>

      {(travelType === 'package' || travelType === 'hotel') && (
        <div className="filters-group">
          <label className="filters-label">{t('Filters', 'nights')}</label>
          <div
            ref={nightsFieldRef}
            className="filters-input-field filters-clickable"
            onClick={() => setShowNightPicker(true)}
          >
            <div className="filters-icon-container">
              <Icon name="nights" size={16} color="#142347" />
            </div>
            <div className="filters-flex-container filters-field-text">
              {t('HotelCard', 'nights', { count: nights })}
            </div>
          </div>

          {typeof window !== 'undefined' && showNightPicker && (
            <NightPicker
              nights={nights}
              onChange={handleNightChange}
              onClose={handleNightPickerClose}
              visible={showNightPicker}
              triggerRef={nightsFieldRef}
            />
          )}
        </div>
      )}

      {(travelType === 'package' || travelType === 'hotel') && (
        <div className="filters-group">
          <div className="filters-group-header">
            <label className="filters-concept-header-label">
              {t('Filters', 'hotelConcept')}
            </label>
            <Button
              type="link"
              size="small"
              onClick={resetFilters}
              className="filters-reset-button"
            >
              {t('Filters', 'reset')}
            </Button>
          </div>
          <div
            className={`filters-section ${showMore ? 'expanded' : 'collapsed'}`}
          >
            {visibleConcepts.map((concept) => {
              const isChecked = concepts.includes(concept);
              return (
                <label key={concept} className="filters-concept-label">
                  <div className="filters-concept-container">
                    <span
                      className={`filters-checkbox-box ${
                        isChecked ? 'active' : 'inactive'
                      }`}
                    >
                      {isChecked && (
                        <Icon name="thick" className="filters-checkbox-check" />
                      )}
                    </span>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleConceptChange(concept)}
                      className="hidden"
                    />
                    <span className="filters-field-text">
                      {translateConcept(concept)}
                    </span>
                  </div>
                </label>
              );
            })}
            {baseConcepts.length > 5 && (
              <div
                className="filters-more-container"
                onClick={() => setShowMore(!showMore)}
              >
                <Icon
                  name="arrow-down"
                  size={16}
                  color="#93A2B7"
                  className={`filters-more-icon ${
                    showMore ? 'transform rotate-180' : ''
                  }`}
                />
                <span className="filters-more-text">
                  {showMore ? t('Filters', 'less') : t('Filters', 'more')}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {travelType === 'flight' && (
        <div className="filters-group">
          <div className="filters-group-header">
            <label className="filters-concept-header-label">
              {t('Filters', 'flightConcept')}
            </label>
            <Button
              type="link"
              size="small"
              onClick={resetFilters}
              className="filters-reset-button"
            >
              {t('Filters', 'reset')}
            </Button>
          </div>
          <div
            className={`filters-section ${
              showMoreFlight ? 'expanded' : 'collapsed'
            }`}
          >
            {visibleFlightConcepts.map((concept) => {
              const isChecked = flightConceptsSelected.includes(concept);
              return (
                <label key={concept} className="filters-concept-label">
                  <div className="filters-concept-container">
                    <span
                      className={`filters-checkbox-box ${
                        isChecked ? 'active' : 'inactive'
                      }`}
                    >
                      {isChecked && (
                        <Icon name="thick" className="filters-checkbox-check" />
                      )}
                    </span>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleFlightConceptChange(concept)}
                      className="hidden"
                    />
                    <span className="filters-field-text">
                      {translateFlightConcept(concept)}
                    </span>
                  </div>
                </label>
              );
            })}
            {flightConcepts.length > 5 && (
              <div
                className="filters-more-container"
                onClick={() => setShowMoreFlight(!showMoreFlight)}
              >
                <Icon
                  name="arrow-down"
                  size={16}
                  color="#93A2B7"
                  className={`filters-more-icon ${
                    showMoreFlight ? 'transform rotate-180' : ''
                  }`}
                />
                <span className="filters-more-text">
                  {showMoreFlight ? t('Filters', 'less') : t('Filters', 'more')}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="filters-last-group">
        <label className="filters-label">{t('Filters', 'star')}</label>
        <div className="filters-star-container">
          {[1, 2, 3, 4, 5].map((starValue) => {
            const isActive = stars.includes(starValue);
            return (
              <div
                key={starValue}
                className="filters-star-row"
                onClick={() => handleStarClick(starValue)}
              >
                <div
                  className={`filters-radio-button ${
                    isActive ? 'active' : 'inactive'
                  }`}
                >
                  {isActive && <div className="filters-radio-inner" />}
                </div>
                <div className="filters-star-text-container">
                  <div className="filters-star-icon">
                    <Icon name="Star" size={16} color="#ED8936" />
                  </div>
                  <span className="filters-field-text">{starValue}+</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Filters;
