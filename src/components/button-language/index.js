import { forwardRef } from "react";
import "./style.css";
const ButtonLanguage = forwardRef(function MyInput(props, ref) {
  return (
    <label className="switch">
      <input
        className="Head-btn"
        onClick={() => props.onTooggleLanguage()}
        ref={ref}
        type={props.type}
      />
      <span className="slider"></span>
    </label>
  );
});

export default ButtonLanguage;
