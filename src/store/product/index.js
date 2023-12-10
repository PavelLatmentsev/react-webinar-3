import StoreModule from "../module";

class Product extends StoreModule {
    initState() {
        return {
            currentProduct: null,
            isLoading: false,
            error: null,
        };
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

export default Product;
