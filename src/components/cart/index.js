import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import Head from "../head";
import Controls from "../controls";
import List from "../list";
import Button from "../button";

function Cart(props) {
  return (
    <div className="Cart">
      <Head
        title="Корзина"
        button={<Button title="Закрыть" onClick={props.onToogleState} />}
      />
      <Controls isEmpty={true} onToogleState={props.onToogleState} />
      <List
        list={props.cart}
        onDeleteFromCart={props.onDeleteFromCart}
        btnTitle={props.btnTitle}
        quantity={true}
      />
      {props.cart.length ? (
        <div className="Cart-total">
          <div>Итого: </div>
          <div>{props.totalSum.toLocaleString()}</div>
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
  onToogleState: PropTypes.func.isRequired,
};

export default React.memo(Cart);
