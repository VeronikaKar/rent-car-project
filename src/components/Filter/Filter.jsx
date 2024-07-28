import { useDispatch } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import CustomSelect from "./CustomSelect";
import { fetchCarsByQuery } from "../../redux/catalog/operations";
import { saveValue } from "../../redux/catalog/slice.js";
import css from "./Filter.module.scss";

const createBrandOptions = (brands) => {
  return brands
    .filter((brand) => typeof brand === "string" && brand.trim() !== "")
    .map((brand) => ({
      value: brand.toLowerCase(),
      label: brand,
    }));
};

const createPriceOptions = (prices) => {
  return prices
    .filter((price) => typeof price === "string" && price.trim() !== "")
    .sort((a, b) => a - b)
    .map((option) => ({
      value: option,
      label: `$${option}`,
    }));
};

const createMileageOptions = (mileages) => {
  return mileages
    .filter((mileage) => typeof mileage === "string" && mileage.trim() !== "")
    .sort((a, b) => a - b)
    .map((option) => ({
      value: option,
      label: `${option} miles`,
    }));
};

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

const Filter = () => {
  const dispatch = useDispatch();
  const [brandOptions, setBrandOptions] = useState([]);
  const [priceOptions, setPriceOptions] = useState([]);
  const [mileageOptions, setMileageOptions] = useState([]);

  useEffect(() => {
    fetch("/makes.json") // Fetching from the public directory
      .then((response) => response.json())
      .then((data) => setBrandOptions(createBrandOptions(data)));

    fetch("/prices.json") // Fetching from the public directory
      .then((response) => response.json())
      .then((data) => setPriceOptions(createPriceOptions(data)));

    fetch("/mileages.json") // Fetching from the public directory
      .then((response) => response.json())
      .then((data) => setMileageOptions(createMileageOptions(data)));
  }, []);

  const handleSubmit = (values) => {
    dispatch(saveValue(values)); // Save form values to the Redux store
    dispatch(fetchCarsByQuery(values)); // Fetch cars based on the form values
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <Form className={css.form}>
          <div className={css.field}>
            <Field
              name="make"
              component={CustomSelect}
              options={brandOptions}
              placeholder="Car brand"
            />
            <ErrorMessage name="make" component="div" className={css.error} />
          </div>
          <div className={css.field}>
            <Field
              name="rentalPrice"
              component={CustomSelect}
              options={priceOptions}
              placeholder="Max rental price"
            />
            <ErrorMessage
              name="rentalPrice"
              component="div"
              className={css.error}
            />
          </div>
          <div className={css.field}>
            <div className={css.inputWrapper}>
              <Field
                name="from"
                component={CustomSelect}
                options={mileageOptions}
                placeholder=" Mileage from"
              />
              <Field
                name="to"
                component={CustomSelect}
                options={mileageOptions}
                placeholder=" Mileage to"
              />
            </div>
            <ErrorMessage name="from" component="div" className={css.error} />
            <ErrorMessage name="to" component="div" className={css.error} />
          </div>
          <button type="submit" className={css.button}>
            Search
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default Filter;
