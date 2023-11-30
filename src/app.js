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
  const [state, setState] = useState(false);
  const list = store.getState().list;
  const cart = store.getState().cart;

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
      setState((prevState) => !prevState);
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
      />
      <List
        list={list}
        onAddToCart={callbacks.onAddToCart}
        btnTitle=" Добавить"
        quantity={false}
      />
      <ModalLayout state={state}>
        <Cart
          cart={cart}
          onDeleteFromCart={callbacks.onDeleteFromCart}
          btnTitle=" Удалить"
          quantity={true}
          onToogleState={callbacks.onToogleState}
        />
      </ModalLayout>
    </PageLayout>
  );
}

export default App;
