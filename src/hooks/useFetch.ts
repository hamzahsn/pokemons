import { useState, useEffect } from "react";

export type TUseFetch = {
  path?: string;
  limit?: number;
  page?: number;
  param?: string;
};
const useFetch = ({ path, limit, page, param }: TUseFetch) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const url = new URL(`${process.env.REACT_APP_POKEMON_API}` || "");

        if (limit && page) {
           url.searchParams.set("limit", limit.toString());
          url.searchParams.set("offset", ((page - 1) * limit).toString());
        }

        if (param) {
          url.pathname = url.pathname + `/${param}`;
        }
       

        const response = await fetch(url.toString());

        if (!response.ok) {
          throw new Error("Data could not be fetched!", {
            cause: {
              response,
            },
          });
        }

        return response.json();
      } catch (err: any) {
        switch (err?.cause?.response?.status) {
          case 400:
            setError("Bad Request");
            break;
          case 404:
            setError("Not Found");
            break;
          case err?.cause?.response?.status >= 500:
            setError("Internal Server Error");
            break;
          default: {
            setError(err);
            break;
          }
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData()
      .then((data) => setData(data))
      .catch((err) => setError(err));
  }, [path, limit, page, param]);

  return { data, error, loading };
};

export default useFetch;
