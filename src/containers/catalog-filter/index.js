import { memo, useCallback, useMemo } from "react";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Select from "../../components/select";
import Input from "../../components/input";
import SideLayout from "../../components/side-layout";
import Spinner from "../../components/spinner";
import { transformQuery, transformData } from "../../utils";

/**
 * Контейнер со всеми фильтрами каталога
 */
function CatalogFilter() {
  const store = useStore();

  const select = useSelector((state) => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    categoryList: state.category.category,
    waiting: state.category.waiting,
    category: state.catalog.params.category,
  }));

  const callbacks = {
    // Сортировка
    onSort: useCallback(
      (sort) => store.actions.catalog.setParams({ sort }),
      [store]
    ),
    // Поиск
    onSearch: useCallback(
      (query) =>
        store.actions.catalog.setParams({
          query: transformQuery(query),
          page: 1,
        }),
      [store]
    ),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
    onCategory: useCallback(
      (category) => store.actions.catalog.setParams({ category, page: 1 }),
      [store]
    ),
  };

  const options = {
    sort: useMemo(
      () => [
        { value: "order", title: "По порядку" },
        { value: "title.ru", title: "По именованию" },
        { value: "-price", title: "Сначала дорогие" },
        { value: "edition", title: "Древние" },
      ],
      []
    ),
    categoryList: useMemo(() => select.categoryList, [select.categoryList]),
  };
  const { t } = useTranslate();
  const transformCategory = [
    {
      title: "Все",
      value: "",
    },
    ...transformData(options.categoryList),
  ];
  return (
    <Spinner active={select.waiting}>
      <SideLayout padding="medium">
        <Select
          options={transformCategory}
          value={select.category}
          onChange={callbacks.onCategory}
        />

        <Select
          options={options.sort}
          value={select.sort}
          onChange={callbacks.onSort}
        />
        <Input
          value={select.query}
          onChange={callbacks.onSearch}
          placeholder={"Поиск"}
          delay={1000}
          name="search"
        />
        <button onClick={callbacks.onReset}>{t("filter.reset")}</button>
      </SideLayout>
    </Spinner>
  );
}

export default memo(CatalogFilter);
