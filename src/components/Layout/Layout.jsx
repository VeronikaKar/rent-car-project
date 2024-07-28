import { Suspense } from "react";
import Navigation from "../Navigation/Navigation";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="w-full max-w-screen-lg mx-auto px-4">
      <div className="mb-4">
        <Navigation />
      </div>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default Layout;
