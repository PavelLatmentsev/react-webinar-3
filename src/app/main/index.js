import { memo, useCallback, useEffect, useState } from "react";
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import PaginationList from "../../components/pagination-list";
import { dictionary } from "../../language";
import NavigationMenu from "../../components/menu"
import PositionLayout from "../../components/position-layout";
function Main() {
  const store = useStore();
  const [langChecked, setLangChecked] = useState({ checked: false });
  const lang = langChecked.checked ? dictionary.eng : dictionary.rus
  useEffect(() => {
    store.actions.catalog.load();
    setLangChecked((prevState) => ({
      ...prevState,
      checked: JSON.parse(localStorage.getItem("langValue")),
    }));
  }, []);

  const select = useSelector((state) => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    count: state.catalog.count,
  }));

  const heandleChange = (target) => {
    if (target) {
      setLangChecked((prevState) => ({
        ...prevState,
        [target.name]: target.value,
      }));
    }
    localStorage.setItem("langValue", target.value);
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
            add={lang.add}
          />
        );
      },
      [callbacks.addToBasket, lang.add]
    ),
  };
  return (
    <PageLayout>
      <Head
        title={lang.header}
        tooggleLanguge={true}
        onTooggleLanguage={heandleChange}
        langValue={langChecked.checked}
        type="checkbox"
        value={Boolean(langChecked.checked)}
        name="checked"
      />
      <PositionLayout>
        <NavigationMenu name={lang.main} path="/" />
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
          basket={lang.basket}
          main={lang.main}
          empty={lang.empty}
          go={lang.go}
          productOne={lang.productOne}
          productsFew={lang.productsFew}
          productsMany={lang.productsMany}
        />
      </PositionLayout>
      <List list={select.list} renderItem={renders.item} />
      <PaginationList count={select.count} />
    </PageLayout>
  );
}

export default memo(Main);
