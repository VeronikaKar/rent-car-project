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

const CatalogList = () => {
  const dispatch = useDispatch();
  const {
    items: cars,
    favorites,
    status,
    error,
    page,
  } = useSelector((state) => state.cars);

  useEffect(() => {
    dispatch(fetchCars({ page }));
  }, [dispatch, page]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error: {error}</div>;

  return (
    <ul className={s.list}>
      {cars.map((car) => (
        <CatalogItem
          key={car.id}
          car={car}
          isFavorite={favorites.includes(car.id)}
          onAddFavorite={() => dispatch(addFavorite(car.id))}
          onRemoveFavorite={() => dispatch(removeFavorite(car.id))}
        />
      ))}
      <button onClick={() => dispatch(setPage(page + 1))}>Next Page</button>
    </ul>
  );
};

export default CatalogList;
