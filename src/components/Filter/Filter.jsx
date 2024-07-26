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

const Filter = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.cars.filters);

  const [brand, setBrand] = useState(filters.make || "");
  const [minPrice, setMinPrice] = useState(filters.minPrice || "");
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice || "");
  const [minMileage, setMinMileage] = useState(filters.minMileage || "");
  const [maxMileage, setMaxMileage] = useState(filters.maxMileage || "");

  useEffect(() => {
    dispatch(
      setFilters({
        make: brand,
        minPrice,
        maxPrice,
        minMileage,
        maxMileage,
      })
    );
  }, [brand, minPrice, maxPrice, minMileage, maxMileage, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "make":
        setBrand(value);
        break;
      case "minPrice":
        setMinPrice(value);
        break;
      case "maxPrice":
        setMaxPrice(value);
        break;
      case "minMileage":
        setMinMileage(value);
        break;
      case "maxMileage":
        setMaxMileage(value);
        break;
      default:
        break;
    }
  };

  const handleSearch = () => {
    // Logic for the search action can be added here
  };

  return (
    <div className={s.filtersContainer}>
      <div className={s.filter}>
        <label htmlFor="make">Make:</label>
        <div className={s.selectWrapper}>
          <select
            name="make"
            value={brand}
            onChange={handleChange}
            className={s.select}
          >
            <option value="">All Makes</option>
            {makes.map((make) => (
              <option key={make} value={make}>
                {make}
              </option>
            ))}
          </select>
          <div className={s.chevronDown}></div>
        </div>
      </div>
      <div className={s.filter}>
        <label htmlFor="minPrice">Min Price:</label>
        <input
          type="number"
          name="minPrice"
          placeholder="Min Price"
          value={minPrice}
          onChange={handleChange}
          className={s.inputFrom}
        />
      </div>
      <div className={s.filter}>
        <label htmlFor="maxPrice">Max Price:</label>
        <input
          type="number"
          name="maxPrice"
          placeholder="Max Price"
          value={maxPrice}
          onChange={handleChange}
          className={s.inputTo}
        />
      </div>
      <div className={s.filter}>
        <label htmlFor="minMileage">Min Mileage:</label>
        <input
          type="number"
          name="minMileage"
          placeholder="Min Mileage"
          value={minMileage}
          onChange={handleChange}
          className={s.inputFrom}
        />
      </div>
      <div className={s.filter}>
        <label htmlFor="maxMileage">Max Mileage:</label>
        <input
          type="number"
          name="maxMileage"
          placeholder="Max Mileage"
          value={maxMileage}
          onChange={handleChange}
          className={s.inputTo}
        />
      </div>
      <button className={s.searchButton} onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default Filter;
