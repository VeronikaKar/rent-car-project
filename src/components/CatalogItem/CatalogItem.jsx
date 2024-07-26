import { useState } from "react";
import ModalWindow from "../ModalWindow/ModalWindow";
import Icon from "../Icons/Icon";
import s from "./CatalogItem.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { addFavorite, deleteFavorite } from "../../redux/catalog/slice";
import { selectFavorites } from "../../redux/catalog/selectors";

const CatalogItem = ({ car }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);

  const [isOpen, setIsOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(
    favorites.some((item) => item.id === car.id)
  );

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const toggleFavorites = () => {
    if (isFavorite) {
      dispatch(deleteFavorite(car.id));
    } else {
      dispatch(addFavorite(car));
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <>
      <li key={car.id} className={s.card__item}>
        <div className={s.card__wrapper}>
          <img className={s.image} src={car.img} alt="car" />
          <Icon isActive={isFavorite} onClick={toggleFavorites} />
        </div>
        <div className={s.card__text}>
          <div className={s.card__title_box}>
            <div>
              {car.make}, {car.year}
            </div>
            <div>{car.rentalPrice}</div>
          </div>
          <p className={s.card__address}>{car.address}</p>

          <ul className={s.card__description}>
            <li className={s.description__item}>{car.rentalCompany}</li>
            <li className={s.description__item}>{car.type}</li>
            <li className={s.description__item}>{car.model}</li>
            <li className={s.description__item}>{car.id}</li>
          </ul>
        </div>
        <button className={s.card__learn_more_button} onClick={handleOpenModal}>
          Learn More
        </button>
      </li>
      {isOpen && (
        <ModalWindow onClose={handleCloseModal}>
          <div className={s.modal__wrapper}>
            <img src={car.img} alt="car" className={css.modal__image} />
          </div>
          <div className={s.modal__description}>
            <div>
              <h2>
                {car.make}
                <span className={s.card__span}>{car.model}</span>, {car.year}
              </h2>
            </div>
            <div>
              <p className={s.card__address}>{car.address}</p>
              <ul className={s.card__description}>
                <li className={s.description__item}>Id: {car.id}</li>
                <li className={s.description__item}>Year: {car.year}</li>
                <li className={s.description__item}>Type: {car.type}</li>
                <li className={s.description__item}>
                  Fuel Consumption: {car.fuelConsumption}
                </li>
                <li className={s.description__item}>
                  Engine Size: {car.engineSize}
                </li>
              </ul>
              <p>{car.description}</p>
            </div>
            <div>
              <p>Accessories and functionalities:</p>
              <ul className={s.card__description}>
                {car.accessories.map((item) => (
                  <li className={s.description__item} key={item.id}>
                    {item}
                  </li>
                ))}
                {car.functionalities.map((item) => (
                  <li className={s.description__item} key={item.id}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p>Rental Conditions:</p>
              <ul>
                <li>{car.rentalConditions}</li>
                <li>Mileage: {car.mileage / 1000}</li>
                <li>Price: {car.rentalPrice}</li>
              </ul>
            </div>
            <a href="tel:+380730000000" className={s.link}>
              <button className={s.modal__rent_btn}>Rental car</button>
            </a>
          </div>
        </ModalWindow>
      )}
    </>
  );
};

export default CatalogItem;
