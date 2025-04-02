'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import Icon from '@/assets/icons/Icon';

const ComingSoon = () => {
  const { t } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  return (
    <div className="coming-soon-container">
      <div className="coming-soon-content">
        <div className={`icon-container ${isLoaded ? 'loaded' : 'loading'}`}>
          <div className="clock-container">
            <div className="outer-ring">
              <Icon name="cirleclock" />
            </div>
            <div className="inner-clock">
              <Icon name="comingsoon" />
            </div>
            <div className="triangle-top">
              <Icon name="triangletop" />
            </div>
          </div>
        </div>
        <h1 className="coming-soon-title">{t('ComingSoon', 'title')}</h1>
        <p className="coming-soon-description">{t('ComingSoon', 'message')}</p>
        <Link href="/" className="home-button">
          {t('ComingSoon', 'button')}
        </Link>
      </div>
    </div>
  );
};

export default ComingSoon;
