import StoreModule from "../module";

class Language extends StoreModule {
  initState() {
    return {
      lang: {},
      eng: {
        header: "Store",
        add: "Add",
        delete: "Delete",
        main: "Main",
        cart: "Cart",
        go: "to Cart",
        empty: "empty",
        basket: "Cart",
        totalPrice: "Total",
        close: "Close",
        country: "Made in",
        category: "Category",
        manufactured: "Manufactured",
        price: "Price",
        productOne: "Product",
        productsFew: "Products",
        productsMany: "Products",
      },
      rus: {
        header: "Магазин",
        add: "Добавить",
        delete: "Удалить",
        main: "Главная",
        cart: "Корзина",
        go: "Перейти",
        empty: "пусто",
        basket: "В корзине",
        totalPrice: "Итого",
        close: "Зыкрыть",
        country: "Страна производитель",
        category: "Категория",
        manufactured: "Год выпуска",
        price: "Цена",
        productOne: "Товар",
        productsFew: "Товара",
        productsMany: "Товаров",
      },
    };
  }

  getLanguage(language) {
    this.setState(
      {
        ...this.getState(),
        lang: language ? this.getState().eng : this.getState().rus,
      },
      "Установлен Язык"
    );
  }
}

export default Language;
