import axios, { AxiosError, AxiosResponse } from "axios";
import useSWR from "swr";
import { NativeLandTerritoriesResponse } from "../types";

const fetcher = async (url: string) => {
  const result = await axios
    .get(url)
    .then((res: AxiosResponse<NativeLandTerritoriesResponse>) => res.data)
    .catch((e: AxiosError<string>) => {
      const error = new Error("an error occurred while fetching data");
      if (e.response) {
        error.message = `an error was returned from the server: ${e.response.data}`;
      } else if (e.request) {
        error.message = "a response was not received from server";
      } else {
        error.message = "an unknown error occurred";
      }

      throw error;
    });

  return result;
};

export const useNativeLandCA = () => {
  const { data, error } = useSWR<NativeLandTerritoriesResponse, Error>(
    "/.netlify/functions/geolocation",
    fetcher
  );

  return { data, error };
};
