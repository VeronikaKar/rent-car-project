import React from "react";
import { useSelector } from "react-redux";
import { selectFavorites } from "../../redux/catalog/selectors";
import CatalogItem from "../../components/CatalogItem/CatalogItem";
import s from "./FavoritesPage.module.scss";

const FavoritesPage = () => {
  const favorites = useSelector(selectFavorites);

  return (
    <div className={s.container}>
      <h1>Your Favorites</h1>
      {favorites.length === 0 ? (
        <p>No favorites added yet.</p>
      ) : (
        <ul className={s.list}>
          {favorites.map((carId) => (
            <CatalogItem key={carId} carId={carId} isFavorite={true} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesPage;
