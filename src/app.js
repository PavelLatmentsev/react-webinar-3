import React, { useCallback, useState } from "react";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from "./components/cart";
import ModalLayout from "./components/modal-layout";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [modal, setModal] = useState(false);
  const list = store.getState().list;
  const cart = store.getState().cart;
  const totalSum = store.getSum();

  const callbacks = {
    onDeleteFromCart: useCallback(
      (code) => {
        store.deleteFromCart(code);
      },
      [store]
    ),

    onAddToCart: useCallback(
      (item) => {
        store.addToCart(item);
      },
      [store]
    ),
    onToogleState: useCallback(() => {
      setModal((prevModal) => !prevModal);
    }, [store]),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls
        onAdd={callbacks.onAddItem}
        onGetCart={callbacks.onGetCart}
        cart={cart}
        onToogleState={callbacks.onToogleState}
        totalSum={totalSum}
      />
      <List
        list={list}
        onAddToCart={callbacks.onAddToCart}
        btnTitle=" Добавить"
        quantity={false}
      />
      <ModalLayout modal={modal}>
        <Cart
          cart={cart}
          onDeleteFromCart={callbacks.onDeleteFromCart}
          btnTitle=" Удалить"
          onToogleState={callbacks.onToogleState}
          totalSum={totalSum}
        />
      </ModalLayout>
    </PageLayout>
  );
}

export default App;
