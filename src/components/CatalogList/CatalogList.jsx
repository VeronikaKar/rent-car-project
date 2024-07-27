import React from "react";
import CatalogItem from "../CatalogItem/CatalogItem";
import s from "./CatalogList.module.scss";

const CatalogList = ({ items, onToggleFavorite }) => {
  return (
    <div className={s.catalog_box}>
      <ul className={s.cards_list}>
        {items.map((car) => (
          <li key={car.id}>
            <CatalogItem car={car} onToggleFavorite={onToggleFavorite} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CatalogList;
