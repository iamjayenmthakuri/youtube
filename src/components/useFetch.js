import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      fetch(url)
        .then((res) => {
          if (!res.ok) {
            throw Error("Something Went Wrong : CAN'T RESPONSE");
          }
          return res.json();
        })
        .then((data) => {
          setData(data.items);
          setIsPending(false);
          setError(null);
          console.log(data, "value");
        })
        .catch((err) => {
          setIsPending(false);
          setError(err.message);
        });
    }, 1000);
  }, [url]);
  return { data, isPending, error };
};
export default useFetch;
