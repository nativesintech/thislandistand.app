import axios, { AxiosResponse } from "axios";
import { useGeolocation } from "@anthonyhumphreys/hooks";
import React from "react";
import * as RD from "@devexperts/remote-data-ts";
import { NativeLandTerritoriesResponse } from "../types";

export const useNativeLandCA = () => {
  const [data, setData] = React.useState<
    RD.RemoteData<string, NativeLandTerritoriesResponse>
  >(RD.initial);
  const { position, positionError, positionLoading } = useGeolocation();

  React.useEffect(() => {
    if (positionLoading) {
      setData(RD.pending);
    }
  }, [positionLoading]);

  React.useEffect(() => {
    if (positionError) {
      setData(RD.failure(JSON.stringify(positionError)));
    }
  }, [positionError]);

  React.useEffect(() => {
    if (position) {
      setData(RD.pending);
      axios
        .get(
          `https://native-land.ca/api/index.php?maps=territories&position=${position.coords.latitude},${position.coords.longitude}`
        )
        .then((resp: AxiosResponse<NativeLandTerritoriesResponse>) => {
          setData(RD.success(resp.data));
        })
        .catch((e) => {
          setData(RD.failure(JSON.stringify(e)));
        });
    }
  }, [position]);

  return { data } as const;
};
