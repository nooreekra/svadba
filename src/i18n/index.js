import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import kz from './locales/kz/translation.json';
import ru from './locales/ru/translation.json';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            kz: { translation: kz },
            ru: { translation: ru },
        },
        fallbackLng: 'kz', // 👈 по умолчанию казахский
        detection: {
            // необязательно, но можешь ограничить, откуда берётся язык
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
        },
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
