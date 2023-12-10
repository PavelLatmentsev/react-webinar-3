import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat, plural } from "../../utils";
import "./style.css";

function BasketTool(props) {
  const cn = bem("BasketTool");
  return (
    <div className={cn()}>
      <div className={cn("cart")}>
        <span className={cn("label")}>{props.basket}:</span>
        <span className={cn("total")}>
          {props.amount
            ? `${props.amount} ${plural(props.amount, {
              one: props.productOne,
              few: props.productsFew,
              many: props.productsMany,
            })} / ${numberFormat(props.sum)} ₽`
            : `${props.empty}`}
        </span>
        <button className={cn("btn")} onClick={props.onOpen}>
          {props.go}
        </button>
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  basket: PropTypes.string,
  empty: PropTypes.string,
  go: PropTypes.string,
  productOne: PropTypes.string,
  productsFew: PropTypes.string,
  productsMany: PropTypes.string,
};

BasketTool.defaultProps = {
  onOpen: () => { },
  sum: 0,
  amount: 0,
  basket: "В Корзине",
  empty: "пусто",
  go: "Перейти",
  productOne: "Товар",
  productsFew: "Товара",
  productsMany: "Товаров",
};

export default memo(BasketTool);
