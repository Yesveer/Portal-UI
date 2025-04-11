import axios from "axios";
import { useState } from "react";

const BASE_URL = import.meta.env.VITE_ERP_URL;

type Method = "GET" | "POST" | "PUT" | "DELETE";

const useRequestHook = (
  endpoint: string,
  method: Method = "GET",
  initialData: any = null,
  useToken = true,
  useDomain = true
) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (customData: any = initialData) => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const domainName = localStorage.getItem("domainName");

      let payload = customData || {};

      // Add domain if required and payload is not FormData
      if (useDomain && !(payload instanceof FormData)) {
        if (!domainName) throw new Error("No domain name found");
        payload = { ...payload, domainName };
      }

      // Set headers
      const headers: any = {};
      if (useToken && token) headers["Authorization"] = `Bearer ${token}`;
      if (!(payload instanceof FormData)) headers["Content-Type"] = "application/json";

      const config = {
        method,
        url: `${BASE_URL}/api/${endpoint}`,
        headers,
        ...(method === "GET" || method === "DELETE"
          ? { params: payload }
          : { data: payload }),
      };

      const res = await axios(config);
      setData(res.data);

      if (res.data.code !== 200 && res.data.success !== true) {
        throw new Error(res.data.message || "Request failed");
      }
    } catch (err: any) {
      console.error("Request Error:", err);
      setError(err?.message || "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setError(null);
  };

  return [ fetchData, data, loading, error, reset ];
};

export default useRequestHook;
