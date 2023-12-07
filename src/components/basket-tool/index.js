import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat, plural } from "../../utils";
import "./style.css";
import { Link } from "react-router-dom";

function BasketTool(props) {
  const cn = bem("BasketTool");
  return (
    <div className={cn()}>
      <Link to={"/"} className={cn("link")}>
        {props.main}
      </Link>
      <div className={cn("cart")}>
        <span className={cn("label")}>{props.basket}:</span>
        <span className={cn("total")}>
          {props.amount
            ? `${props.amount} ${plural(props.amount, {
                one: "товар",
                few: "товара",
                many: "товаров",
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
  main: PropTypes.string,
  empty: PropTypes.string,
  go: PropTypes.string,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
  basket: "В Корзине",
  main: "Главная",
  empty: "пусто",
  go: "Перейти",
};

export default memo(BasketTool);
