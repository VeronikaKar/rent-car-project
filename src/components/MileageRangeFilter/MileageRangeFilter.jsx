import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMileageRange } from "../../redux/filters/slice";
import { selectMileageRange } from "../../redux/filters/selectors";
import s from "./MileageRangeFilter.module.css";

const MileageRangeFilter = () => {
  const dispatch = useDispatch();
  const mileageRange = useSelector(selectMileageRange);

  const handleMinMileageChange = (event) => {
    dispatch(setMileageRange({ ...mileageRange, min: event.target.value }));
  };

  const handleMaxMileageChange = (event) => {
    dispatch(setMileageRange({ ...mileageRange, max: event.target.value }));
  };

  return (
    <div className={s.mileageRange}>
      <label className={s.label}>
        Min Mileage:
        <input
          type="number"
          value={mileageRange.min || ""}
          onChange={handleMinMileageChange}
          placeholder="Min Mileage"
          className={s.input}
        />
      </label>
      <label className={s.label}>
        Max Mileage:
        <input
          type="number"
          value={mileageRange.max || ""}
          onChange={handleMaxMileageChange}
          placeholder="Max Mileage"
          className={s.input}
        />
      </label>
    </div>
  );
};

export default MileageRangeFilter;
