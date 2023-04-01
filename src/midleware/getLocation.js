const axios = require("axios");
const { IP2_LOC_API_KEY } = require("../../Variables");

const getUserIp = async (req, res, next) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress; //get ip from the user
  console.log(ip);

  await axios
    .request(
      `https://api.ip2loc.com/${IP2_LOC_API_KEY}/${ip}?include=location_latitude,location_longitude`
    )
    .then((response) => {
      console.log(response.data);
      next();
    })
    .catch((err) => {
      console.log(err);
      next();
    });
};

module.exports = getUserIp;
