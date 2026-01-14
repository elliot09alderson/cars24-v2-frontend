import React, { useEffect, useState } from "react";
import { api } from "../../api/api.js";

const useFetch = ({ url, values }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetch() {
      try {
        setLoading(true);
        if (values) {
          const result = await api.post(url, values);
          setData(result.data);
        } else {
          const result = await api.get(url);
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
