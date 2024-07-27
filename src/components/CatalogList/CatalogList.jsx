import { useDispatch, useSelector } from "react-redux";
import CatalogItem from "../../components/CatalogItem/CatalogItem";
import { useModal } from "../../hooks/useModal";
import { fetchCarById } from "../../redux/catalog/operations.js";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../redux/catalog/slice.js";
import css from "./CatalogList.module.scss";
import { selectFavoriteCars } from "../../redux/catalog/selectors";

const CatalogList = ({ catalog, favorites }) => {
  const savedFavorites = useSelector(selectFavoriteCars);
  const dispatch = useDispatch();
  const { isModalOpen, openModal, closeModal } = useModal();

  const carList = catalog || favorites;

  const handleLearnMoreClick = (id) => {
    openModal();
    dispatch(fetchCarById(id));
  };

  const toggleAddToFavoritesClick = (id) => {
    if (savedFavorites.some((car) => car.id === id)) {
      dispatch(removeFromFavorites(id));
      return;
    }
    dispatch(addToFavorites(id));
  };

  return (
    <ul className={css.cardList}>
      {carList.map((car) => (
        <li className={css.cardListItem} key={car.id}>
          <CatalogItem
            car={car}
            handleClick={{
              handleLearnMoreClick,
              toggleAddToFavoritesClick,
            }}
          />
        </li>
      ))}
      {/* Optionally, include a Modal component here if you need to render it */}
    </ul>
  );
};

export default CatalogList;
