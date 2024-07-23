import { useDispatch, useSelector } from "react-redux";
import s from "./SearchBar.module.css";
import { changeFilter } from "../../redux/filters/slice.js";
import { selectNameFilter } from "../../redux/filters/selectors.js";

export const SearchBar = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter);

  const handleChange = (event) => {
    const filterValue = event.target.value;

    dispatch(changeFilter(filterValue));
  };

  return (
    <div className={s.searchContainer}>
      <p>Find contacts by name</p>
      <div className={s.inputContainer}>
        <input
          type="text"
          onChange={handleChange}
          className={s.inputSearch}
          placeholder="Search contacts..."
          value={filter}
        />
      </div>
    </div>
  );
};
