import { useSelector } from "react-redux";
import CatalogList from "../../components/CatalogList/CatalogList";
import {
  selectFavoriteCars,
  selectLoading,
} from "../../redux/catalog/selectors.js";

import css from "./FavoritesPage.module.scss";

const FavoritesPage = () => {
  const favorites = useSelector(selectFavoriteCars);
  const loading = useSelector(selectLoading);

  return (
    <main className={css.mainContent}>
      {loading && <p>Loading...</p>}
      {!loading && favorites.length === 0 && <p>No favorite cars found</p>}
      <CatalogList favorites={favorites} />
    </main>
  );
};

export default FavoritesPage;
