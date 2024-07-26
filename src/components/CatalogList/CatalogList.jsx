// components/CatalogList/CatalogList.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCars } from "../../redux/catalog/operations.js";
import CatalogItem from "../CatalogItem/CatalogItem";
import ModalWindow from "../ModalWindow/ModalWindow";
import s from "./CatalogList.module.css";

export const CatalogList = ({ cars = [] }) => {
  const dispatch = useDispatch();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const handleOpenModal = (car) => {
    setSelectedCar(car);
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setSelectedCar(null);
  };

  const handleLoadMore = () => {
    dispatch(fetchCars());
  };

  return (
    <>
      <ul className={s.list}>
        {cars.map((car) => (
          <CatalogItem
            key={car.id} // Ensure car.id is unique
            car={car}
            onOpen={() => handleOpenModal(car)}
            isFavorite={car.isFavorite}
          />
        ))}
      </ul>
      {isOpenModal && (
        <ModalWindow onClose={handleCloseModal} car={selectedCar} />
      )}
      <button className={s.btn_load_more} onClick={handleLoadMore}>
        Load more
      </button>
    </>
  );
};

export default CatalogList;
