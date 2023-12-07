import { memo, useCallback, useEffect, useState, useRef } from "react";
import Head from "../head";
import BasketTool from "../basket-tool";
import ItemCard from "../item-card";
import PageLayout from "../page-layout";
import { useParams } from "react-router-dom";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Loader from "../loader";
import "./style.css";
function ProductCard() {
  const { id } = useParams();
  const store = useStore();
  const ref = useRef(null);
  const [language, setLanguage] = useState();
  useEffect(() => {
    store.actions.catalog.loadById(id);
    store.actions.modals.open(null);
    setLanguage(JSON.parse(localStorage.getItem("langValue")));
  }, [id]);
  useEffect(() => {
    store.actions.language.getLanguage(language);
    console.log(ref.current);
  }, [language]);
  const onTooggleLanguage = () => {
    setLanguage((prevState) => !prevState);
    localStorage.setItem("langValue", !language);
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
  const { isLoading, currentProduct, error, amount, sum, lang } = useSelector(
    (state) => ({
      isLoading: state.catalog.isLoading,
      currentProduct: state.catalog.currentProduct,
      error: state.catalog.error,
      amount: state.basket.amount,
      sum: state.basket.sum,
      lang: state.language.lang,
    })
  );
  return isLoading ? (
    <PageLayout>
      <Head
        title={currentProduct.title}
        tooggleLanguge={true}
        langValue={language}
        onTooggleLanguage={onTooggleLanguage}
        refBtn={ref}
      />
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={amount}
        sum={sum}
        basket={lang.basket}
        main={lang.main}
        empty={lang.empty}
        go={lang.go}
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
