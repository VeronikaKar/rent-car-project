import React from "react";
import CatalogItem from "../../components/CatalogItem/CatalogItem";

const FavoritesPage = ({ favorites = [], onToggleFavorite }) => {
  return (
    <div>
      <ul>
        {favorites.map((car) => (
          <CatalogItem
            key={car.id}
            car={car}
            isFavorite={true}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </ul>
    </div>
  );
};

export default FavoritesPage;
