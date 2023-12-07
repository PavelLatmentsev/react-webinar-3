import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat } from "../../utils";
import "./style.css";

function BasketTotal({ sum, totalPrice }) {
  const cn = bem("BasketTotal");
  return (
    <div className={cn()}>
      <span className={cn("cell")}>{totalPrice}</span>
      <span className={cn("cell")}> {numberFormat(sum)} ₽</span>
      <span className={cn("cell")}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
  totalPrice: PropTypes.string,
};

BasketTotal.defaultProps = {
  sum: 0,
  totalPrice: "Итого",
};

export default memo(BasketTotal);
