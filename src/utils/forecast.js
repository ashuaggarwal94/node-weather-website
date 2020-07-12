const request = require("request");
const forecast = (latitude, longitude, callback) => {
  let url =
    "http://api.weatherstack.com/current?access_key=c4fcb948e1c31d4c61f2b4226c23c211&query=" +
    latitude +
    "," +
    longitude;
  request.get({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find the location", undefined);
    } else {
      let currentTemp = body.current;
      callback(
        undefined,
        currentTemp.weather_descriptions[0] +
          ". It is currently " +
          currentTemp.temperature +
          " degree out. It feels like " +
          currentTemp.feelslike +
          " degree out."
      );
    }
  });
};

module.exports = forecast;
