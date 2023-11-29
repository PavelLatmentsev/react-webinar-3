import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import Button from "../button";
import { getSum, plural } from "../../utils";
import { getAllGoods } from "../../utils";
function Controls({ isEmpty, cart, onToogleState }) {
  return (
    <div className="Controls">
      {!isEmpty && (
        <>
          <div className="Controls-title">В корзине: </div>{" "}
          <div className="Controls-sum">
            {getAllGoods(cart)
              ? " " +
                getAllGoods(cart) +
                plural(getAllGoods(cart), {
                  one: " товар ",
                  few: " товара ",
                  many: " товаров ",
                })
              : " пусто "}
          </div>{" "}
          <div className="Controls-sum">
            {getSum(cart) ? " / " + getSum(cart).toLocaleString() + " ₽" : " "}{" "}
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
