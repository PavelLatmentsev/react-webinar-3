import PropTypes from "prop-types";
import { memo } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { cn as bem } from "@bem-react/classname";
function NavigationMenu(props) {
    const cn = bem("Navigation");
    return (
        <nav className={cn()}>
            <ul className={cn("list")}>
                <li> <Link to={props.path} className={cn("item")}>
                    {props.name}
                </Link></li>
            </ul>

        </nav>

    );
}

NavigationMenu.propTypes = {
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
};

export default memo(NavigationMenu);
