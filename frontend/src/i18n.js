import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/english.json';
import hi from './locales/hindi.json';

i18n
  .use(initReactI18next) // Integrates with React
  .use(LanguageDetector)  // Detects user's language
  .init({
    resources: {
      en: { translation: en },
      hi: { translation: hi }
    },
    fallbackLng: "en", // Default language
    interpolation: { escapeValue: false }
  });

export default i18n;
