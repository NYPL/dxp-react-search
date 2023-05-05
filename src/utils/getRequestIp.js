import requestIp from "request-ip";

/**
 * Get the request ip address from a variety of sources.
 *
 * @param {object} request - request object contains the
 * @return {string} ipAddress - the clients up address.
 */
function getRequestIp(request, debugIpAddress) {
  // Default to the request-ip value for the ip address.
  let ipAddress = requestIp.getClientIp(request);
  // Check x-forwarded-for header.
  // This will return multiple values, need to get the first one.
  // Ex: '200.28.171.103, 10.255.0.25, 10.0.0.59,::ffff:10.0.0.187,::ffff:10.0.0.168'
  if (request.headers["x-forwarded-for"]) {
    const addresses = request.headers["x-forwarded-for"].split(",");
    ipAddress = addresses[0];
  }
  // Use the Imperva IP if headers are present, with external IP 65.88.x.x
  if (request.headers["incap-client-ip"]) {
    ipAddress = request.headers["incap-client-ip"];
  }
  // Use test_ip value if it's set as a query param for debug mode.
  if (debugIpAddress) {
    ipAddress = debugIpAddress;
  }
  return ipAddress;
}

export default getRequestIp;
