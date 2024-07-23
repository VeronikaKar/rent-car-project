import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { selectIsLoggedIn, selectIsRefresh } from "../../redux/auth/selectors";

const PrivateRoute = ({ component, redirectTo }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefresh);
  console.log(isRefreshing);
  const location = useLocation();
  return !isLoggedIn && !isRefreshing ? (
    <Navigate to={redirectTo} state={location} />
  ) : (
    component
  );
};
export default PrivateRoute;
