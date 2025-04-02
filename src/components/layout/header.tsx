'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icon from '../../assets/icons/Icon';
import { useLanguage } from '@/hooks/useLanguage';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { locale, setLocale, t } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleLanguageMenu = () => {
    setShowLanguageMenu(!showLanguageMenu);
  };

  const changeLanguage = (lang: string) => {
    setLocale(lang);
    setShowLanguageMenu(false);
  };

  const handleAddFavorite = () => {
    const url = window.location.href;
    const title = document.title;
    try {
      interface IEExternal {
        AddFavorite?: (url: string, title: string) => void;
      }
      const external = window.external as IEExternal;
      if (external && typeof external.AddFavorite === 'function') {
        external.AddFavorite(url, title);
      } else {
        alert(
          'Tarayıcınız otomatik yer imlerine eklemeyi desteklemiyor. Lütfen Ctrl+D (Mac: Cmd+D) tuş kombinasyonunu kullanın.',
        );
      }
    } catch (error) {
      alert(
        'Tarayıcınız yer imlerine eklemeyi desteklemiyor. Lütfen manuel olarak ekleyin.',
      );
    }
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleRouteChange = () => {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        document.body.style.overflow = '';
      }
    };
    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [isMobileMenuOpen]);

  const LanguageSelector = ({
    className = '',
    isMobileView = false,
  }: {
    className?: string;
    isMobileView?: boolean;
  }) => (
    <div className={`relative ${className}`}>
      <button
        onClick={toggleLanguageMenu}
        className="flex items-center cursor-pointer language-selector-btn"
      >
        <div className="flag-icon">
          {locale === 'tr' ? <Icon name="Turkey" /> : <Icon name="England" />}
        </div>
        <div className="hidden md:flex items-center justify-center language-code-container">
          <span className="language-code-text">
            {typeof locale === 'string'
              ? locale.toUpperCase()
              : String(locale).toUpperCase()}
          </span>
        </div>
        <div className="hidden md:flex items-center justify-center arrow-icon-container">
          <Icon name="arrow-downSmall" />
        </div>
      </button>
      {showLanguageMenu && (
        <div
          className={`absolute bg-white rounded-md shadow-lg z-50 ${
            isMobileView ? 'language-menu-mobile' : 'language-menu-desktop'
          }`}
        >
          <button
            onClick={() => changeLanguage('en')}
            className={`flex items-center w-full px-4 py-2 text-xs ${
              locale === 'en' ? 'bg-gray-100' : ''
            } hover:bg-gray-50`}
          >
            <div className="flex items-center justify-center mr-2 cursor-pointer">
              <Icon name="England" />
            </div>
            <span className="cursor-pointer">English</span>
          </button>
          <button
            onClick={() => changeLanguage('tr')}
            className={`flex items-center w-full px-4 py-2 text-xs ${
              locale === 'tr' ? 'bg-gray-100' : ''
            } hover:bg-gray-50`}
          >
            <div className="flex items-center justify-center mr-2 cursor-pointer">
              <Icon name="Turkey" />
            </div>
            <span className="cursor-pointer">Türkçe</span>
          </button>
        </div>
      )}
    </div>
  );

  return (
    <header className="w-full">
      <div className="hidden md:block header-top-bar">
        <div className="header-top-inner flex justify-end items-center">
          <div className="flex items-center">
            <Link
              href="/comingsoon"
              className="header-top-link text-[#142347] hover:text-[#0057b8]"
            >
              {t('Header', 'b2bPlatform')}
            </Link>
            <Link
              href="/comingsoon"
              className="header-top-link text-[#142347] hover:text-[#0057b8]"
            >
              {t('Header', 'clientCare')}
            </Link>
            <Link
              href="/comingsoon"
              className="header-top-link text-[#142347] hover:text-[#0057b8]"
            >
              {t('Header', 'contact')}
            </Link>
            <div className="flex items-center header-phone">
              <span className="flex items-center mr-1">
                <Icon name="phone" />
              </span>
              <a
                href="tel:+40212101717"
                className="flex items-center text-[#142347]"
              >
                <span className="text-xs">+4021 210 17 17</span>
              </a>
            </div>
            <div
              onClick={handleAddFavorite}
              className="flex items-center header-favorite cursor-pointer"
            >
              <span className="flex items-center mr-1">
                <Icon name="favorite" />
              </span>
              <span className="text-xs">{t('Header', 'favorite')}</span>
            </div>
            <div className="relative header-search-container">
              <div className="header-search-icon">
                <Icon name="searchSm" />
              </div>
              <input
                type="text"
                placeholder={t('Header', 'searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="header-search-input text-xs"
              />
            </div>
            <LanguageSelector />
          </div>
        </div>
      </div>
      <div className="header-nav-container">
        <div className="header-nav-inner flex justify-between items-center relative">
          <div className="flex items-center header-logo-container">
            <Link href="/" className="flex items-center">
              <div className="relative w-[156.17px] h-[39.91px]">
                <Image
                  src="/logo/travelgo.svg"
                  alt="TRAVELGO"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-4 header-nav">
            <Link
              href="/comingsoon"
              className="text-sm text-[#142347] hover:text-[#0057b8] flex items-center header-nav-link"
            >
              {t('Header', 'popularDestinations')}
            </Link>
            <Link
              href="/comingsoon"
              className="text-sm text-[#142347] hover:text-[#0057b8] flex items-center header-nav-link"
            >
              {t('Header', 'topHotels')}
            </Link>
            <Link
              href="/comingsoon"
              className="text-sm text-[#142347] hover:text-[#0057b8] flex items-center header-nav-link"
            >
              {t('Header', 'lastMinute')}
            </Link>
            <Link
              href="/comingsoon"
              className="text-sm text-[#142347] hover:text-[#0057b8] flex items-center header-nav-link"
            >
              {t('Header', 'recommended')}
            </Link>
            <Link
              href="/comingsoon"
              className="text-sm text-[#142347] hover:text-[#0057b8] flex items-center header-nav-link"
            >
              {t('Header', 'charterAntalya')}
            </Link>
            <Link
              href="/comingsoon"
              className="text-sm text-[#142347] hover:text-[#0057b8] flex items-center header-nav-link"
            >
              {t('Header', 'cityBreakIstanbul')}
            </Link>
          </nav>
          <div className="md:hidden">
            <button
              className="text-gray-800 flex items-center justify-center mobile-menu-btn"
              aria-label="Toggle mobile menu"
              onClick={toggleMobileMenu}
            >
              <Icon name="hamburger" />
            </button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-50 overflow-y-auto">
          <button
            className="absolute top-4 right-4 text-gray-800 flex items-center justify-center mobile-menu-close-btn"
            aria-label="Close mobile menu"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Icon name="close" size={16} />
          </button>
          <div className="pt-24 px-4 space-y-6 pb-16">
            <div className="border-b border-gray-200 pb-4 space-y-4">
              <div className="py-2 flex items-center">
                <span className="mr-2 text-base text-[#142347]">
                  {t('Header', 'language')}
                </span>
                <LanguageSelector isMobileView={true} />
              </div>

              <Link
                href="/comingsoon"
                className="text-[#142347] py-2 flex items-center text-base"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('Header', 'b2bPlatform')}
              </Link>

              <Link
                href="/comingsoon"
                className="text-[#142347] py-2 flex items-center text-base"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('Header', 'clientCare')}
              </Link>

              <Link
                href="/comingsoon"
                className="text-[#142347] py-2 flex items-center text-base"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('Header', 'contact')}
              </Link>

              <a
                href="tel:+40212101717"
                className="text-[#142347] py-2 flex items-center text-base"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="flex items-center mr-1">
                  <Icon name="phone" />
                </span>
                <span>+4021 210 17 17</span>
              </a>

              <button
                onClick={() => {
                  handleAddFavorite();
                  setIsMobileMenuOpen(false);
                }}
                className="text-[#142347] py-2 flex items-center text-base w-full text-left cursor-pointer"
              >
                <span className="flex items-center mr-1">
                  <Icon name="favorite" />
                </span>
                <span>{t('Header', 'favorite')}</span>
              </button>
              <div className="py-2">
                <div className="relative">
                  <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
                    <Icon name="searchSm" />
                  </div>
                  <input
                    type="text"
                    placeholder={t('Header', 'searchPlaceholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full py-2 pl-8 pr-4 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <Link
                href="/comingsoon"
                className="text-[#142347] py-2 flex items-center text-base"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('Header', 'popularDestinations')}
              </Link>

              <Link
                href="/comingsoon"
                className="text-[#142347] py-2 flex items-center text-base"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('Header', 'topHotels')}
              </Link>
              <Link
                href="/comingsoon"
                className="text-[#142347] py-2 flex items-center text-base"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('Header', 'lastMinute')}
              </Link>
              <Link
                href="/comingsoon"
                className="text-[#142347] py-2 flex items-center text-base"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('Header', 'recommended')}
              </Link>
              <Link
                href="/comingsoon"
                className="text-[#142347] py-2 flex items-center text-base"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('Header', 'charterAntalya')}
              </Link>
              <Link
                href="/comingsoon"
                className="text-[#142347] py-2 flex items-center text-base"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('Header', 'cityBreakIstanbul')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
