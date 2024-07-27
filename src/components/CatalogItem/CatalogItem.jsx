import React from "react";
import ModalWindow from "../ModalWindow/ModalWindow";
import Icon from "../Icons/Icon";
import s from "./CatalogItem.module.scss";

const CatalogItem = ({ car, isFavorite, onToggleFavorite }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  // Check if car.accessories and car.functionalities are arrays
  const isArray = (value) => Array.isArray(value);

  return (
    <div className={s.card__item}>
      <div className={s.card__wrapper}>
        <img
          className={s.image}
          src={car?.img || "default-image-url.jpg"}
          alt={`${car?.make || "Default Make"} ${
            car?.model || "Default Model"
          }`}
        />
        <Icon isActive={isFavorite} onClick={() => onToggleFavorite(car)} />
      </div>
      <div className={s.card__text}>
        <div className={s.card__title_box}>
          <div>
            {car?.make || "Default Make"}, {car?.year || "Default Year"}
          </div>
          <div>{car?.rentalPrice || "Default Price"}</div>
        </div>
        <p className={s.card__address}>{car?.address || "Default Address"}</p>
        <ul className={s.card__description}>
          <li className={s.description__item}>
            {car?.rentalCompany || "Default Rental Company"}
          </li>
          <li className={s.description__item}>{car?.type || "Default Type"}</li>
          <li className={s.description__item}>
            {car?.model || "Default Model"}
          </li>
          <li className={s.description__item}>{car?.id || "Default Id"}</li>
        </ul>
      </div>
      <button className={s.card__learn_more_button} onClick={handleOpenModal}>
        Learn More
      </button>
      {isOpen && (
        <ModalWindow onClose={handleCloseModal}>
          <div className={s.modal__wrapper}>
            <img
              src={car?.img || "default-image-url.jpg"}
              alt={`${car?.make || "Default Make"} ${
                car?.model || "Default Model"
              }`}
              className={s.modal__image}
            />
          </div>
          <div className={s.modal__description}>
            <div>
              <h2>
                {car?.make || "Default Make"}
                <span className={s.card__span}>
                  {car?.model || "Default Model"}
                </span>
                , {car?.year || "Default Year"}
              </h2>
            </div>
            <div>
              <p className={s.card__address}>
                {car?.address || "Default Address"}
              </p>
              <ul className={s.card__description}>
                <li className={s.description__item}>
                  Id: {car?.id || "Default Id"}
                </li>
                <li className={s.description__item}>
                  Year: {car?.year || "Default Year"}
                </li>
                <li className={s.description__item}>
                  Type: {car?.type || "Default Type"}
                </li>
                <li className={s.description__item}>
                  Fuel Consumption:{" "}
                  {car?.fuelConsumption || "Default Fuel Consumption"}
                </li>
                <li className={s.description__item}>
                  Engine Size: {car?.engineSize || "Default Engine Size"}
                </li>
              </ul>
              <p>{car?.description || "Default Description"}</p>
            </div>
            <div>
              <p>Accessories and functionalities:</p>
              <ul className={s.card__description}>
                {isArray(car?.accessories) &&
                  car.accessories.map((item, index) => (
                    <li
                      className={s.description__item}
                      key={`accessory-${index}-${item}`}
                    >
                      {item}
                    </li>
                  ))}
                {isArray(car?.functionalities) &&
                  car.functionalities.map((item, index) => (
                    <li
                      className={s.description__item}
                      key={`functionality-${index}-${item}`}
                    >
                      {item}
                    </li>
                  ))}
              </ul>
            </div>
            <div>
              <p>Rental Conditions:</p>
              <ul>
                <li>{car?.rentalConditions || "Default Rental Conditions"}</li>
                <li>Mileage: {car?.mileage / 1000 || "Default Mileage"}</li>
                <li>Price: {car?.rentalPrice || "Default Price"}</li>
              </ul>
            </div>
            <a href="tel:+380730000000" className={s.link}>
              <button className={s.modal__rent_btn}>Rental car</button>
            </a>
          </div>
        </ModalWindow>
      )}
    </div>
  );
};

export default CatalogItem;
