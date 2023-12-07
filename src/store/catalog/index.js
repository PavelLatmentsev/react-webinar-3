import { codeGenerator } from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      currentProduct: null,
      isLoading: false,
      error: null,
      count: 0,
    };
  }

  async load(page = 1) {
    const response = await fetch(
      `/api/v1/articles?limit=10&skip=${
        10 * (page - 1)
      }&fields=items(_id, title, price),count`
    );
    const json = await response.json();

    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        count: Math.ceil(json.result.count / 10),
      },
      "Загружены товары из АПИ"
    );
  }

  async loadById(id) {
    try {
      this.setState(
        {
          ...this.getState(),
          isLoading: false,
        },
        "Идёт загрузка"
      );
      const response = await fetch(
        `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`
      );
      const product = await response.json();
      this.setState(
        {
          ...this.getState(),
          currentProduct: product.result,
          isLoading: true,
        },
        "Загружены товары из АПИ по id"
      );
    } catch (error) {
      this.setState(
        {
          ...this.getState(),
          isLoading: false,
          error: error.message,
        },
        "Произошла ошибка"
      );
    }
  }
}

export default Catalog;
