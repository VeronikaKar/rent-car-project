import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../redux/catalog/slice.js";
import { selectCarsPage } from "../../redux/catalog/slice.js";
import s from "./Pagination.module.css";

const Pagination = () => {
  const dispatch = useDispatch();
  const page = useSelector(selectCarsPage);
  const items = useSelector((state) => state.cars.items);

  const totalPages = Math.ceil(items.length / 12);

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
  };

  return (
    <div className={s.pagination}>
      <button
        type="button"
        onClick={() => handlePageChange(page - 1)}
        disabled={page <= 1}
      >
        Previous
      </button>
      <span>
        Page {page} of {totalPages}
      </span>
      <button
        type="button"
        onClick={() => handlePageChange(page + 1)}
        disabled={page >= totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
