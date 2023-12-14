import { memo } from "react";
import PropTypes from "prop-types";
import "./style.css";
import { cn as bem } from "@bem-react/classname";
import { Link } from "react-router-dom";

function Header(props) {
  const cn = bem("Header");

  return (
    <div className={cn()}>
      {props.isAuth && (
        <Link to="/profile" className={cn("link")}>
          User №1
        </Link>
      )}
      <button
        className={cn("btn")}
        onClick={
          props.isAuth ? () => props.onLogout() : () => props.onRedirect()
        }
      >
        {props.title}
      </button>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  isAuth: PropTypes.bool,
};

export default memo(Header);
