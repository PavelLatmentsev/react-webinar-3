import { memo } from "react";
import "./style.css";
import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import { numberFormat } from "../../utils";

function ItemCard(props) {
  const cn = bem("ItemCard");
  const callbacks = {
    onAdd: () => props.onAddToBasket(props.id),
  };

  return (
    <div className={cn()}>
      <div className={cn("description")}>{props.description}</div>
      <div className={cn("country")}>
        Страна производитель: <span>{`${props.madeIn} (${props.code})`}</span>
      </div>
      <div className={cn("category")}>
        Категория: <span>{props.category}</span>
      </div>
      <div className={cn("year")}>
        Год выпуска: <span>{props.edition}</span>{" "}
      </div>
      <div className={cn("price")}>
        {" "}
        Цена: <span>{numberFormat(props.price)}</span>{" "}
      </div>
      <button className={cn("btn")} onClick={callbacks.onAdd}>
        Добавить
      </button>
    </div>
  );
}
ItemCard.propTypes = {
  edition: PropTypes.number.isRequired,
  madeIn: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  code: PropTypes.string.isRequired,
  onAddToBasket: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default memo(ItemCard);
