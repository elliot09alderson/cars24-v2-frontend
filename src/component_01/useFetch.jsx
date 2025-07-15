import React, { useEffect, useState } from "react";

const useFetch = ({ url, values }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetch() {
      try {
        setLoading(true);
        if (values) {
          const result = await axios.post(url, values);
          setData(result.data);
        } else {
          const result = await axios.get(url);
          setData(result.data);
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
      }
    }
    fetch();
  }, []);
  return [data, loading, error];
};

export default useFetch;
