import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import detector from "i18next-browser-languagedetector";
import backend from "i18next-xhr-backend";
import POLISH from "./polish.json";
import ENGLISH from "./english.json";

const resources = {
    en: ENGLISH,
    pl: POLISH,
};

i18n
    .use(detector)
    .use(backend)
    .use(initReactI18next)
    .init({
        resources,
        lng: "pl",
        fallbackLng: "en",
        keySeparator: false,
        debug: false,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
