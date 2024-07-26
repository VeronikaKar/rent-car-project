import React from "react";

import s from "./CatalogList.module.scss";
import CatalogItem from "../CatalogItem/CatalogItem";

const CatalogList = ({ items }) => {
  return (
    <div className={s.catalog_box}>
      <ul className={s.cards_list}>
        {items.map((car) => (
          <li key={car.id}>
            <CatalogItem car={car} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CatalogList;
