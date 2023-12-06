import { memo, useEffect, useState } from "react";
import "./style.css";
import { cn as bem } from "@bem-react/classname";

function Pagination() {
  const cn = bem("Pagination");
  const [page, setPage] = useState(1);
  const [pageQty, setPageQty] = useState(0);
  useEffect(() => {}, [page]);
  return <div className={cn()}></div>;
}

export default memo(Pagination);
