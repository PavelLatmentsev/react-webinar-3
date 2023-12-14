import { memo } from "react";
import PropTypes from "prop-types";
import "./style.css";
import Input from "../input";
import { cn as bem } from "@bem-react/classname";
function LoginForm(props) {
  const cn = bem("Login");
  const onSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(props.value);
  };
  return (
    <div className={cn()}>
      {" "}
      <h1 className={cn("title")}>{props.title}</h1>
      <form onSubmit={onSubmit}>
        <Input
          value={props.value.login}
          onChange={props.onChange}
          label="Логин"
          name="login"
          theme="login"
        />
        <Input
          value={props.value.password}
          onChange={props.onChange}
          label="Пароль"
          name="password"
          theme="login"
          type="password"
        />
        {props.error && <div className={cn("error")}>{props.error}</div>}
        <button type="submit" className={cn("btn")}>
          {props.btnTitle}
        </button>
      </form>
    </div>
  );
}

LoginForm.propTypes = {
  title: PropTypes.string,
};

LoginForm.defaultProps = {};

export default memo(LoginForm);
