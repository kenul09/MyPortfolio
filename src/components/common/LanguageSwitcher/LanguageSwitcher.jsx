import React from 'react';
import { useLanguage } from '../../../hooks';
import './LanguageSwitcher.css';

const LanguageSwitcher = () => {
  const { language, changeLanguage } = useLanguage();

  const languages = [
    { code: 'az', label: 'AZ' },
    { code: 'en', label: 'EN' },
    { code: 'ru', label: 'RU' }
  ];

  return (
    <div className="language-switcher">
      {languages.map((lang) => (
        <button
          key={lang.code}
          className={`lang-btn ${language === lang.code ? 'active' : ''}`}
          onClick={() => changeLanguage(lang.code)}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;