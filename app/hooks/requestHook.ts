import axios from "axios";
import { useState } from "react";

const ERP_URL = import.meta.env.VITE_ERP_URL;

const useRequestHook = (
  URL: string,
  method = "GET",
  initialRequestData: any = null,
  includeToken = true,
  includeDomain = true
) => {
  const url = `${ERP_URL}/api/${URL}`;
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (requestData = initialRequestData) => {
    setLoading(true);
    setError(null);

    try {
      let token: string | null = null;
      if (includeToken) {
        token = localStorage.getItem("token");
        if (!token) throw new Error("No authentication token found");
      }

      let headers: Record<string, string> = {};
      if (includeToken) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      let payload = requestData || {};

      // Inject domainName if needed and payload is not FormData
      if (includeDomain && !(payload instanceof FormData)) {
        const domainName = localStorage.getItem("domainName");
        if (!domainName) throw new Error("No domain name found in localStorage");
        payload = { ...payload, domainName };
      }

      let response;

      switch (method.toUpperCase()) {
        case "GET":
          response = await axios.get(url, {
            headers,
            params: payload,
          });
          break;
        case "POST":
          response = await axios.post(url, payload, {
            headers: payload instanceof FormData ? headers : { ...headers, "Content-Type": "application/json" },
          });
          break;
        case "PUT":
          response = await axios.put(url, payload, {
            headers: payload instanceof FormData ? headers : { ...headers, "Content-Type": "application/json" },
          });
          break;
        case "DELETE":
          response = await axios.delete(url, {
            headers,
            data: payload,
          });
          break;
        default:
          throw new Error(`Unsupported request method: ${method}`);
      }

      console.log("API Response:", response);
      setData(response.data);

      if (response.data.code !== 200 && response.data.success !== true) {
        throw new Error(response.data.message || "Unknown error occurred");
      }
    } catch (err: any) {
      console.error("API Error:", err);
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setError(null);
  };

  return [fetchData, data, isLoading, error, reset] as const;
};

export default useRequestHook;
