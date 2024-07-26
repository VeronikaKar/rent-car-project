// components/CatalogPage/CatalogPage.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "../../redux/catalog/operations.js";
import { selectFilters } from "../../redux/filters/selectors.js";
import CatalogList from "../../components/CatalogList/CatalogList";
import PriceRangeFilter from "../../components/PriceRangeFilter/PriceRangeFilter";
import MileageRangeFilter from "../../components/MileageRangeFilter/MileageRangeFilter";
import MakesFilter from "../../components/MakesFilter/MakesFilter";
import s from "./CatalogPage.module.css";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const cars = useSelector((state) => state.cars.items); // Adjust this according to your state structure
  const page = useSelector((state) => state.cars.page); // Adjust this according to your state structure

  useEffect(() => {
    dispatch(fetchCars({ page, filters }));
  }, [dispatch, filters, page]);

  return (
    <div>
      <div className={s.searchBar}>
        <MakesFilter />
        <PriceRangeFilter />
        <MileageRangeFilter />
        <button
          className={s.searchButton}
          onClick={() => dispatch(fetchCars({ page, filters }))}
        >
          Search
        </button>
      </div>
      <CatalogList cars={cars} /> {/* Pass the list of cars here */}
    </div>
  );
};

export default CatalogPage;
