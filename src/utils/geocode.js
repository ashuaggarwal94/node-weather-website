const request = require("request");

const geoCode = (address, callback) => {
  let url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1IjoiYXNodWFnZ2Fyd2FsOTQiLCJhIjoiY2tjYXN1dWJwMGNhYzJ0dW5qcDdoYmp5ZiJ9.--fqR2A0-myvM7g2ClVqtQ&limit=1";
  request.get({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location service!", undefined);
    } else if (body.message || body.features.length === 0) {
      callback("Unable to find the location", undefined);
    } else {
      const data = {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        place: body.features[0].place_name,
      };
      callback(undefined, data);
    }
  });
};

module.exports = geoCode;
