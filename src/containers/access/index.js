import { Navigate, useNavigate } from "react-router-dom";
import useSelector from "../../hooks/use-selector";


/**
 * Контейнер для смены роута  у профиля
 */
function ProfileAccess({ children }) {
  const navigate = useNavigate();

  const select = useSelector((state) => ({
    isAuth: state.auth.isAuth,
  }));

  return (
    <>   {select.isAuth ? children : <Navigate to={"/login"} />}  </>
  );
}

export default ProfileAccess;
