'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';

const NotFound = () => {
  const { t } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="not-found-container">
      <div className="not-found-inner">
        <div className={`not-found-text ${isLoaded ? 'loaded' : 'loading'}`}>
          <div className="not-found-404">404</div>
          <div className="not-found-airplane-path">
            <div className="not-found-airplane-container">
              <svg
                className="not-found-airplane animate-float"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 15L15 9.5V5C15 4.17157 15.6716 3.5 16.5 3.5C17.3284 3.5 18 4.17157 18 5C18 5.82843 17.3284 6.5 16.5 6.5M21 15L12 20L3 15M21 15V19L12 24L3 19V15M12 20V24M3 15L9 9.5V5C9 3.89543 9.89543 3 11 3C12.1046 3 13 3.89543 13 5V9.5L9.5 12.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className="not-found-compass">
            <div
              className={`not-found-compass-inner ${isLoaded ? 'loaded' : 'loading'}`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full text-orange-500"
              >
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M13.5 8.5L12 3L10.5 8.5L12 14L13.5 8.5Z"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.5 15.5L12 21L13.5 15.5L12 10L10.5 15.5Z"
                  fill="#ED8936"
                  stroke="#ED8936"
                  strokeWidth="0.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="12" r="2" fill="#ED8936" stroke="#ED8936" />
              </svg>
            </div>
          </div>
        </div>
        <div className={`not-found-card ${isLoaded ? 'loaded' : 'loading'}`}>
          <h1 className="not-found-title">{t('NotFound', 'title')}</h1>
          <h2 className="not-found-subtitle">{t('NotFound', 'message')}</h2>
          <p className="not-found-description">
            {t('NotFound', 'description')}
          </p>
          <div className="not-found-travel-graphics">
            <div className="not-found-path-line"></div>
            <div className="not-found-travel-icon not-found-travel-icon-home">
              <div className="not-found-icon-circle not-found-icon-circle-blue animate-float not-found-float-0">
                <svg
                  className="not-found-icon-blue"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
            </div>
            <div className="not-found-travel-icon not-found-travel-icon-location">
              <div className="not-found-icon-circle not-found-icon-circle-orange animate-float not-found-float-1">
                <svg
                  className="not-found-icon-orange"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 5.02944 7.02944 1 12 1C16.9706 1 21 5.02944 21 10Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div className="not-found-travel-icon not-found-travel-icon-message">
              <div className="not-found-icon-circle not-found-icon-circle-green animate-float not-found-float-2">
                <svg
                  className="not-found-icon-green"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 10H16.01M12 10H12.01M8 10H8.01M3 10.5V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V16C21 17.1046 20.1046 18 19 18H11.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 21L7 16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div className="not-found-travel-icon not-found-travel-icon-warning">
              <div className="not-found-icon-circle not-found-icon-circle-red animate-float not-found-float-3">
                <svg
                  className="not-found-icon-red"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div className="not-found-travel-icon not-found-travel-icon-sun">
              <div className="not-found-icon-circle not-found-icon-circle-yellow animate-float not-found-float-4">
                <svg
                  className="not-found-icon-yellow"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 3V4M12 20V21M21 12H20M4 12H3M18.364 18.364L17.657 17.657M6.343 6.343L5.636 5.636M18.364 5.636L17.657 6.343M6.343 17.657L5.636 18.364M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
          <Link
            href="/"
            className={`not-found-button ${isLoaded ? 'loaded' : 'loading'}`}
          >
            <span className="flex items-center">
              <svg
                className="not-found-button-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              {t('NotFound', 'actionButton')}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
