import { memo, useCallback, useEffect, useState } from "react";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import ItemCard from "../../components/item-card";
import PageLayout from "../../components/page-layout";
import { useParams } from "react-router-dom";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Loader from "../../components/loader";
import { dictionary } from "../../language";
import "./style.css";
function ProductCard() {
  const { id } = useParams();
  const store = useStore();
  const [langChecked, setLangChecked] = useState({ checked: false });
  const lang = langChecked.checked ? dictionary.eng : dictionary.rus

  useEffect(() => {
    store.actions.catalog.loadById(id);
    store.actions.modals.open(null);
    setLangChecked((prevState) => ({
      ...prevState,
      checked: JSON.parse(localStorage.getItem("langValue")),
    }));
  }, [id]);

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
      (id) => store.actions.basket.addToBasket(id),
      [store]
    ),
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
      [store]
    ),
  };
  const { isLoading, currentProduct, error, amount, sum } = useSelector(
    (state) => ({
      isLoading: state.catalog.isLoading,
      currentProduct: state.catalog.currentProduct,
      error: state.catalog.error,
      amount: state.basket.amount,
      sum: state.basket.sum,
      // lang: state.language.lang,
    })
  );

  console.log(lang)
  return isLoading ? (
    <PageLayout>
      <Head
        title={currentProduct.title}
        tooggleLanguge={true}
        onTooggleLanguage={heandleChange}
        langValue={langChecked.checked}
        type="checkbox"
        value={Boolean(langChecked.checked)}
        name="checked"
      />
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={amount}
        sum={sum}
        basket={lang.basket}
        main={lang.main}
        empty={lang.empty}
        go={lang.go}
        productOne={lang.productOne}
        productsFew={lang.productsFew}
        productsMany={lang.productsMany}
      />
      <ItemCard
        description={currentProduct.description}
        madeIn={currentProduct.madeIn.title}
        category={currentProduct.category.title}
        edition={currentProduct.edition}
        price={currentProduct.price}
        code={currentProduct.madeIn.code}
        onAddToBasket={callbacks.addToBasket}
        id={id}
        countryTitle={lang.country}
        categoryTitle={lang.category}
        manufacturedTitle={lang.manufactured}
        priceTitle={lang.price}
        addTitle={lang.add}
      />
    </PageLayout>
  ) : (
    <Loader />
  );
}

export default memo(ProductCard);
