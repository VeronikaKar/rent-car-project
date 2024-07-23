import { NavLink } from "react-router-dom";
import s from "./AuthNav.module.css";
import clsx from "clsx";
const AuthNav = () => {
  const buildLinkClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.active);
  };
  return (
    <div>
      <NavLink
        className={(isActive) => buildLinkClass(isActive)}
        to="/register"
      >
        Register
      </NavLink>
      <NavLink className={(isActive) => buildLinkClass(isActive)} to="/login">
        Log In
      </NavLink>
    </div>
  );
};
export default AuthNav;
