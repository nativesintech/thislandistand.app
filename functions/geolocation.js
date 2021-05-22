const geoip = require("geoip-lite");
const fetch = require("node-fetch");

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

  if (lookup === null) {
    return {
      statusCode: 500,
      body: JSON.stringify(`could not do a proper lookup of client ip.`),
    };
  }

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
