'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  popularDestinations,
  destinations,
  hotels,
} from '../../../data/mockData';

interface DestinationDropdownProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (value: string) => void;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
  mode?: 'hotel' | 'city';
}

const getUniqueLocations = () => {
  const hotelLocations = hotels.map((hotel) => {
    const location = hotel.location.split(',')[0].trim();
    return {
      name: `${location} Otelleri`,
      subtext: `${location}, Türkiye`,
      type: 'hotel',
    };
  });

  const destinationsList = [...destinations].map((dest) => ({
    name: `${dest}`,
    subtext: `${dest}, Türkiye`,
    type: 'destination',
  }));

  const allLocations = [...hotelLocations, ...destinationsList];

  const uniqueLocations = Array.from(
    new Map(allLocations.map((item) => [item.name, item])).values(),
  );

  return uniqueLocations;
};

const getCityOptions = () => {
  return destinations.map((city) => ({
    name: city,
    subtext: `${city}, Türkiye`,
    type: 'city',
  }));
};

const DestinationDropdown: React.FC<DestinationDropdownProps> = ({
  value,
  onChange,
  onSelect,
  placeholder = 'Destination',
  className = '',
  style = {},
  mode = 'hotel',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLocations, setFilteredLocations] = useState<
    { name: string; subtext: string; type: string }[]
  >([]);
  const [popularLocations, setPopularLocations] = useState<any[]>([]);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mode === 'city') {
      const popularLocs = popularDestinations.map((dest) => ({
        name: dest,
        subtext: `${dest}, Türkiye`,
        type: 'city',
      }));
      setPopularLocations(popularLocs);
    } else {
      const popularLocs = popularDestinations.map((dest) => ({
        name: dest,
        subtext: `${dest}, Türkiye`,
        type: 'popular',
      }));
      setPopularLocations(popularLocs);
    }
  }, [mode]);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredLocations([]);
    } else {
      if (mode === 'city') {
        const allCities = getCityOptions();
        const filtered = allCities.filter(
          (city) =>
            city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            city.subtext.toLowerCase().includes(searchTerm.toLowerCase()),
        );
        setFilteredLocations(filtered);
      } else {
        const allLocations = getUniqueLocations();
        if (searchTerm.toLowerCase().includes('antalya')) {
        }
        const filtered = allLocations.filter(
          (location) =>
            location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            location.subtext.toLowerCase().includes(searchTerm.toLowerCase()),
        );
        setFilteredLocations(filtered);
      }
    }
  }, [searchTerm, mode]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node | null) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node | null)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (dropdownRef.current) {
      dropdownRef.current.style.setProperty(
        '--dropdown-top',
        `${dropdownPosition.top}px`,
      );
      dropdownRef.current.style.setProperty(
        '--dropdown-left',
        `${dropdownPosition.left}px`,
      );
    }
  }, [dropdownPosition, isOpen]);

  const handleInputChange = (e: { target: { value: any } }) => {
    const value = e.target.value;
    setSearchTerm(value);
    onChange(value);
  };

  const handleItemClick = (location: {
    name: any;
    subtext?: string;
    type?: string;
  }) => {
    if (inputRef.current) {
      inputRef.current.value = location.name;
      onChange(location.name);
      onSelect(location.name);
      setSearchTerm(location.name);
    }
    setIsOpen(false);
  };

  let dropdownElement = null;
  if (isOpen && typeof document !== 'undefined') {
    dropdownElement = createPortal(
      <div
        ref={dropdownRef}
        className="fixed bg-white border border-gray-200 rounded-md shadow-lg overflow-y-auto z-50 destinationDropdownContainer"
      >
        <div className="flex justify-between items-center border-b border-gray-200 px-3 py-2">
          <span className="text-sm font-medium">
            {searchTerm === ''
              ? mode === 'city'
                ? 'Popüler şehirler'
                : 'Popüler tatil noktaları'
              : 'Sonuçlar'}
          </span>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18"
                stroke="#333"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M6 6L18 18"
                stroke="#333"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <div>
          {searchTerm === '' ? (
            popularLocations.slice(0, 5).map((location, index) => (
              <div
                key={`popular-${index}`}
                className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleItemClick(location)}
              >
                <div className="mr-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                      stroke="#142347"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 22C16 18 20 14.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 14.4183 8 18 12 22Z"
                      stroke="#142347"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-900 font-medium">
                    {location.name}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {location.subtext}
                  </span>
                </div>
              </div>
            ))
          ) : filteredLocations.length > 0 ? (
            filteredLocations.slice(0, 5).map((location, index) => (
              <div
                key={`filter-${index}`}
                className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleItemClick(location)}
              >
                <div className="mr-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                      stroke="#142347"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 22C16 18 20 14.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 14.4183 8 18 12 22Z"
                      stroke="#142347"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-900 font-medium">
                    {location.name}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {location.subtext}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500">Sonuç bulunamadı</div>
          )}
        </div>
      </div>,
      document.body,
    );
  }

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        defaultValue={value}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        onClick={() => setIsOpen(true)}
        placeholder={placeholder}
        className={`w-full p-2 focus:outline-none ${className}`}
        style={{ ...style }}
      />
      {dropdownElement}
    </div>
  );
};

export default DestinationDropdown;
