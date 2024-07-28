import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CatalogList from "../../components/CatalogList/CatalogList";
import Filter from "../../components/Filter/Filter";
import Loader from "../../components/Loader/Loader";
import LoadMore from "../../components/LoadMore/LoadMore";

import {
  fetchInitialCatalog,
  fetchMoreCars,
} from "../../redux/catalog/operations";
import {
  selectCatalogItems,
  selectLoadingState,
  selectFilteredCatalogItems,
} from "../../redux/catalog/selectors";

import css from "./CatalogPage.module.scss";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const cars = useSelector(selectCatalogItems);
  const filteredCars = useSelector(selectFilteredCatalogItems);
  const loading = useSelector(selectLoadingState);

  useEffect(() => {
    dispatch(fetchInitialCatalog());
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
      <div className={css.buttonContainer}>
        <LoadMore onClick={handleLoadMoreClick} />
      </div>
    </main>
  );
};

export default CatalogPage;
