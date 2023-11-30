import React from "react";
import PropTypes from "prop-types";
import Item from "../item";
import "./style.css";

function List(props) {
  return (
    <div className="List">
      {props.list.map((item) => (
        <div key={item.code} className="List-item">
          <Item
            item={item}
            onAddToCart={props.onAddToCart}
            btnTitle={props.btnTitle}
            onDeleteFromCart={props.onDeleteFromCart}
            quantity={props.quantity}
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
  onDeleteFromCart: () => {},
  onAddToCart: () => {},
  btnTitle: "Добавить",
  quantity: false,
};

export default React.memo(List);
