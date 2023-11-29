import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function Button({ title, onClick }) {
  return (
    <button className="Button" onClick={onClick}>
      {title}
    </button>
  );
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  onClick: () => {},
};

export default React.memo(Button);
