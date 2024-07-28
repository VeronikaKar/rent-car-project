import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectFavoriteCars } from "../../redux/catalog/selectors.js";
import Icon from "../Icons/Icon";
import css from "./CatalogItem.module.scss";

const extractCityFromAddress = (address) => {
  const firstPoint = address.indexOf(",");
  const cityAndCountry = address.slice(firstComma + 2); // Remove "Street, "
  const secondPoint = cityAndCountry.indexOf(",");
  const city = cityAndCountry.slice(0, secondComma).trim();
  return city;
};

const extractCountryFromAddress = (address) => {
  const firstPoint = address.indexOf(",");
  const cityAndCountry = address.slice(firstPoint + 2);
  const secondPoint = cityAndCountry.indexOf(",");
  const country = cityAndCountry.slice(secondPoint + 2).trim();
  return country;
};

const CatalogItem = ({ car, handleClick }) => {
  const favorites = useSelector(selectFavoriteCars);
  const { toggleAddToFavoritesClick, handleLearnMoreClick } = handleClick;
  const {
    img,
    id,
    make,
    model,
    year,
    rentalPrice,
    address,
    rentalCompany,
    type,
    accessories,
    photoLink,
  } = car;

  return (
    <div className={css.card}>
      <div className={css.thumbnail}>
        <img
          src={photoLink || img}
          alt={`${make} ${model}`}
          className={css.image}
        />
        <Icon
          className={clsx(css.favoriteIcon, {
            [css.active]: favorites.some((auto) => car.id === id),
          })}
          onClick={() => toggleAddToFavoritesClick(id)}
          size={18}
        />
      </div>
      <div className={css.cardContent}>
        <div className={css.titleSection}>
          <h3 className={css.cardTitle}>
            {make} <span className={css.cardAccent}>{model}</span>, {year}
          </h3>
          <span className={css.cardPrice}>{rentalPrice}</span>
        </div>
        <ul className={css.infoList}>
          <li className={css.infoItem}>{extractCityFromAddress(address)}</li>
          <li className={css.infoItem}>{extractCountryFromAddress(address)}</li>
          <li className={css.infoItem}>{rentalCompany}</li>
          <li className={css.infoItem}>{type}</li>
          <li className={css.infoItem}>{model}</li>
          <li className={css.infoItem}>{id}</li>
          <li className={css.infoItem}>{accessories[0]}</li>
        </ul>
        <button
          className={css.actionButton}
          onClick={() => handleLearnMoreClick(id)}
          type="button"
        >
          Learn more
        </button>
      </div>
    </div>
  );
};

export default CatalogItem;
