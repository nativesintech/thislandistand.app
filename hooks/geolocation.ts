import { DataProps } from "../helpers/types";

import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((resp) => resp.json());

export const useGeolocation = (props: DataProps) => {
  const { data, error } = useSWR<DataProps, string>(
    "api/geolocation",
    fetcher,
    {
      initialData: props,
    }
  );

  return { data, error };
};
