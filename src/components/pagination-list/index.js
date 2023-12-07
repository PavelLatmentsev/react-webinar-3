import { memo, useEffect, useState } from "react";
import "./style.css";
import { cn as bem } from "@bem-react/classname";
import PaginationItem from "../pagination-item";
import PropTypes from "prop-types";
import useStore from "../../store/use-store";
function PaginationList(props) {
  const cn = bem("Pagination");
  const store = useStore();
  const paginationBox = [];
  for (let i = 1; i < props.count; i++) {
    paginationBox.push(i);
  }
  const [currentPage, setCurrentPage] = useState(1);
  //сокращенно от quantity
  const [pageQty, setPageQty] = useState([2, 3]);

  const getPage = (page, paginationBox) => {
    store.actions.catalog.load(page);
    if (page < 3 && page >= 2) {
      setPageQty(paginationBox.slice(page - 1, page + 2));
    } else if (page === 1) {
      setPageQty(paginationBox.slice(page, page + 2));
    } else if (page === props.count) {
      setPageQty(paginationBox.slice(page - 3, page + 1));
    } else {
      setPageQty(paginationBox.slice(page - 2, page + 1));
    }

    setCurrentPage(page);
  };

  return (
    props.count && (
      <div className={cn()}>
        <button
          className={cn(currentPage === 1 ? "start active" : "start")}
          onClick={() => getPage(1, paginationBox)}
        >
          1
        </button>
        {currentPage > 3 && <button className={cn("start")}>...</button>}
        {pageQty.map((item) => {
          return (
            <PaginationItem
              item={item}
              key={item}
              onGetPage={getPage}
              paginationBox={paginationBox}
              currentPage={currentPage}
            />
          );
        })}
        {currentPage < props.count - 2 && (
          <button className={cn("end")}>...</button>
        )}
        <button
          className={cn(currentPage === props.count ? "end active" : "end")}
          onClick={() => getPage(props.count, paginationBox)}
        >
          {props.count}
        </button>
      </div>
    )
  );
}
PaginationList.propTypes = {
  count: PropTypes.number,
};
export default memo(PaginationList);
