'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { CloseOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useLanguage } from '@/hooks/useLanguage';

interface NightPickerProps {
  nights: number;
  onChange: (nights: number) => void;
  onClose: () => void;
  visible: boolean;
  triggerRef: React.RefObject<HTMLElement>;
}

const NightPicker: React.FC<NightPickerProps> = ({
  nights,
  onChange,
  onClose,
  visible,
  triggerRef,
}) => {
  const { t } = useLanguage();

  const [nightCount, setNightCount] = useState(nights);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  useEffect(() => {
    if (visible && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: Math.max(rect.width, 200),
      });
    }
  }, [visible, triggerRef]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose, triggerRef]);

  const handleDecrease = () => {
    const newNights = Math.max(1, nightCount - 1);
    setNightCount(newNights);
    onChange(newNights);
  };

  const handleIncrease = () => {
    const newNights = nightCount + 1;
    setNightCount(newNights);
    onChange(newNights);
  };

  if (!visible || typeof document === 'undefined') return null;

  const pickerContent = (
    <div
      ref={dropdownRef}
      className="nightpicker-dropdown fixed bg-white rounded-lg shadow-lg z-50 p-4"
      style={{
        top: dropdownPosition.top,
        left: dropdownPosition.left,
        width: dropdownPosition.width,
      }}
    >
      <div className="nightpicker-header flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
        <span className="nightpicker-title font-medium text-gray-800">
          {t('Filters', 'nights')}
        </span>
        <button
          onClick={onClose}
          className="nightpicker-close text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          <CloseOutlined />
        </button>
      </div>
      <div className="nightpicker-body flex flex-col items-center">
        <div className="nightpicker-night-count text-sm font-semibold text-gray-700 mb-2">
          {t('HotelCard', 'nights', { count: nightCount })}
        </div>
        <div className="nightpicker-controls flex items-center gap-4">
          <button
            onClick={handleDecrease}
            className="nightpicker-decrease w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100"
            disabled={nightCount <= 1}
          >
            <MinusOutlined />
          </button>
          <span className="nightpicker-count text-xl font-bold text-center w-8">
            {nightCount}
          </span>
          <button
            onClick={handleIncrease}
            className="nightpicker-increase w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100"
          >
            <PlusOutlined />
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(pickerContent, document.body);
};

export default NightPicker;
