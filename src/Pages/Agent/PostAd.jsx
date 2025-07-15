import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addVehicle } from "../../../rtk/slices/vehicleSlice";

const initialValues = {
  name: "",
  serialNo: "",
  brand: "",
  model: "",
  year: "",
  totalKmDriven: "",
  price: "",
  location: "",
  bodyType: "",
  transmission: "",
  fuelType: "",
  images: [],
  thumbnail: "",
  owners: "",
  seat: "",
  color: "",
  isDisabled: "",
};

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  serialNo: Yup.string().required("Serial No is required"),
  brand: Yup.string().required("Brand is required"),
  model: Yup.string().required("Model is required"),
  year: Yup.number().required("Year is required").typeError("Must be a number"),
  totalKmDriven: Yup.number()
    .required("Total Km Driven is required")
    .typeError("Must be a number"),
  price: Yup.number()
    .required("Price is required")
    .typeError("Must be a number"),
  location: Yup.string().required("Location is required"),
  fuelType: Yup.string().required("Fuel Type is required"),
  owners: Yup.string().required("Owner is required"),
});

const handleSubmit = (values, { resetForm }) => {
  const formData = new FormData();

  Object.keys(values).forEach((key) => {
    if (key === "images" && values[key].length > 0) {
      values[key].forEach((image) => {
        formData.append("images", image);
      });
    } else {
      formData.append(key, values[key]);
    }
  });

  dispatch(addVehicle(formData)).then(() => {
    resetForm();
  });

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Post Vehicle Advertisement</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <Field
                  name="name"
                  type="text"
                  className="w-full p-2 border rounded-md"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label
                  htmlFor="serialNo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Serial No
                </label>
                <Field
                  name="serialNo"
                  type="text"
                  className="w-full p-2 border rounded-md"
                />
                <ErrorMessage
                  name="serialNo"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="brand"
                  className="block text-sm font-medium text-gray-700"
                >
                  Brand
                </label>
                <Field
                  name="brand"
                  type="text"
                  className="w-full p-2 border rounded-md"
                />
                <ErrorMessage
                  name="brand"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default VehicleForm;
