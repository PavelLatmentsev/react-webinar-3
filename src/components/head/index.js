import { memo } from "react";
import PropTypes from "prop-types";
import "./style.css";
import { cn as bem } from "@bem-react/classname";

function Head(props) {
  const cn = bem("Head");

  return (
    <div className={cn()}>
      <h1>{props.title}</h1>
      {props.tooggleLanguge && (
        <div className={cn("tooggle")}>
          {props.langValue ? (
            <span className={cn("tooggleTitle")}> eng</span>
          ) : (
            <span className={cn("tooggleTitle")}>ru</span>
          )}
          <label className="switch">
            <input
              type="checkbox"
              className="Head-btn"
              onClick={() => props.onTooggleLanguage("eng")}
              ref={props.refTooggle}
            />
            <span className="slider"></span>
          </label>
        </div>
      )}
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
  onToogleLanguge: PropTypes.func,
  langValue: PropTypes.bool,
  tooggleLanguge: PropTypes.bool,
};
Head.defaultProps = {
  onTooggleLanguage: () => {},
  langValue: false,
  title: "Магазин",
  tooggleLanguge: true,
};

export default memo(Head);
