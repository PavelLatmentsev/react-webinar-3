import { useState } from "react";
import useServices from "./use-services";

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {

  const localeServise = useServices().i18n;
  console.log(localeServise)
  const currentLocale = localeServise.getLocale()
  const [locale, setLocale] = useState(currentLocale);
  const t = (text, plural, locale) => localeServise.translate(text, plural, locale)
  const newLocale = (info) => {
    setLocale(info);
    localeServise.setLocale(info);

  };

  return { locale, newLocale, t };

}
