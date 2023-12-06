import { memo } from "react";
import "./style.css";
import { cn as bem } from "@bem-react/classname";

function Loader() {
  const cn = bem("Loader");
  return (
    <div className={cn()}>
      <div className={cn("spiner")}></div>
    </div>
  );
}

export default memo(Loader);
