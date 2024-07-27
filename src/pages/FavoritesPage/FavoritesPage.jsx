// Example: FavoritesPage.jsx

import React from "react";
import CatalogItem from "../../components/CatalogItem/CatalogItem";

const FavoritesPage = ({ favorites = [], onToggleFavorite }) => {
  return (
    <div>
      <ul>
        {favorites.map((car) => (
          <CatalogItem
            key={car.id} // Ensure that car.id is unique
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
