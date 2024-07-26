// src/components/MakesFilter/MakesFilter.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCarMake } from "../../redux/filters/slice"; // Adjust path as needed
import s from "./MakesFilter.module.css";

const MakesFilter = () => {
  const dispatch = useDispatch();
  const selectedMake = useSelector((state) => state.filters.make);
  const [makes, setMakes] = useState([]);

  useEffect(() => {
    const fetchMakes = async () => {
      // Replace this static list with an API call if necessary
      const makesList = [
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
      setMakes(makesList);
    };

    fetchMakes();
  }, []);

  const handleMakeChange = (event) => {
    dispatch(setCarMake(event.target.value));
  };

  return (
    <div className={s.container}>
      <label htmlFor="make-select" className={s.label}>
        Select Make:
      </label>
      <div className={s.selectWrapper}>
        <select
          id="make-select"
          value={selectedMake || ""} 
          onChange={handleMakeChange}
          className={s.select}
        >
          <option value="">All Makes</option>
          {makes.map((make) => (
            <option key={make} value={make}>
              {make}
            </option>
          ))}
        </select>
        <span className={s.chevronDown}></span>
      </div>
    </div>
  );
};

export default MakesFilter;
