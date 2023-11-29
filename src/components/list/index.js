import React from "react";
import PropTypes from "prop-types";
import Item from "../item";
import "./style.css";

function List({ list, onAddToCart, btnTitle, onDeleteFromCart, quantity }) {
  return (
    <div className="List">
      {list.map((item) => (
        <div key={item.code} className="List-item">
          <Item
            item={item}
            onAddToCart={onAddToCart}
            btnTitle={btnTitle}
            onDeleteFromCart={onDeleteFromCart}
            quantity={quantity}
          />
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
  onDeleteItem: () => {},
  onAddToCart: () => {},
};

export default React.memo(List);
