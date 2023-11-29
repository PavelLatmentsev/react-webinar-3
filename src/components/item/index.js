import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import Button from "../button";

function Item(props) {
  const callbacks = {
    onAddToCart: (e) => {
      e.stopPropagation();
      props.onAddToCart(props.item);
    },
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
        {props.quantity && (
          <div className="Item-quantity">{props.item.cartCount} шт</div>
        )}
        <Button
          title={props.btnTitle}
          onClick={
            !props.quantity ? callbacks.onAddToCart : callbacks.onDeleteFromCart
          }
        />
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
  onAddToCart: PropTypes.func,
  btnTitle: PropTypes.string.isRequired,
  quantity: PropTypes.bool.isRequired,
};

Item.defaultProps = {
  onAddToCart: () => {},
};

export default React.memo(Item);
