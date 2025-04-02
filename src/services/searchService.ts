import { SearchParams, Filters } from '@/types/search';

export const SEARCH_PARAMS_KEY = 'searchParams';
export const FILTERS_KEY = 'filters';

const DEFAULT_SEARCH_PARAMS: SearchParams = {
  from: '',
  destination: '',
  date: '',
  nights: 5,
  participants: {
    adults: 2,
    children: 0,
  },
  travelType: 'package',
};

const DEFAULT_FILTERS: Filters = {
  from: '',
  destination: '',
  participants: {
    adults: 2,
    children: 0,
  },
  date: '',
  nights: 5,
  hotelConcepts: [],
  flightConcepts: [],
  stars: [],
};

export const getSearchParams = (): SearchParams => {
  if (typeof window === 'undefined') {
    return DEFAULT_SEARCH_PARAMS;
  }

  try {
    const saved = localStorage.getItem(SEARCH_PARAMS_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_SEARCH_PARAMS;
  } catch (error) {
    console.error('Error retrieving search params from localStorage:', error);
    return DEFAULT_SEARCH_PARAMS;
  }
};

export const saveSearchParams = (searchParams: SearchParams): SearchParams => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(SEARCH_PARAMS_KEY, JSON.stringify(searchParams));
  }
  return searchParams;
};

export const getFilters = (): Filters => {
  if (typeof window === 'undefined') {
    return DEFAULT_FILTERS;
  }

  try {
    const saved = localStorage.getItem(FILTERS_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_FILTERS;
  } catch (error) {
    console.error('Error retrieving filters from localStorage:', error);
    return DEFAULT_FILTERS;
  }
};

export const saveFilters = (filters: Filters): Filters => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(FILTERS_KEY, JSON.stringify(filters));
  }
  return filters;
};
