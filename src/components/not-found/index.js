import { memo } from "react";
import "./style.css";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="NotFound">
      <h1>Страница не найдена</h1>
      <Link to={"/"} className="NotFound-Link">
        {" "}
        Вернуться на главную
      </Link>
    </div>
  );
}

export default memo(NotFound);
