import React from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { setPriceRange } from "../../redux/filters/slice"; // Action to set price range
import { selectPriceRange } from "../../redux/filters/selectors"; // Selector for price range
import s from "./PriceRangeFilter.module.css"; // CSS module

const priceOptions = [
  { value: { from: 0, to: 50 }, label: "$0 - $50" },
  { value: { from: 50, to: 100 }, label: "$50 - $100" },
  { value: { from: 100, to: 200 }, label: "$100 - $200" },
  { value: { from: 200, to: 300 }, label: "$200 - $300" },
  { value: { from: 300, to: 400 }, label: "$300 - $400" },
  { value: { from: 400, to: 500 }, label: "$400 - $500" },
];

const customStyles = {
  container: (provided) => ({
    ...provided,
    width: "100%",
  }),
  control: (provided) => ({
    ...provided,
    borderRadius: "14px 0 0 14px",
    border: "1px solid #8A8A8933",
    boxShadow: "0px 4px 36px 0px #00000005",
    padding: "8px",
  }),
  placeholder: (provided) => ({
    ...provided,
    fontFamily: "Manrope, sans-serif",
    fontSize: "14px",
    fontWeight: 500,
    color: "#121417",
  }),
};

const PriceRangeFilter = () => {
  const dispatch = useDispatch();
  const priceRange = useSelector(selectPriceRange);

  const handleFromChange = (event) => {
    dispatch(setPriceRange({ ...priceRange, from: event.target.value }));
  };

  const handleToChange = (event) => {
    dispatch(setPriceRange({ ...priceRange, to: event.target.value }));
  };

  const handleSelectChange = (selectedOption) => {
    dispatch(setPriceRange(selectedOption.value));
  };

  return (
    <div className={s.priceFilter}>
      <div className={s.range}>
        <input
          type="number"
          className={s.from}
          value={priceRange.from || ""}
          onChange={handleFromChange}
          placeholder="From"
        />
        <input
          type="number"
          className={s.to}
          value={priceRange.to || ""}
          onChange={handleToChange}
          placeholder="To"
        />
      </div>
      <Select
        value={priceOptions.find(
          (option) =>
            option.value.from === priceRange.from &&
            option.value.to === priceRange.to
        )}
        onChange={handleSelectChange}
        options={priceOptions}
        styles={customStyles}
        placeholder="Select rental price range"
      />
    </div>
  );
};

export default PriceRangeFilter;
