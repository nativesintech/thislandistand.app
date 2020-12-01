const geoip = require("geoip-lite");
const fetch = require("node-fetch");

exports.handler = async function (event, _context) {
  const clientIp = event.headers["client-ip"];
  const lookup = geoip.lookup(clientIp);
  const [lat, long] = lookup.ll;

  const resp = await fetch(
    `https://native-land.ca/api/index.php?maps=territories&position=${lat},${long}`
  );
  const json = await resp.json();

  return {
    statusCode: 200,
    body: JSON.stringify(json),
  };
};
