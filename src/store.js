/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.currentId = 1; // либо можно длину изначального массива;
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
      this.listeners = this.listeners.filter(item => item !== listener);
    }
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
   * Получение уникального идентификатора
   */
  getId()  {
      const index = this.state.list.map(item => item.code).indexOf(this.currentId);
      if (index === -1) {
        return   this.currentId;
      } else {
        this.currentId += 1;
        return this.getId() // с помощью рекурсии добираюсь до уникального id;
      } 
  }
  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, {code: this.getId(), title: 'Новая запись'}]
    })
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code)
    })
  };

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          item.selected = !item.selected
          item = {...item, selectedCount: item.selected ? (item.selectedCount || 0) + 1 : item.selectedCount }
        } else {
          item.selected = false;
        }
        return item;
      })
    })
  }
}

export default Store;
