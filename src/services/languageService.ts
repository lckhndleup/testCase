import ComingSoon from '@/app/comingsoon/page';

export const LANGUAGES = ['en', 'tr'];

export const translations = {
  en: {
    Header: {
      b2bPlatform: 'B2B platform',
      clientCare: 'Client Care',
      contact: 'Contact',
      favorite: 'Favorite',
      searchPlaceholder: 'Destination or Hotel',
      popularDestinations: 'Popular Destinations',
      topHotels: 'Top Hotels',
      lastMinute: 'Last Minute',
      recommended: 'Recommended',
      charterAntalya: 'Charter Antalya',
      cityBreakIstanbul: 'City Break Istanbul',
      language: 'Language Option',
    },
    TravelTabs: {
      package: 'Package',
      hotel: 'Hotel',
      flight: 'Flight',
    },
    SearchForm: {
      search: 'SEARCH',
      from: 'From',
      destination: 'Destination',
      to: 'To',
      date: 'Date',
      nights: 'Nights',
      nightsCount: '{count} Nights',
      participants: 'Participants',
      people: '{count} People',
    },
    SearchPage: {
      title: 'Search Results',
      noResults: 'No hotels match your search criteria',
      loading: 'Loading...',
    },
    Filters: {
      title: 'Filter',
      from: 'From',
      destination: 'Destination',
      participants: 'Participants',
      date: 'Date',
      nights: 'Nights',
      hotelConcept: 'Hotel Concept',
      flightConcept: 'Flight Concept',
      star: 'Star',
      reset: 'Reset',
      more: 'More',
      less: 'Less',
      people: '{count} People',
    },
    HotelCard: {
      adults: '{count} Adults',
      children: '{count} Children',
      child: '{count} Child',
      nights: '{count} Nights',
      fromPP: 'from PP',
      continue: 'Continue',
    },
    HotelConcepts: {
      beachHotel: 'Beach Hotel',
      adultHotel: 'Adult Hotel',
      boutiqueHotel: 'Boutique Hotel',
      familyHotel: 'Family Hotel',
      petFriendly: 'Pet Friendly',
      spa: 'Spa',
      golf: 'Golf',
      mountainResort: 'Mountain Resort',
    },
    NotFound: {
      title: 'Page Not Found',
      message: "Oops! Looks like you've ventured into uncharted territory.",
      description:
        "The page you're looking for might have been moved, deleted, or never existed.",
      actionButton: 'Back to Homepage',
    },
    DateRangePicker: {
      nights: '{count} Nights',
      flexibleDaysPrefix: '+/- 3 days',
      flexibleDates: 'Flexible Dates',
    },
    PersonPicker: {
      participants: 'Participants',
      adults: 'Number of Adults',
      children: 'Number of Children',
    },
    FlightCard: {
      adults: '{count} Adults',
      children: '{count} Children',
      child: '{count} Child',
      hours: 'Hours',
      fromPrice: 'from',
      bookNow: 'Book Now',
    },
    FlightConcepts: {
      economyClass: 'Economy Class',
      businessClass: 'Business Class',
      firstClass: 'First Class',
      premiumEconomy: 'Premium Economy',
      directFlight: 'Direct Flight',
      oneStop: 'One Stop',
      multipleStops: 'Multiple Stops',
      domestic: 'Domestic',
    },
    ComingSoon: {
      title: 'Coming Soon',
      message: 'We are working on it. Please check back later.',
      button: 'Return Home',
    },
  },
  tr: {
    NotFound: {
      title: 'Sayfa Bulunamadı',
      message: 'Eyvah! Galiba keşfedilmemiş bir bölgeye girdiniz.',
      description:
        'Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.',
      actionButton: 'Ana Sayfaya Dön',
    },
    Header: {
      b2bPlatform: 'B2B platformu',
      clientCare: 'Müşteri Hizmetleri',
      contact: 'İletişim',
      favorite: 'Favoriler',
      searchPlaceholder: 'Destinasyon veya Otel',
      popularDestinations: 'Popüler Destinasyonlar',
      topHotels: 'En İyi Oteller',
      lastMinute: 'Son Dakika',
      recommended: 'Önerilen',
      charterAntalya: 'Antalya Charter',
      cityBreakIstanbul: 'İstanbul Şehir Turu',
      language: 'Dil Seçenekleri',
    },
    TravelTabs: {
      package: 'Paket',
      hotel: 'Otel',
      flight: 'Uçuş',
    },
    SearchForm: {
      search: 'ARA',
      from: 'Nereden',
      destination: 'Hedef',
      to: 'Nereye',
      date: 'Tarih',
      nights: 'Gece',
      nightsCount: '{count} Gece',
      participants: 'Katılımcılar',
      people: '{count} Kişi',
    },
    SearchPage: {
      title: 'Arama Sonuçları',
      noResults: 'Arama kriterlerinize uygun otel bulunamadı',
      loading: 'Yükleniyor...',
    },
    Filters: {
      title: 'Filtre',
      from: 'Nereden',
      destination: 'Hedef',
      participants: 'Katılımcılar',
      date: 'Tarih',
      nights: 'Gece',
      hotelConcept: 'Otel Konsepti',
      flightConcept: 'Uçuş Konsepti',
      star: 'Yıldız',
      reset: 'Sıfırla',
      more: 'Daha fazla',
      less: 'Daha az',
      people: '{count} Kişi',
    },
    HotelCard: {
      adults: '{count} Yetişkin',
      children: '{count} Çocuk',
      child: '{count} Çocuk',
      nights: '{count} Gece',
      fromPP: 'kişi başı',
      continue: 'Devam Et',
    },
    HotelConcepts: {
      beachHotel: 'Plaj Oteli',
      adultHotel: 'Yetişkin Oteli',
      boutiqueHotel: 'Butik Otel',
      familyHotel: 'Aile Oteli',
      petFriendly: 'Evcil Hayvan Dostu',
      spa: 'Spa',
      golf: 'Golf',
      mountainResort: 'Dağ Tesisi',
    },
    DateRangePicker: {
      nights: '{count} Gece',
      flexibleDates: 'Esnek Tarihler',
      plusMinusDays: '+/- 3 gün',
    },
    PersonPicker: {
      participants: 'Katılımcılar',
      adults: 'Yetişkin Sayısı',
      children: 'Çocuk Sayısı',
    },
    FlightCard: {
      adults: '{count} Yetişkin',
      children: '{count} Çocuk',
      child: '{count} Çocuk',
      hours: 'Saat',
      fromPrice: 'itibaren',
      bookNow: 'Rezervasyon Yap',
    },
    FlightConcepts: {
      economyClass: 'Ekonomi Sınıfı',
      businessClass: 'Business Sınıfı',
      firstClass: 'Birinci Sınıf',
      premiumEconomy: 'Premium Ekonomi',
      directFlight: 'Direkt Uçuş',
      oneStop: 'Bir Aktarmalı',
      multipleStops: 'Çok Aktarmalı',
      domestic: 'Yurtiçi',
    },
    ComingSoon: {
      title: 'Yakında Hizmetinizdeyiz',
      message: 'Üzerinde çalışıyoruz. Lütfen daha sonra tekrar deneyiniz.',
      button: 'Ana Sayfaya Dön',
    },
  },
};

export const getCurrentLanguage = (): string => {
  if (typeof window === 'undefined') {
    return 'en';
  }

  const savedLocale = localStorage.getItem('language');
  return savedLocale && LANGUAGES.includes(savedLocale) ? savedLocale : 'en';
};

export const saveLanguage = (locale: string): void => {
  if (LANGUAGES.includes(locale)) {
    localStorage.setItem('language', locale);
  }
};

export const translate = (
  locale: string,
  namespace: string,
  key: string,
  params?: Record<string, any>,
): string => {
  try {
    // @ts-ignore
    let text = translations[locale][namespace][key] || key;
    if (params) {
      Object.keys(params).forEach((paramKey) => {
        text = text.replace(new RegExp(`{${paramKey}}`, 'g'), params[paramKey]);
      });
    }

    return text;
  } catch (error) {
    console.warn(
      `Translation missing: ${namespace}.${key} for locale: ${locale}`,
    );
    return key;
  }
};
