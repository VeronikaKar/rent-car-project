import React from "react";
import { useDispatch } from "react-redux";
import { HeartIcon, PhoneIcon } from "lucide-react";
import { addFavorite, removeFavorite } from "../../redux/catalog/slice.js";
import s from "./CatalogItem.module.css";

const CatalogItem = ({ car, isFavorite }) => {
  const dispatch = useDispatch();

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      dispatch(removeFavorite(car.id));
    } else {
      dispatch(addFavorite(car.id));
    }
  };

  return (
    <li className={s.item}>
      <div className={s.img_block}>
        <img src={car.img} alt={`${car.make} ${car.model}`} />
        <button
          type="button"
          onClick={handleFavoriteToggle}
          className={`${s.heart} ${isFavorite ? s.favorite : ""}`}
        >
          <HeartIcon color={isFavorite ? "#FF0000" : "#000"} />
        </button>
      </div>
      <div className={s.titles_block}>
        <h3>
          {car.make} <span className={s.model}>{car.model}</span>, {car.year}
        </h3>
        <p className={s.title_price}>${car.rentalPrice}/hour</p>
      </div>
      <div className={s.labels_block}>
        <ul className={s.label_list}>
          <li className={s.label_item}>{car.city}</li>
          <li className={s.label_item}>{car.country}</li>
          <li className={s.label_item}>{car.rentalCompany}</li>
        </ul>
        <ul className={s.label_list}>
          <li className={s.label_item}>{car.type}</li>
          <li className={s.label_item}>{car.id}</li>
          <li className={s.label_item}>
            {Array.isArray(car.accessories) ? car.accessories.join(", ") : ""}
          </li>
        </ul>
      </div>
      <div className={s.btn_block}>
        <button className={s.learnMoreButton} onClick={() => onOpen(car)}>
          Learn more
        </button>
      </div>
      <a href={`tel:+380730000000`} className={s.rentButton}>
        Rent this car <PhoneIcon />
      </a>
    </li>
  );
};

export default CatalogItem;
