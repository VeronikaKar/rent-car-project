import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CatalogList from "../../components/CatalogList/CatalogList";
import Filter from "../../components/Filter/Filter";
import Loader from "../../components/Loader/Loader";
import LoadMore from "../../components/LoadMore/LoadMore";

import {
  fetchInitialCars,
  fetchMoreCars,
} from "../../redux/catalog/operations.js";
import {
  selectCars,
  selectLoading,
  selectFilteredCars,
} from "../../redux/catalog/selectors.js";

import css from "./CatalogPage.module.scss";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const cars = useSelector(selectCars);
  const filteredCars = useSelector(selectFilteredCars);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchInitialCars());
  }, [dispatch]);

  const handleLoadMoreClick = () => {
    dispatch(fetchMoreCars());
  };

  return (
    <main className={css.mainContent}>
      <Filter />
      {loading && <Loader />}
      {!loading && cars.length === 0 && <p>No cars available</p>}
      <CatalogList catalog={filteredCars.length ? filteredCars : cars} />
      <LoadMore onClick={handleLoadMoreClick} />
    </main>
  );
};

export default CatalogPage;
