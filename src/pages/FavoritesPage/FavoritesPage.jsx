// components/FavoritesPage.js
import React from "react";
import PropTypes from "prop-types";
import CatalogPage from "../CatalogPage/CatalogPage"; // Ensure this is the correct path
import css from "./FavoritesPage.module.css"; // Import CSS module

const FavoritesPage = ({ favorites = [] }) => {
  // Provide default value in destructuring
  return (
    <div className={css.container}>
      {favorites.length === 0 ? (
        <p className={css.notFound}>
          You haven't added any favorite ads yet...
        </p>
      ) : (
        <div>
          <h2 className={css.header}>Your Favorite Car Ads</h2>
          <CatalogPage items={favorites} />
        </div>
      )}
    </div>
  );
};

FavoritesPage.propTypes = {
  favorites: PropTypes.array,
};

export default FavoritesPage;
