const request = require("postman-request");
const geoLoc = (locationStr) =>
  `https://api.mapbox.com/geocoding/v5/mapbox.places/${locationStr}.json?access_token=pk.eyJ1Ijoic3VtaXRwYWwyOSIsImEiOiJjazlnM3J1MjUwanRzM2tudWYxdDB5NG0xIn0.Jk0_pXoJ9C4hqwm5yOlNPw`;
const localLocationData = {};

const getLocationData = (locationStr, callback) => {
  if (localLocationData[locationStr]) {
    callback && callback(localLocationData[locationStr]);
  } else {
    request({ url: geoLoc(locationStr), json: true }, function (err, { body }) {
      if (err) {
        callback(err, undefined);
      }

      const { features } = body;

      if (features.length && callback) {
        const locData = {
          long: features[0].center[0],
          lat: features[0].center[1],
          location: features[0].text,
          place_name: features[0].place_name,
        };

        // localLocationData[locationStr] = locData;
        callback(undefined, locData);
      } else {
        callback("No results found for the search keywork!!", undefined);
      }
    });
  }
};

module.exports = getLocationData;
