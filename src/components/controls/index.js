import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import Button from "../button";
import { getSum, plural } from "../../utils";
function Controls({ isEmpty, cart, onToogleState }) {
  return (
    <div className="Controls">
      {!isEmpty && (
        <>
          <div className="Controls-title">В корзине: </div>{" "}
          <div className="Controls-sum">
            {getSum(cart, "goods")
              ? " " +
                getSum(cart, "goods") +
                plural(getSum(cart, "goods"), {
                  one: " товар ",
                  few: " товара ",
                  many: " товаров ",
                })
              : " пусто "}
          </div>{" "}
          <div className="Controls-sum">
            {getSum(cart, "price")
              ? " / " + getSum(cart, "price").toLocaleString() + " ₽"
              : " "}{" "}
          </div>
          <Button title="Перейти" onClick={() => onToogleState()} />
        </>
      )}
    </div>
  );
}

Controls.propTypes = {
  onToogleState: PropTypes.func,
  isEmpty: PropTypes.bool,
  cart: PropTypes.array,
};

Controls.defaultProps = {
  onToogleState: () => {},
  cart: [],
  isEmpty: false,
};

export default React.memo(Controls);
