import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getSearchParams,
  saveSearchParams,
  getFilters,
  saveFilters,
  SEARCH_PARAMS_KEY,
  FILTERS_KEY,
} from '@/services/searchService';
import { SearchParams, Filters } from '@/types/search';

export function useSearch() {
  const queryClient = useQueryClient();
  const { data: searchParams = getSearchParams() } = useQuery({
    queryKey: [SEARCH_PARAMS_KEY],
    queryFn: getSearchParams,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const { data: filters = getFilters() } = useQuery({
    queryKey: [FILTERS_KEY],
    queryFn: getFilters,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const { mutate: updateSearchParams } = useMutation({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    mutationFn: (newParams: Partial<SearchParams>) => {
      const updatedParams = { ...searchParams, ...newParams };
      return saveSearchParams(updatedParams);
    },
    onSuccess: (updatedSearchParams) => {
      queryClient.setQueryData([SEARCH_PARAMS_KEY], updatedSearchParams);
      const currentFilters =
        queryClient.getQueryData<Filters>([FILTERS_KEY]) || getFilters();
      const updatedFilters = {
        ...currentFilters,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        from: updatedSearchParams.from || currentFilters.from,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        destination:
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          updatedSearchParams.destination || currentFilters.destination,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        date: updatedSearchParams.date || currentFilters.date,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        nights: updatedSearchParams.nights || currentFilters.nights,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        participants:
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          updatedSearchParams.participants || currentFilters.participants,
      };
      saveFilters(updatedFilters);
      queryClient.setQueryData([FILTERS_KEY], updatedFilters);
    },
  });

  const { mutate: updateFilters } = useMutation({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    mutationFn: (newFilters: Partial<Filters>) => {
      const updatedFilters = { ...filters, ...newFilters };
      return saveFilters(updatedFilters);
    },
    onSuccess: (updatedFilters) => {
      queryClient.setQueryData([FILTERS_KEY], updatedFilters);
    },
  });
  const refreshSearchData = () => {
    queryClient.invalidateQueries({ queryKey: [SEARCH_PARAMS_KEY] });
    queryClient.invalidateQueries({ queryKey: [FILTERS_KEY] });
  };

  return {
    searchParams,
    updateSearchParams,
    filters,
    updateFilters,
    refreshSearchData,
  };
}
