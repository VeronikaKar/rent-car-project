import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../redux/catalog/slice.js";
import s from "./Filter.module.css";

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

  
  const handleFilterChange = (e) => {
    dispatch(
      setFilters({
        [e.target.name]: e.target.value,
      })
    );
  };

  return (
    <div className={s.filter}>
      <select name="make" value={filters.make} onChange={handleFilterChange}>
        <option value="">All Makes</option>
        {makes.map((make) => (
          <option key={make} value={make}>
            {make}
          </option>
        ))}
      </select>
      <input
        type="number"
        name="minPrice"
        placeholder="Min Price"
        value={filters.minPrice}
        onChange={handleFilterChange}
      />
      <input
        type="number"
        name="maxPrice"
        placeholder="Max Price"
        value={filters.maxPrice}
        onChange={handleFilterChange}
      />
      <input
        type="number"
        name="minMileage"
        placeholder="Min Mileage"
        value={filters.minMileage}
        onChange={handleFilterChange}
      />
      <input
        type="number"
        name="maxMileage"
        placeholder="Max Mileage"
        value={filters.maxMileage}
        onChange={handleFilterChange}
      />
    </div>
  );
};

export default Filter;
