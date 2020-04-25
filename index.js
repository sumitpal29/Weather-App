const request = require("postman-request");
const url = (name) =>
  `http://api.weatherstack.com/current?access_key=a79f13a481e267a05222fbedb2eaae94&query=${name}`;
const geoLoc =
  "https://api.mapbox.com/geocoding/v5/mapbox.places/bangalore.json?access_token=pk.eyJ1Ijoic3VtaXRwYWwyOSIsImEiOiJjazlnM3J1MjUwanRzM2tudWYxdDB5NG0xIn0.Jk0_pXoJ9C4hqwm5yOlNPw";

const localData = {
  geoLocations: {},
};

const getWeatherData = (name, cb) => {
  if (name && cb) {
    request({ url: url(name), json: true }, cb);
  } else {
    console.error("Provide a name of a place!!");
  }
};

getWeatherData("bangalore", (err, response) => {
  if (err) {
    console.error(`Error occured`, err);
  }
  const { body } = response;
  if (body.error) {
    console.error(`Error occured`, body.error);
  } else {
    const currentData = body.current;
    console.log(currentData.temperature);
  }
});

// request({ url: geoLoc, json: true }, function (err, response) {
//   if (err) {
//     console.error(`Error occured`, err);
//   }
//   const { body } = response;
//   const features = body.features;
//   if (features.length) {
//     console.log(`Coordinate ${features[0].center.join(" ")}`);
//   } else {
//     console.log("No results found for the search keywork!!");
//   }
// });
