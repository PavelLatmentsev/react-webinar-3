import { useState } from "react";
import useServices from "./use-services";

export default function useTranslate() {
  const localeServise = useServices().i18n;
  const currentLocale = localeServise.getLocale()
  const [locale, setLocale] = useState(currentLocale);
  const newLocale = (info) => {
    setLocale(info);
    localeServise.setLocale(info);
  };
  localeServise.subscribe((info) => {
    setLocale(info);
  })
  const t = (text, plural, locale) => localeServise.translate(text, plural, locale,)
  return { t, newLocale, locale, };
}
