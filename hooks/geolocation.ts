import { NativeLandTerritoriesResponse } from "../helpers/types";

import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((resp) => resp.json());

export const useGeolocation = () => {
  const { data, error } = useSWR<NativeLandTerritoriesResponse, string>(
    "api/geolocation",
    fetcher
  );

  return { data, error };
};
