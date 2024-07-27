import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Select from "react-select";

import { selectReferenceCatalog } from "../../redux/catalog/selectors.js";
import { fetchCarsByQuery } from "../../redux/catalog/operations.js";
import { saveValue } from "../../redux/catalog/slice.js";

import css from "./Filter.module.scss";

// Validation schema using Yup
const validationSchema = Yup.object({
  make: Yup.string().required("Car brand is required"),
  rentalPrice: Yup.number()
    .min(0, "Price must be positive")
    .required("Price is required"),
  from: Yup.number().min(0, "Mileage must be positive"),
  to: Yup.number().min(
    Yup.ref("from"),
    "End mileage must be greater than start mileage"
  ),
});
const initialValues = {
  make: "",
  rentalPrice: "",
  from: "",
  to: "",
};
const selectStyles = {
  control: (provided) => ({
    ...provided,
    width: 224,
    height: 48,
    borderRadius: 14,
    border: "none",
    padding: "14px 18px",
    backgroundColor: "#f7f7fb",
  }),
  container: (provided) => ({
    ...provided,
    color: "#121417",
    fontWeight: 500,
    fontSize: 18,
    lineHeight: 1.11,
  }),
  valueContainer: (provided) => ({
    ...provided,
    width: 186,
    height: 18,
    padding: 0,
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#121417",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#121417",
  }),
  input: (provided) => ({
    ...provided,
    width: 186,
    height: 18,
    padding: 0,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    height: 20,
    width: 20,
    position: "absolute",
    cursor: "pointer",
    top: 14,
    right: 14,
    transform: state.isFocused ? "rotate(180deg)" : "none",
  }),
  menu: (provided) => ({
    ...provided,
    border: "1px solid rgba(18, 20, 23, 0.05)",
    borderRadius: 14,
    padding: "14px 18px",
    paddingRight: 8,
    margin: 0,
  }),
  menuList: (provided) => ({
    ...provided,
    color: "rgba(18, 20, 23, 0.2)",
    fontSize: 16,
    lineHeight: 1.25,
    display: "flex",
    flexDirection: "column",
    gap: 8,
    maxHeight: 272,
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: 8,
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: 10,
      backgroundColor: "rgba(18, 20, 23, 0.2)",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    cursor: "pointer",
    color: state.isSelected ? "#F8466D" : "#121417",
    backgroundColor: state.isFocused
      ? "rgba(248, 70, 109, 0.1)"
      : "transparent",
    borderRadius: 8,
    padding: "14px 18px",
  }),
};

const Filter = () => {
  const dispatch = useDispatch();
  const catalog = useSelector(selectReferenceCatalog);

  const handleSubmit = (values) => {
    dispatch(saveValue(values));
    dispatch(fetchCarsByQuery(values));
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, handleChange, setFieldValue }) => (
        <Form className={css.form}>
          <Select
            options={catalog.map((car) => ({
              value: car.make,
              label: car.make,
            }))}
            placeholder="Car brand"
            styles={selectStyles}
            onChange={(option) => setFieldValue("make", option.value)}
          />
          <ErrorMessage name="make" component="div" className={css.error} />
          <div className={css.priceWrapper}>
            <label htmlFor="rentalPrice" className={css.label}>
              Max rental price
            </label>
            <Field
              type="text"
              name="rentalPrice"
              placeholder="$"
              className={css.input}
            />
            <ErrorMessage
              name="rentalPrice"
              component="div"
              className={css.error}
            />
          </div>
          <div className={css.mileageWrapper}>
            <label htmlFor="from" className={css.label}>
              Mileage
            </label>
            <div className={css.inputWrapper}>
              <Field
                type="text"
                name="from"
                placeholder="from"
                className={css.input}
              />
              <Field
                type="text"
                name="to"
                placeholder="to"
                className={css.input}
              />
            </div>
            <ErrorMessage name="from" component="div" className={css.error} />
            <ErrorMessage name="to" component="div" className={css.error} />
          </div>
          <button type="submit" className={css.submitButton}>
            Apply
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default Filter;
