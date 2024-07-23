import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors.js";
import { Navigate, useLocation } from "react-router-dom";

const RestrictedRoute = ({ component }) => {
  const location = useLocation();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return isLoggedIn ? (
    <Navigate to={location?.state || "/"} replace />
  ) : (
    component
  );
};
export default RestrictedRoute;
