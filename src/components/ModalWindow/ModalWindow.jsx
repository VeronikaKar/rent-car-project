import React from "react";
import { createPortal } from "react-dom";
import s from "./Modal.module.css";

const Modal = ({ car, onClose }) => {
  return createPortal(
    <div className={s.overlay} onClick={onClose}>
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        <button className={s.closeButton} onClick={onClose}>
          ×
        </button>
        <h2>
          {car.make} {car.model}
        </h2>
        <p>{car.description}</p>
        <p>Rental Price: ${car.rentalPrice}/hour</p>
        <p>Mileage: {car.mileage.toLocaleString()} km</p>
     
      </div>
    </div>,
    document.body
  );
};

export default Modal;
