import React from "react";
import Modal from "react-modal";
import s from "./ModalWindow.module.css";

Modal.setAppElement("#root"); // Important for accessibility

export const ModalWindow = ({ car, onClose }) => {
  if (!car) return null;

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
    accessories,
    mileage,
  } = car;
  const formattedMileage = mileage.toLocaleString();

  return (
    <Modal
      isOpen={!!car}
      onRequestClose={onClose}
      className={s.popupCardItem}
      overlayClassName={s.overlay}
    >
      <button className={s.closeButton} onClick={onClose}>
        &times;
      </button>
      <div>
        <img src={img} alt={`${make} ${model}`} className={s.image} />
        <div className={s.text}>
          <h2>{`${make} ${model}`}</h2>
          <p>
            <strong>Year:</strong> {year}
          </p>
          <p>
            <strong>Price per hour:</strong> ${rentalPrice}
          </p>
          <p>
            <strong>Mileage:</strong> {formattedMileage} km
          </p>
          <p>
            <strong>City:</strong> {city}
          </p>
          <p>
            <strong>Country:</strong> {country}
          </p>
          <p>
            <strong>Rental Company:</strong> {rentalCompany}
          </p>
          <p>
            <strong>Type:</strong> {type}
          </p>
          <p>
            <strong>Accessories:</strong> {accessories.join(", ")}
          </p>
        </div>
        <div className={s.rentalConditions}>
          <span className={`${s.condition} ${s.minimumAge}`}>
            Minimum Age: 21
          </span>
          <span className={`${s.condition} ${s.validLicense}`}>
            Valid License
          </span>
          <span className={`${s.condition} ${s.securityDeposit}`}>
            Security Deposit
          </span>
          <span className={`${s.condition} ${s.price}`}>${rentalPrice}</span>
        </div>
        <button
          className={s.rentalCarButton}
          onClick={() => (window.location.href = "tel:+380730000000")}
        >
          Rent this car
        </button>
      </div>
    </Modal>
  );
};

export default ModalWindow;
