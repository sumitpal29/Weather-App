const request = require("postman-request");
const url = (name) =>
  `http://api.weatherstack.com/current?access_key=a79f13a481e267a05222fbedb2eaae94&query=${name}`;

const getWeatherData = (name, cb) => {
  if (name && cb) {
    request({ url: url(name), json: true }, cb);
  } else {
    console.error("Provide a name of a place!!");
  }
};

module.exports = getWeatherData;
