import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function PositionLayout({ children }) {
    const cn = bem("PositionLayout");

    return (
        <div className={cn()}>
            {children}
        </div>
    );
}

PositionLayout.propTypes = {
    children: PropTypes.node,
};

export default memo(PositionLayout);
