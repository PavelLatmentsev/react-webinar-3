import PropTypes from "prop-types";
import { memo } from "react";
import "./style.css";
function ButtonLanguage(props) {
  const heandleChange = () => {
    props.onTooggleLanguage({ name: props.name, value: !props.value });
  };
  return (
    <label className="switch">
      <input
        className="Head-btn"
        onChange={heandleChange}
        type={props.type}
        name={props.name}
        checked={props.value}
      />
      <span className="slider"></span>
    </label>
  );
}

ButtonLanguage.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  onTooggleLanguage: PropTypes.func.isRequired,
};

export default memo(ButtonLanguage);
