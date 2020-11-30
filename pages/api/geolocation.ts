import { NATIVE_LAND_API_BASE_URL } from "../../helpers/constants";
import {
  KeyCDNResponse,
  NativeLandTerritoriesResponse,
} from "../../helpers/types";

export default async function geolocation(req: any, res: any) {
  const ip: string =
    process.env.NODE_ENV === "development"
      ? process.env.localIP
      : req.connection.remoteAddress;

  try {
    const geolocation: NativeLandTerritoriesResponse = await fetch(
      `https://tools.keycdn.com/geo.json?host=${ip}`
    )
      .then((resp) => {
        return resp.json();
      })
      .then((resp: KeyCDNResponse) => {
        return fetch(
          `${NATIVE_LAND_API_BASE_URL}?maps=territories&position=${resp.data.geo.latitude},${resp.data.geo.longitude}`
        ).then((resp) => resp.json());
      });

    return res
      .status(200)
      .json({ remoteAddress: req.connection.remoteAddress });
  } catch (e) {
    return res.status(400).end("There was an error fetching the geolocation.");
  }
}
