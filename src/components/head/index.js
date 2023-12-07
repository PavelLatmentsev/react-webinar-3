import { memo } from "react";
import PropTypes from "prop-types";
import "./style.css";
import { cn as bem } from "@bem-react/classname";
import { ButtonLanguage } from "../button-language";

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
          <ButtonLanguage
            onTooggleLanguage={props.onTooggleLanguage}
            type={props.type}
            name={props.name}
            value={props.value}
          />
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
