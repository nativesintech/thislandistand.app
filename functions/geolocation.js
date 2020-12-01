const requestIp = require("request-ip");
const geoip = require("geoip-lite");

exports.handler = async function (event, context) {
  // const clientIP = requestIp.getClientIp(event);
  // const geo = geoip.lookup(clientIP);

  return {
    statusCode: 200,
    body: JSON.stringify({ event, context }),
  };
};
