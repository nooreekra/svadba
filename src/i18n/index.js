import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationKZ from './locales/kz/translation.json';
import translationRU from './locales/ru/translation.json';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            kz: { translation: translationKZ },
            ru: { translation: translationRU },
        },
        fallbackLng: 'kz', // по умолчанию казахский
        interpolation: {
            escapeValue: false,
        },
        detection: false, // ты уже убрал languageDetection
    });

export default i18n;
