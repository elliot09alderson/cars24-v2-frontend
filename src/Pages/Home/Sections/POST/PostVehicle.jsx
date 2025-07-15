import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import karlo from "/logo/karlo.png";
import { addVehicle } from "../../../../../rtk/slices/vehicleSlice";
import { messageClear } from "../../../../../rtk/slices/authSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const VehicleSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  serialNo: Yup.string().required("Serial No is required"),
  brand: Yup.string().required("Brand is required"),
  model: Yup.string().required("Model is required"),
  year: Yup.number().required("Year is required").min(1900),
  totalKmDriven: Yup.number().required("Total KM Driven is required"),
  price: Yup.number().required("Price is required"),
  location: Yup.string().required("Location is required"),
  bodyType: Yup.string().oneOf(["suv", "sedan", "hatchback", "car"]),
  transmission: Yup.string().oneOf(["manual", "automatic"]),
  fuelType: Yup.string()
    .oneOf(["Petrol", "Diesel", "Electric", "Hybrid", "CNG", "LPG"])
    .required("Fuel Type is required"),
  owners: Yup.string()
    .oneOf(["1stOwner", "2ndOwner", "3rdOwner", "4thOwner"])
    .required("Owner info is required"),
  seat: Yup.number().oneOf([4, 5, 6, 7, 8, 9]),
  color: Yup.string(),
  images: Yup.mixed().required("At least one image is required"),
});

const PostVehicle = () => {
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const { successMessage, errorMessage } = useSelector(
    (slice) => slice.vehicle
  );
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    } else if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);
  const handleImageChange = (event, setFieldValue) => {
    const files = Array.from(event.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImages(files);
    setPreviewImages(previews);
    setFieldValue("images", files);
  };

  const removeImage = (index, setFieldValue) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = previewImages.filter((_, i) => i !== index);
    setImages(newImages);
    setPreviewImages(newPreviews);
    setFieldValue("images", newImages);
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();
    setLoader(true);
    Object.entries(values).forEach(([key, val]) => {
      if (key === "images") {
        val.forEach((img) => formData.append("vehicleimages", img));
      } else {
        formData.append(key, val);
      }
    });

    // You can now send `formData` to backend with fetch or axios
    dispatch(addVehicle(formData));
    setLoader(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mb-12 bg-white rounded-md">
      <Formik
        initialValues={{
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
          owners: "",
          seat: "",
          color: "",
          images: [],
        }}
        validationSchema={VehicleSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, errors }) => (
          <Form className="space-y-4">
            <div className="flex justify-between items-center gap-8 flex-col mb-12 lg:mb-0 lg:flex-row">
              <h1 className="text-6xl racing  uppercase font-bold lg:my-8 my-0 text-center">
                Add Vehicle
              </h1>
              <img src={karlo} className="w-40 lg:flex hidden" alt="" />
              <Link to={"/agent/myads"}>
                <div className="px-8 py-3 bg-black text-white text-lg border-none h-fit rounded-md cursor-pointer">
                  {" "}
                  All Ads
                </div>
              </Link>
            </div>

            {/* Reusable input field */}
            <div className="grid grid-cols-2 gap-4">
              {[
                "name",
                "serialNo",
                "brand",
                "model",
                "year",
                "totalKmDriven",
                "price",
                "location",
                "color",
              ].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 capitalize">
                    {field}
                  </label>
                  <Field
                    name={field}
                    type={
                      field === "year" ||
                      field === "price" ||
                      field === "totalKmDriven"
                        ? "number"
                        : "text"
                    }
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name={field}
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              ))}
            </div>

            {/* Dropdowns */}
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  name: "bodyType",
                  options: ["suv", "sedan", "hatchback", "car"],
                },
                { name: "transmission", options: ["manual", "automatic"] },
                {
                  name: "fuelType",
                  options: [
                    "Petrol",
                    "Diesel",
                    "Electric",
                    "Hybrid",
                    "CNG",
                    "LPG",
                  ],
                },
                {
                  name: "owners",
                  options: ["1stOwner", "2ndOwner", "3rdOwner", "4thOwner"],
                },
              ].map(({ name, options }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-700 capitalize">
                    {name}
                  </label>
                  <Field
                    as="select"
                    name={name}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select</option>
                    {options.map((opt) => (
                      <option value={opt} key={opt}>
                        {opt}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name={name}
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Seat
                </label>
                <Field
                  as="select"
                  name="seat"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select</option>
                  {[4, 5, 6, 7, 8, 9].map((num) => (
                    <option value={num} key={num}>
                      {num}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="seat"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>

            {/* Image Upload & Preview */}
            <div>
              <label
                htmlFor="images"
                className="block text-sm font-medium text-gray-700"
              >
                Images
              </label>
              <input
                type="file"
                id="images"
                accept="image/*"
                multiple
                onChange={(e) => handleImageChange(e, setFieldValue)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
              />
              {previewImages.length > 0 && (
                <div className="flex flex-wrap gap-4 mt-6">
                  {previewImages.map((image, index) => (
                    <div key={index} className="relative w-24 h-24">
                      <img
                        src={image}
                        alt={`Preview ${index}`}
                        className="w-full h-full object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index, setFieldValue)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 px-2 text-xs"
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <ErrorMessage
                name="images"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loader}
              className="w-full p-3 bg-blue-500 mt-4 text-white font-bold rounded-md hover:bg-blue-600"
            >
              {loader ? "Uploading..." : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PostVehicle;
