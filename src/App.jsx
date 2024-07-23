import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { InfinitySpin } from "react-loader-spinner";
import Layout from "./components/Layout/Layout";
import RestrictedRoute from "./components/RestrictedRoute/RestrictedRoute";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { selectIsRefresh } from "./redux/auth/selectors";
import { refreshThunk } from "./redux/auth/operations";
import { easyLazy } from "./helpers/easyLazy";

const HomePage = easyLazy("HomePage");
const LoginPage = easyLazy("LoginPage");
const RegisterPage = easyLazy("RegisterPage");
const ContactsPage = easyLazy("ContactsPage");

const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefresh);

  useEffect(() => {
    dispatch(refreshThunk());
  }, [dispatch]);

  return isRefreshing ? (
    <div className="flex justify-center items-center h-screen">
      <InfinitySpin
        visible={true}
        width={80}
        color="#EF4444"
        ariaLabel="infinity-spin-loading"
      />
    </div>
  ) : (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route
          path="register"
          element={
            <RestrictedRoute
              redirectTo="/contacts"
              component={<RegisterPage />}
            />
          }
        />
        <Route
          path="login"
          element={
            <RestrictedRoute redirectTo="/contacts" component={<LoginPage />} />
          }
        />
        <Route
          path="contacts"
          element={
            <PrivateRoute redirectTo="/login" component={<ContactsPage />} />
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
