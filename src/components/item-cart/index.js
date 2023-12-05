import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import Button from "../button";

function ItemCart(props) {
  const callbacks = {
    onDeleteFromCart: (e) => {
      e.stopPropagation();
      props.onDeleteFromCart(props.item.code);
    },
  };
  return (
    <div className={"Item"}>
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">{props.item.title}</div>
      <div className="Item-actions">
        <div className="Item-price">
          {`${props.item.price.toLocaleString()} ₽`}{" "}
        </div>
        <div className="Item-quantity">{props.item.cartCount} шт</div>
        <Button title={props.btnTitle} onClick={callbacks.onDeleteFromCart} />
      </div>
    </div>
  );
}

ItemCart.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
  onDeleteFromCart: PropTypes.func.isRequired,
  btnTitle: PropTypes.string.isRequired,
};

export default React.memo(ItemCart);
