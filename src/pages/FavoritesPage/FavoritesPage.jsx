import React from "react";
import { useSelector } from "react-redux";
import CatalogItem from "../../components/CatalogItem/CatalogItem";
import s from "./FavoritesPage.module.css";

const FavoritesPage = () => {
  const { favorites } = useSelector((state) => state.cars);

  return (
    <div className={s.container}>
      <h1>Your Favorites</h1>
      <ul className={s.list}>
        {favorites.map((carId) => (
          <CatalogItem key={carId} carId={carId} isFavorite={true} />
        ))}
      </ul>
    </div>
  );
};

export default FavoritesPage;
