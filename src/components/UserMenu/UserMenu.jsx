import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";

import s from "./UserMenu.module.css";
import { logoutThunk } from "../../redux/auth/operations.js";
const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  return (
    <div className={s.wrapper}>
      <p className={s.username}>Welcome, {user.name}</p>
      <button
        type="button"
        onClick={() => dispatch(logoutThunk())}
        className={s.button}
      >
        Logout
      </button>
    </div>
  );
};
export default UserMenu;
