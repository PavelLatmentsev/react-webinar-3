import "./style.css";
export const ButtonLanguage = (props) => {
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
};
