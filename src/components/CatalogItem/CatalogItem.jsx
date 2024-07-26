import React from "react";
import { useDispatch } from "react-redux";
import { HeartIcon, PhoneIcon } from "lucide-react";
import s from "./CatalogItem.module.css";
import { addFavorite, removeFavorite } from "../../redux/catalog/slice.js";

export const CatalogItem = ({ car, isFavorite, onOpen }) => {
  const dispatch = useDispatch();
  const {
    img,
    make,
    model,
    rentalPrice,
    year,
    city,
    country,
    rentalCompany,
    type,
    id,
    accessories = [], 
    mileage,
  } = car;

 
  const formattedMileage = mileage != null ? mileage.toLocaleString() : "N/A";


  const handleFavoriteToggle = () => {
    if (isFavorite) {
      dispatch(removeFavorite(car));
    } else {
      dispatch(addFavorite(car));
    }
  };

  return (
    <li className={s.item}>
      <div className={s.img_block}>
        <img src={img} alt={`${make} ${model}`} />
        <button
          type="button"
          onClick={handleFavoriteToggle}
          className={`${s.heart} ${isFavorite ? s.favorite : ""}`}
        >
          {isFavorite ? <HeartIcon color="#FF0000" /> : <HeartIcon />}
        </button>
      </div>
      <div className={s.titles_block}>
        <h3>
          {make || "Make N/A"}
          <span className={s.model}> {model || "Model N/A"}</span>,{" "}
          {year || "Year N/A"}
        </h3>
        <p className={s.title_price}>{rentalPrice || "Price N/A"}</p>
      </div>
      <div className={s.labels_block}>
        <ul className={s.label_list}>
          <li className={s.label_item}>{city || "City N/A"}</li>
          <li className={s.label_item}>{country || "Country N/A"}</li>
          <li className={s.label_item}>
            {rentalCompany || "Rental Company N/A"}
          </li>
        </ul>
        <ul className={s.label_list}>
          <li className={s.label_item}>{type || "Type N/A"}</li>
          <li className={s.label_item}>{model || "Model N/A"}</li>
          <li className={s.label_item}>{id || "ID N/A"}</li>
          <li className={s.label_item}>
            {accessories.length > 0
              ? accessories[0].slice(0, 15)
              : "No accessories"}
          </li>
        </ul>
      </div>
      <div className={s.btn_block}>
        <button onClick={onOpen} className={s.learnMoreButton}>
          Learn more
        </button>
      </div>
      <a href={`tel:+380730000000`} className={s.rentButton}>
        Rent this car
        <PhoneIcon />
      </a>
    </li>
  );
};

export default CatalogItem;
