import React from "react";
import PropTypes from "prop-types";
import Item from "../item";
import ItemCart from "../item-cart";
import "./style.css";

function List(props) {
  return (
    <div className="List">
      {props.list.map((item) => (
        <div key={item.code} className="List-item">
          {props.quantity ? (
            <ItemCart
              item={item}
              onDeleteFromCart={props.onDeleteFromCart}
              btnTitle={props.btnTitle}
            />
          ) : (
            <Item
              item={item}
              onAddToCart={props.onAddToCart}
              btnTitle={props.btnTitle}
            />
          )}
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  onDeleteFromCart: PropTypes.func,
  onAddToCart: PropTypes.func,
  btnTitle: PropTypes.string.isRequired,
  quantity: PropTypes.bool.isRequired,
};

List.defaultProps = {
  onDeleteFromCart: () => {},
  onAddToCart: () => {},
  btnTitle: "Добавить",
};

export default React.memo(List);
