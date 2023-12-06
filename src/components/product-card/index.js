import { memo, useCallback, useEffect } from "react";
import "./style.css";
import Head from "../head";
import BasketTool from "../basket-tool";
import ItemCard from "../item-card";
import PageLayout from "../page-layout";
import { useParams } from "react-router-dom";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Loader from "../loader";
function ProductCard() {
  const { id } = useParams();
  const store = useStore();

  useEffect(() => {
    store.actions.catalog.loadById(id);
    store.actions.modals.open(null);
  }, [id]);

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
    })
  );
  return isLoading ? (
    <PageLayout>
      <Head title={currentProduct.title} />
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={amount}
        sum={sum}
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
      />
    </PageLayout>
  ) : (
    <Loader />
  );
}

export default memo(ProductCard);
