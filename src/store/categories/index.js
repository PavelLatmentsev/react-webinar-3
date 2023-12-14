import StoreModule from "../module";

class Category extends StoreModule {
  initState() {
    return {
      category: [],
      waiting: false, // признак ожидания загрузки
      error: {},
    };
  }
  async loadCategory() {
    this.setState({
      ...this.getState(),
      waiting: true,
    });
    try {
      const response = await fetch(
        `/api/v1/categories?fields=_id,title,parent(_id)&limit=*`
      );
      const json = await response.json();

      // Товар загружен успешно
      this.setState(
        {
          ...this.getState(),
          category: json.result.items,
          waiting: false,
        },
        "Загружены категории из АПИ"
      );
    } catch (e) {
      // Ошибка при загрузке
      this.setState({
        error: e.message,
        waiting: false,
      });
    }
  }
}

export default Category;
