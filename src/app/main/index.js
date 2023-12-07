import { memo, useCallback, useEffect, useRef, useState } from "react";
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import PaginationList from "../../components/pagination-list";

function Main() {
  const store = useStore();
  const [langValue, setLangValue] = useState(false);
  const tooggleBtn = useRef(null);

  useEffect(() => {
    store.actions.catalog.load();
    setLangValue(JSON.parse(localStorage.getItem("langValue")));
  }, []);
  useEffect(() => {
    store.actions.language.getLanguage(langValue);
    tooggleBtn.current.checked = langValue;
    console.log(tooggleBtn.current.checked);
  }, [langValue]);

  const select = useSelector((state) => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    count: state.catalog.count,
    lang: state.language.lang,
  }));
  const onTooggleLanguage = () => {
    setLangValue((prevState) => !prevState);
    localStorage.setItem("langValue", !langValue);
  };
  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
      [store]
    ),
  };
  const renders = {
    item: useCallback(
      (item) => {
        return (
          <Item
            item={item}
            onAdd={callbacks.addToBasket}
            add={select.lang.add}
          />
        );
      },
      [callbacks.addToBasket, select.lang.add]
    ),
  };

  return (
    <PageLayout>
      <Head
        title={select.lang.header}
        tooggleLanguge={true}
        onTooggleLanguage={onTooggleLanguage}
        langValue={langValue}
        refTooggle={tooggleBtn}
      />
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        basket={select.lang.basket}
        main={select.lang.main}
        empty={select.lang.empty}
        go={select.lang.go}
      />
      <List list={select.list} renderItem={renders.item} />
      <PaginationList count={select.count} />
    </PageLayout>
  );
}

export default memo(Main);
