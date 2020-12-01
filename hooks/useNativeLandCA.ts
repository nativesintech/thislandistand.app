import useSWR from "swr";
import { NativeLandTerritoriesResponse } from "../types";

const fetcher = (url: string) => fetch(url).then((resp) => resp.json());

export const useNativeLandCA = () => {
  const { data, error } = useSWR<NativeLandTerritoriesResponse, string>(
    "/.netlify/functions/geolocation",
    fetcher
  );

  return { data, error };
};
