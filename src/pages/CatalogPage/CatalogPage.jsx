import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "../../redux/catalog/operations.js";
import { selectIsLoading, selectCars } from "../../redux/catalog/selectors.js";
import Filter from "../../components/Filter/Filter";

import s from "./CatalogPage.module.scss";
import { LoadMore } from "../../components/LoadMore/LoadMore";
import CatalogList from "../../components/CatalogList/CatalogList.jsx";
import Loader from "../../components/Loader/Loader.jsx";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectCars);
  const isLoading = useSelector(selectIsLoading);

  const [displayedItems, setDisplayedItems] = useState([]);
  const [filteredItemsList, setFilteredItemsList] = useState([]);
  const [carBrands, setCarBrands] = useState([]);
  const [priceRanges, setPriceRanges] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentFilters, setCurrentFilters] = useState({});

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  const applyFilters = useCallback(
    (filters, items) => {
      const { brand, price, mileageFrom, mileageTo } = filters;

      const filterCars = (car) => {
        return (
          (!brand || car.make.toLowerCase().includes(brand.toLowerCase())) &&
          (!price ||
            parseInt(car.rentalPrice.replace(/\D/g, ""), 10) <=
              parseInt(price, 10)) &&
          (!mileageFrom || car.mileage >= parseInt(mileageFrom, 10)) &&
          (!mileageTo || car.mileage <= parseInt(mileageTo, 10))
        );
      };

      const filtered = items.filter(filterCars);

      setFilteredItemsList(filtered);
      setDisplayedItems(filtered.slice(0, currentPage * 12));
    },
    [currentPage]
  );

  useEffect(() => {
    if (items.length) {
      const uniqueBrands = [...new Set(items.map((car) => car.make))];
      setCarBrands(uniqueBrands);

      const uniquePrices = [
        ...new Set(
          items.map((car) => parseInt(car.rentalPrice.replace(/\D/g, ""), 10))
        ),
      ].sort((a, b) => a - b);
      setPriceRanges(uniquePrices);

      applyFilters(currentFilters, items);
    }
  }, [items, currentFilters, applyFilters]);

  useEffect(() => {
    applyFilters(currentFilters, items);
  }, [currentFilters, items, currentPage, applyFilters]);

  const handleFilterChange = (filters) => {
    setCurrentFilters(filters);
    setCurrentPage(1);
  };

  const loadMoreItems = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const allItemsLoaded = displayedItems.length >= filteredItemsList.length;

  if (isLoading && currentPage === 1) {
    return <Loader />;
  }

  return (
    <div className={s.container}>
      <Filter
        onSearch={handleFilterChange}
        brands={carBrands}
        prices={priceRanges}
      />
      {displayedItems.length > 0 ? (
        <>
          <CatalogList items={displayedItems} />
          {!allItemsLoaded && (
            <div className={s.buttonContainer}>
              <LoadMore onClick={loadMoreItems} />
            </div>
          )}
        </>
      ) : (
        <p className={s.noResults}>No cars available...</p>
      )}
    </div>
  );
};

export default CatalogPage;
