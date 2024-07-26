import { Suspense } from "react";
import Navigation from "../Navigation/Navigation";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="max-w-screen-md mx-auto px-4">
      <Navigation />
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </div>
  );
};
export default Layout;
