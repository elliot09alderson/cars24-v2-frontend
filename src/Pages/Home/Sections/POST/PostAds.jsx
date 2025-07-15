import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postad } from "../../../../../rtk/slices/adSlice";
import { toast } from "react-toastify";

const PostAds = () => {
  const [imageFile, setImageFile] = useState(undefined);
  const [url, setUrl] = useState("");
  const { ads, loading, successMessage, errorMessage } = useSelector(
    (slice) => slice.ad
  );

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
    }
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [successMessage, errorMessage]);

  const handleForm = (e) => {
    if (e.target.name == "image") {
      setImageFile(e.target.files[0]);
    } else {
      setUrl(e.target.value);
    }
  };

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!url || !imageFile) {
      toast.error("Please provide both a URL and an image.");
      return;
    }

    const formdata = new FormData();
    console.log("Image File:", imageFile);
    console.log("URL:", url);
    formdata.append("url", url);

    formdata.append("image", imageFile);
    const values = formdata;
    dispatch(postad(values));
    setImageFile(null);
    setUrl("");
  };

  return (
    <>
      <div
        className="
      flex items-center justify-center min-h-screen  "
      >
        <div className="py-12 lg:w-[500px]  rounded-xl  shadow-md shadow-blue-300 p-10 ">
          <h2 className="text-4xl drop-shadow-xl font-semibold text-center mb-12 text-gray-800">
            Upload a new Ad
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6  rounded-xl">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Image:
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleForm}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {imageFile && (
                <div className="mt-4 text-center">
                  <img
                    src={URL.createObjectURL(imageFile)}
                    alt="Preview"
                    className="max-w-full h-48 rounded-lg mx-auto"
                  />
                  <p className="mt-2 text-sm text-gray-600">{imageFile.name}</p>
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ad URL:
              </label>
              <input
                type="text"
                id="url"
                name="url"
                value={url}
                onChange={handleForm}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter ad URL"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {loading ? "wait ...." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PostAds;
