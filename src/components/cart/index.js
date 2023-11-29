import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import Head from "../head";
import Controls from "../controls";
import List from "../list";
import Button from "../button";
import { getSum } from "../../utils";

function Cart({ cart, onDeleteFromCart, btnTitle, quantity, onToogleState }) {
  return (
    <div className="Cart">
      <Head
        title="Корзина"
        button={<Button title="Закрыть" onClick={onToogleState} />}
      />
      <Controls isEmpty={true} onToogleState={onToogleState} />
      <List
        list={cart}
        onDeleteFromCart={onDeleteFromCart}
        btnTitle={btnTitle}
        quantity={quantity}
      />
      {cart.length ? (
        <div className="Cart-total">
          <div>Итого: </div>
          <div>{getSum(cart)}</div>
        </div>
      ) : (
        <div className="Cart-total">В корзине нет товаров</div>
      )}
    </div>
  );
}

Cart.propTypes = {
  onDeleteFromCart: PropTypes.func.isRequired,
  cart: PropTypes.array.isRequired,
  btnTitle: PropTypes.string.isRequired,
  quantity: PropTypes.bool.isRequired,
  onToogleState: PropTypes.func.isRequired,
};

Cart.defaultProps = {
  onDeleteFromCart: () => {},
};

export default React.memo(Cart);
