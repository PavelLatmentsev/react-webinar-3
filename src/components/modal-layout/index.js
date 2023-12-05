import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function ModalLayout({ children, modal }) {
  const cn = bem("ModalLayout");
  return (
    <div className={cn(null, [modal ? "Visible" : "Unvisible"])}>
      <div className={cn("main")}>{children}</div>
    </div>
  );
}

ModalLayout.propTypes = {
  children: PropTypes.node,
  state: PropTypes.bool,
};

export default React.memo(ModalLayout);
