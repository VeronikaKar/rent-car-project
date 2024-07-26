import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../redux/catalog/slice.js";
import CatalogItem from "../../components/CatalogItem/CatalogItem";
import Filter from "../../components/Filter/Filter";
import Pagination from "../../components/Pagination/Pagination";
import s from "./CatalogPage.module.css";
import { fetchCars } from "../../redux/catalog/operations";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const {
    items: cars,
    favorites,
    loading,
    error,
    page,
  } = useSelector((state) => state.cars);

  useEffect(() => {
    dispatch(fetchCars(page));
  }, [dispatch, page]);

  const handleNextPage = () => {
    dispatch(setPage(page + 1));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={s.container}>
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
      <button onClick={handleNextPage} className={s.loadMoreButton}>
        Load More
      </button>
      <Pagination />
    </div>
  );
};

export default CatalogPage;
