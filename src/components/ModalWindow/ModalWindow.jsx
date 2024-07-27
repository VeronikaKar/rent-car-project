import Modal from "react-modal";
import { X } from "lucide-react";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { useModal } from "../../hooks/useModal";

import {
  selectCarDetails,
  selectLoadingState,
} from "../../redux/catalog/selectors";
import css from "./CardModal.module.css";

Modal.setAppElement("#root");

const customStylesWithBorder = {
  overlay: {
    backgroundColor: "rgba(18, 20, 23, 0.5)",
    border: "2px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
  },
};

const extractCityFromAddress = (address) => {
  const firstComma = address.indexOf(",");
  const cityAndCountry = address.slice(firstComma + 2);
  const secondComma = cityAndCountry.indexOf(",");
  return cityAndCountry.slice(0, secondComma).trim();
};

const extractCountryFromAddress = (address) => {
  const firstComma = address.indexOf(",");
  const cityAndCountry = address.slice(firstComma + 2);
  const secondComma = cityAndCountry.indexOf(",");
  return cityAndCountry.slice(secondComma + 2).trim();
};

const getRentalConditions = (data) => {
  const conditions = data.split("\n");
  conditions[0] = conditions[0].slice(-2);
  return conditions;
};

const ModalWindow = () => {
  const auto = useSelector(selectCarDetails);
  const isLoading = useSelector(selectLoadingState);
  const { modalIsOpen, closeModal } = useModal();

  if (isLoading) return <Loader />;

  if (!auto) return null; // Handle case where auto is null or undefined

  const {
    img,
    id,
    make,
    model,
    year,
    rentalPrice,
    address,
    type,
    accessories = [],
    photoLink,
    description,
    functionalities = [],
    mileage,
    rentalConditions,
    engineSize,
    fuelConsumption,
  } = auto;

  const city = extractCityFromAddress(address);
  const country = extractCountryFromAddress(address);
  const conditions = getRentalConditions(rentalConditions);

  return (
    <Modal
      className={css.modal}
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStylesWithBorder}
    >
      <X className={css.icon} onClick={closeModal} size={24} />
      <div className={css.thumb}>
        <img src={photoLink || img} alt={`${make} ${model}`} />
      </div>
      <div className={css.content_wrapper}>
        <div>
          <div className={css.title_wrapper}>
            <h3 className={css.title}>
              {make} <span className={css.accent}>{model}</span>, {year}
            </h3>
          </div>
          <ul className={css.list}>
            <li className={css.item}>{city}</li>
            <li className={css.item}>{country}</li>
            <li className={css.item}>Id: {id}</li>
            <li className={css.item}>Year: {year}</li>
            <li className={css.item}>Type: {type}</li>
            <li className={css.item}>Fuel Consumption: {fuelConsumption}</li>
            <li className={css.item}>Engine Size: {engineSize}</li>
          </ul>
          <p className={css.description}>{description}</p>
        </div>
        <div>
          <h4 className={css.sub_heading}>Accessories and functionalities:</h4>
          <ul className={css.accessories_list}>
            {[...accessories, ...functionalities].map((item, index) => (
              <li key={index} className={css.item}>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className={css.sub_heading}>Rental Conditions:</h4>
          <ul className={css.conditions_list}>
            <li className={css.conditions_item}>
              Minimum age:{" "}
              <span className={css.tag_accent}>{conditions[0]}</span>
            </li>
            {conditions.slice(1).map((condition, index) => (
              <li key={index} className={css.conditions_item}>
                {condition}
              </li>
            ))}
            <li className={css.conditions_item}>
              Mileage:{" "}
              <span className={css.tag_accent}>{mileage.toLocaleString()}</span>
            </li>
            <li className={css.conditions_item}>
              Price:{" "}
              <span className={css.tag_accent}>{`${rentalPrice.slice(
                1
              )}$`}</span>
            </li>
          </ul>
        </div>
        <a className={css.button} href="tel:+380730000000">
          Rental car
        </a>
      </div>
    </Modal>
  );
};

export default ModalWindow;
