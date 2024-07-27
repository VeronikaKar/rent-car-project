import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../redux/catalog/slice";
import s from "./Filter.module.scss";

const makes = [
  "Buick",
  "Volvo",
  "HUMMER",
  "Subaru",
  "Mitsubishi",
  "Nissan",
  "Lincoln",
  "GMC",
  "Hyundai",
  "MINI",
  "Bentley",
  "Mercedes-Benz",
  "Aston Martin",
  "Pontiac",
  "Lamborghini",
  "Audi",
  "BMW",
  "Chevrolet",
  "Chrysler",
  "Kia",
  "Land",
];

const Filter = ({ onSearch }) => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.cars.filters);

  const [brand, setBrand] = useState(filters.make || "");
  const [minPrice, setMinPrice] = useState(filters.minPrice || "");
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice || "");

  useEffect(() => {
    dispatch(setFilters({ make: brand, minPrice, maxPrice }));
  }, [brand, minPrice, maxPrice, dispatch]);

  return (
    <div className={s.filter}>
      <h3>Filters</h3>
      <div className={s.filter__field}>
        <label htmlFor="brand">Brand</label>
        <select
          id="brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        >
          <option value="">All</option>
          {makes.map((make, index) => (
            <option key={index} value={make}>
              {make}
            </option>
          ))}
        </select>
      </div>
      <div className={s.filter__field}>
        <label htmlFor="minPrice">Min Price</label>
        <input
          id="minPrice"
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
      </div>
      <div className={s.filter__field}>
        <label htmlFor="maxPrice">Max Price</label>
        <input
          id="maxPrice"
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Filter;
