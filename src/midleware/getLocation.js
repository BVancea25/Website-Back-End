const axios = require("axios");
const { IP2_LOC_API_KEY } = require("../../Variables");

const getUserIp = async (req, res, next) => {
  // const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress; //get ip from the user

  const ip = "86.123.9.83";
  var userLat = "";
  var userLng = "";
  await axios
    .request(
      `https://api.ip2loc.com/${IP2_LOC_API_KEY}/${ip}?include=location_latitude,location_longitude`
    )
    .then((response) => {
      userLat = response.data.location_latitude;
      userLng = response.data.location_longitude;
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
    });

  req.userLat = userLat;
  req.userLng = userLng;
  next();
};

module.exports = getUserIp;
