import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";

import { easyLazy } from "./helpers/easyLazy";
import Loader from "./components/Loader/Loader";

const HomePage = easyLazy("HomePage");
const CatalogPage = easyLazy("CatalogPage");
const FavoritesPage = easyLazy("FavoritesPage");

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="catalog" element={<CatalogPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="*" element={<HomePage />} />
      </Route>
    </Routes>
  );
};

export default App;
