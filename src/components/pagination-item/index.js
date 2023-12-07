import { memo } from "react";
import "./style.css";
import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";

function PaginationItem(props) {
  const cn = bem("PaginationItem");
  return (
    <button
      className={cn(props.currentPage === props.item ? "btn active" : "btn")}
      onClick={() => props.onGetPage(props.item, props.paginationBox)}
    >
      {props.item}
    </button>
  );
}
PaginationItem.propTypes = {
  item: PropTypes.number.isRequired,
  paginationBox: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
};
export default memo(PaginationItem);
