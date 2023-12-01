/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния\
    this.state.cart = [];
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }
  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }
  /**
   * Добавление в корзину
   */
  addToCart(item) {
    const isAdd = this.state.cart.find(
      (itemCart) => item.code === itemCart.code
    );
    if (!isAdd) {
      this.setState({
        ...this.state,
        cart: [...this.state.cart, { ...item, cartCount: 1 }],
      });
    } else {
      this.setState({
        ...this.state,
        cart: this.state.cart.map((itemCart) =>
          itemCart.code === item.code
            ? { ...itemCart, cartCount: itemCart.cartCount + 1 }
            : itemCart
        ),
      });
    }
  }

  /**
   * Удаление  из корзины
   */
  deleteFromCart(code) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter((itemCart) => code !== itemCart.code),
    });
  }
}

export default Store;
