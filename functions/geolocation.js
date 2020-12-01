import geoip from "geoip-lite";
import fetch from "node-fetch";

/*
  import { GeoIpLiteLookup } from "../types";
  import { APIGatewayProxyEvent, APIGatewayProxyCallback } from "aws-lambda";
*/

exports.handler = async function (
  event /* APIGatewayProxyEvent */,
  _context /* unknown */,
  _callback /* APIGatewayProxyCallback */
) {
  const clientIp = event.headers["client-ip"];
  const lookup /* GeoIpLiteLookup */ = geoip.lookup(clientIp);
  const [lat, long] = lookup.ll;

  try {
    const resp = await fetch(
      `https://native-land.ca/api/index.php?maps=territories&position=${lat},${long}`
    );
    const json = await resp.json();

    return {
      statusCode: 200,
      body: JSON.stringify(json),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(
        `There was an error fetching territories: ${new Error(e)}`
      ),
    };
  }
};
