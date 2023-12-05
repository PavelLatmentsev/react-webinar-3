import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import Button from "../button";

function Item(props) {
  const callbacks = {
    onAddToCart: (e) => {
      e.stopPropagation();
      props.onAddToCart(props.item.code);
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
        <Button title={props.btnTitle} onClick={callbacks.onAddToCart} />
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
  btnTitle: PropTypes.string.isRequired,
};

Item.defaultProps = {
  onAddToCart: () => {},
};

export default React.memo(Item);
