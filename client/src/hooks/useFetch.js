import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url, params = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async (params = {}) => {
      setLoading(true);
      try {
        const res = await axios.get(url, {
          params
        });
        setData(res.data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData(params);
  }, [url]);

  const reFetch = async (params = {}) => {
    setLoading(true);
    try {
      const res = await axios.get(url, {
        params
      });
      setData(res.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return { data, loading, error, reFetch };
};

export default useFetch;
