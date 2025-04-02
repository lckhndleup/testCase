import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getCurrentLanguage,
  saveLanguage,
  translate,
} from '@/services/languageService';

interface UseLanguageReturn {
  locale: string;
  setLocale: (locale: string) => void;
  t: (namespace: string, key: string, params?: Record<string, any>) => string;
}

export const LANGUAGE_QUERY_KEY = 'language';

export function useLanguage() {
  const queryClient = useQueryClient();

  const { data: locale = 'en' } = useQuery<string>({
    queryKey: [LANGUAGE_QUERY_KEY],
    queryFn: getCurrentLanguage,
    staleTime: Infinity,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    cacheTime: Infinity,
  });

  const { mutate: setLocale } = useMutation({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    mutationFn: (newLocale: string) => {
      saveLanguage(newLocale);
      return newLocale;
    },
    onSuccess: (newLocale) => {
      queryClient.setQueryData([LANGUAGE_QUERY_KEY], newLocale);
    },
  });

  const t = (
    namespace: string,
    key: string,
    params?: Record<string, any>,
  ): string => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return translate(locale, namespace, key, params);
  };

  return { locale, setLocale, t };
}
