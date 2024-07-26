import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setPage,
  addFavorite,
  removeFavorite,
} from "../../redux/catalog/slice.js";
import CatalogItem from "../CatalogItem/CatalogItem";
import s from "./CatalogList.module.css";
import { fetchCars } from "../../redux/catalog/operations.js";
import Pagination from "../Pagination/Pagination";
import Filter from "../Filter/Filter";
import { selectFilteredCars } from "../../redux/catalog/slice.js";

const CatalogList = () => {
  const dispatch = useDispatch();
  const { favorites, error, page, filters } = useSelector(
    (state) => state.cars
  );
  const cars = useSelector(selectFilteredCars);

  useEffect(() => {
    dispatch(fetchCars({ page, filters }));
  }, [dispatch, page, filters]);

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Filter />
      <ul className={s.list}>
        {cars.map((car) => (
          <CatalogItem
            key={car.id}
            car={car}
            isFavorite={favorites.includes(car.id)}
          />
        ))}
      </ul>
      <Pagination />
    </div>
  );
};

export default CatalogList;
