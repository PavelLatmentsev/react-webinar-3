import { memo } from "react";
import PropTypes from "prop-types";
import "./style.css";
import { cn as bem } from "@bem-react/classname";
function UserProfile(props) {
  const cn = bem("UserProfile");
  return (
    <div className={cn()}>
      {" "}
      <h1 className={cn("title")}>{props.title}</h1>
      <span className={cn("name")}>
        {props.titleName}:
        <span className={cn("subtitle")}> {props.user?.profile?.name}</span>
      </span>
      <span className={cn("phone")}>
        {props.titlePhone}:
        <span className={cn("subtitle")}> {props.user?.profile?.phone}</span>
      </span>
      <span className={cn("email")}>
        email: <span className={cn("subtitle")}>{props?.user?.email}</span>
      </span>
    </div>
  );
}

UserProfile.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
};

export default memo(UserProfile);
