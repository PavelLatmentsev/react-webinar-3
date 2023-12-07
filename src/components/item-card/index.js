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
        {props.countryTitle}: <span>{`${props.madeIn} (${props.code})`}</span>
      </div>
      <div className={cn("category")}>
        {props.categoryTitle}: <span>{props.category}</span>
      </div>
      <div className={cn("year")}>
        {props.manufacturedTitle}: <span>{props.edition}</span>{" "}
      </div>
      <div className={cn("price")}>
        {" "}
        {props.priceTitle}: <span>{numberFormat(props.price)}</span>{" "}
      </div>
      <button className={cn("btn")} onClick={callbacks.onAdd}>
        {props.addTitle}
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
  countryTitle: PropTypes.string.isRequired,
  categoryTitle: PropTypes.string.isRequired,
  manufacturedTitle: PropTypes.string.isRequired,
  priceTitle: PropTypes.string.isRequired,
  addTitle: PropTypes.string.isRequired,
};

export default memo(ItemCard);
