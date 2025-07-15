import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addVehicle } from "../../../../../rtk/slices/vehicleSlice.js";
import { toast } from "react-toastify";
const Postcar = () => {
  const dispatch = useDispatch();

  const { loading, errorMessage, successMessage } = useSelector(
    (slice) => slice.ad
  );
  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
    if (successMessage) {
      toast.success(successMessage);
    }
  }, [errorMessage, successMessage]);
  const formik = useFormik({
    initialValues: {
      name: "",
      brand: "",
      model: "",
      year: "",
      totalKmDriven: "",
      price: "",
      fuelType: "",
      vehicleimages: [], // For multiple vehicleimages
      thumbnail: null, // For single thumbnail file
      owners: "",
      location: "",
      serialNo: "xxxx",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      brand: Yup.string().required("Brand is required"),
      model: Yup.string().required("Model is required"),
      location: Yup.string().required("Location is required"),
      year: Yup.number()
        .required("Year is required")
        .min(1900, "Year must be after 1900")
        .max(new Date().getFullYear(), "Year cannot be in the future"),
      totalKmDriven: Yup.number()
        .required("Total KM Driven is required")
        .min(0, "KM Driven cannot be negative"),
      price: Yup.number()
        .required("Price is required")
        .min(0, "Price cannot be negative"),
      fuelType: Yup.string()
        .required("Fuel Type is required")
        .oneOf(
          ["Petrol", "Diesel", "Electric", "Hybrid", "CNG", "LPG"],
          "Invalid fuel type"
        ),
      owners: Yup.string()
        .required("Owners is required")
        .oneOf(
          ["1stOwner", "2ndOwner", "3rdOwner", "4thOwner"],
          "Invalid owner type"
        ),
      vehicleimages: Yup.array()
        .min(1, "At least one image is required")
        .test("is-file", "Invalid file type", (value) => {
          return value.every((file) => file instanceof File);
        }),
      thumbnail: Yup.mixed()
        .required("Thumbnail is required")
        .test("is-file", "Invalid file type", (value) => value instanceof File),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const formData = new FormData(); // Use FormData for file uploads

        // Append all fields to FormData
        for (const key in values) {
          if (key === "vehicleimages") {
            // Append each image file
            values.vehicleimages.forEach((image) => {
              formData.append("vehicleimages", image);
            });
          } else if (key === "thumbnail") {
            // Append thumbnail file
            formData.append("thumbnail", values.thumbnail);
          } else {
            formData.append(key, values[key]);
          }
        }

        // Send POST request with FormData

        dispatch(addVehicle({ values: formData })).then((resp) => {
          console.log(resp);
          if (resp.payload?.data) {
            resetForm();
          }
        });
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Failed to submit, try again.");
      }
    },
  });

  // Handle multiple vehicleimages upload
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    formik.setFieldValue("vehicleimages", files); // Set files directly
  };

  // Handle thumbnail upload
  const handleThumbnailChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      formik.setFieldValue("thumbnail", file); // Set thumbnail file
    }
  };

  return (
    <div className="min-h-screen  bg-gray-100 flex items-center justify-center">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-12 mt-24 rounded-lg shadow-lg w-full max-w-4xl"
      >
        <h2 className="text-3xl  font-semibold mb-10 text-center">
          Add Vehicle
        </h2>
        <div className="flex w-full flex-col lg:flex-row  gap-20">
          {/* Name */}
          <div className="mb-4 w-full w-full">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter vehicle name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.name}
              </div>
            ) : null}
          </div>

          {/* Brand */}
          <div className="mb-4 w-full">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="brand"
            >
              Brand
            </label>
            <input
              type="text"
              id="brand"
              name="brand"
              placeholder="Enter vehicle brand"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.brand}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.brand && formik.errors.brand ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.brand}
              </div>
            ) : null}
          </div>
          <div className="mb-4 w-full">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="model"
            >
              Model
            </label>
            <input
              type="text"
              id="model"
              name="model"
              placeholder="Enter vehicle model"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.model}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.model && formik.errors.model ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.model}
              </div>
            ) : null}
          </div>
        </div>

        {/* Model */}

        {/* Location */}
        <div className="mb-4 w-full">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="location"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Enter Location"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.location}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.location && formik.errors.location ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.location}
            </div>
          ) : null}
        </div>

        {/* Year */}
        <div className="flex lg:flex-row flex-col w-full gap-8">
          <div className="mb-4 w-full">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="year"
            >
              Year
            </label>
            <input
              type="number"
              id="year"
              name="year"
              placeholder="Enter vehicle year"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.year}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.year && formik.errors.year ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.year}
              </div>
            ) : null}
          </div>

          {/* Total KM Driven */}
          <div className="mb-4 w-full">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="totalKmDriven"
            >
              Total KM Driven
            </label>
            <input
              type="number"
              id="totalKmDriven"
              name="totalKmDriven"
              placeholder="Enter total KM driven"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.totalKmDriven}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.totalKmDriven && formik.errors.totalKmDriven ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.totalKmDriven}
              </div>
            ) : null}
          </div>

          {/* Price */}
          <div className="mb-4 w-full">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="price"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Enter vehicle price"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.price}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.price && formik.errors.price ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.price}
              </div>
            ) : null}
          </div>
        </div>

        {/* Fuel Type */}

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="mb-4 w-full">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="fuelType"
            >
              Fuel Type
            </label>
            <select
              id="fuelType"
              name="fuelType"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fuelType}
              className="w-full px-3 h-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select fuel type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
              <option value="CNG">CNG</option>
              <option value="LPG">LPG</option>
            </select>
            {formik.touched.fuelType && formik.errors.fuelType ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.fuelType}
              </div>
            ) : null}
          </div>

          {/* Owners */}
          <div className="mb-4 w-full">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="owners"
            >
              Owners
            </label>
            <select
              id="owners"
              name="owners"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.owners}
              className="w-full px-3  h-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select owner type</option>
              <option value="1stOwner">1st owner</option>
              <option value="2ndOwner">2nd owner</option>
              <option value="3rdOwner">3rd owner</option>
              <option value="4thOwner">4th owner</option>
            </select>
            {formik.touched.owners && formik.errors.owners ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.owners}
              </div>
            ) : null}
          </div>
        </div>

        {/* Thumbnail Upload */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="thumbnail"
          >
            Thumbnail
          </label>
          <input
            type="file"
            id="thumbnail"
            name="thumbnail"
            accept="image/*"
            onChange={handleThumbnailChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.thumbnail && formik.errors.thumbnail ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.thumbnail}
            </div>
          ) : null}
        </div>

        {/* Thumbnail Preview */}
        {formik.values.thumbnail && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Thumbnail Preview
            </label>
            <img
              src={URL.createObjectURL(formik.values.thumbnail)}
              alt="Thumbnail Preview"
              className="w-20 h-20 object-cover rounded-lg"
            />
          </div>
        )}

        {/* vehicleimages Upload */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="vehicleimages"
          >
            vehicleimages
          </label>
          <input
            type="file"
            id="vehicleimages"
            name="vehicleimages"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.vehicleimages && formik.errors.vehicleimages ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.vehicleimages}
            </div>
          ) : null}
        </div>

        {/* Preview vehicleimages */}
        {formik.values.vehicleimages.length > 0 && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Preview vehicleimages
            </label>
            <div className="flex flex-wrap gap-2">
              {formik.values.vehicleimages.map((image, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt={`Preview ${index}`}
                  className="w-20 h-20 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex ">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 cursor-pointer w-full text-white px-4 py-2 mt-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {loading ? "wait .... " : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Postcar;
