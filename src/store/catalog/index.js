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
      count: 0,
    };
  }

  async load(page = 1) {
    const response = await fetch(
      `/api/v1/articles?limit=10&skip=${10 * (page - 1)
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
}

export default Catalog;
