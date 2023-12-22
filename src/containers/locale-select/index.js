import { memo, useCallback, useMemo } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import Select from '../../components/select';

function LocaleSelect() {

  const { locale, newLocale } = useTranslate();

  const options = {
    lang: useMemo(() => ([
      { value: 'ru', title: 'Русский' },
      { value: 'en', title: 'English' },
    ]), [locale])
  };

  return (
    <Select onChange={newLocale} value={locale} options={options.lang} />
  );
}

export default memo(LocaleSelect);
