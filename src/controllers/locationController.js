const { GOOGLE_API_KEY } = require("../../Variables");
const Location = require("../schemas/Locations");
const axios = require("axios");

const postLocation = async (req, res) => {
  const address = req.body.address;
  var lat = "";
  var lng = "";
  await axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${GOOGLE_API_KEY}`
    )
    .then((response) => {
      lat = response.data.results[0].geometry.location.lat;
      lng = response.data.results[0].geometry.location.lng;
    })
    .catch((error) => {
      console.log(error);
    });

  try {
    await Location.create({
      latitude: lat,
      longitude: lng,
      addres: address,
    });

    res.status(201).json({ message: "Location added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getClosestLocation = async (req, res) => {
  const userLat = req.userLat;
  const userLng = req.userLng;

  const locations = await Location.find({});

  locations.forEach(function (location) {
    const locLat = location.latitude;
    const locLng = location.longitude;
    const distance = getDistance(
      { lat: userLat, lng: userLng },
      { lat: locLat, lng: locLng }
    );

    location.distance = distance;
  });

  locations.sort(function (a, b) {
    return a.distance - b.distance;
  });

  const locatieApropiata = locations[0];

  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${locatieApropiata.latitude},${locatieApropiata.longitude}&zoom=15&size=400x400&markers=color:red%7C${locatieApropiata.latitude},${locatieApropiata.longitude}`;

  res.send({ mapUrl: mapUrl });
};

function getDistance(from, to) {
  const earthRadius = 6371; // in kilometers
  const latDiff = ((to.lat - from.lat) * Math.PI) / 180;
  const lngDiff = ((to.lng - from.lng) * Math.PI) / 180;
  const a =
    Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
    Math.cos((from.lat * Math.PI) / 180) *
      Math.cos((to.lat * Math.PI) / 180) *
      Math.sin(lngDiff / 2) *
      Math.sin(lngDiff / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;

  return distance;
}

module.exports = { postLocation, getClosestLocation };
