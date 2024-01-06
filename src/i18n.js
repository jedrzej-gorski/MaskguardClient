import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resources from "./content/resources.json";

const options = {
  order: ["querystring", "navigator"],

  // cache user language
  caches: ["localStorage"],
  excludeCacheFor: ["cimode"],
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    detection: options,
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    debug: false,
  });

export default i18n;
