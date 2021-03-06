const request = require("postman-request");
const url = (name) =>
  `http://api.weatherstack.com/current?access_key=a79f13a481e267a05222fbedb2eaae94&query=${name}`;

const getWeatherData = (name, cb) => {
  if (name && cb) {
    request({ url: url(name), json: true }, (err, { body }) => {
      if (err) {
        cb && cb(err, undefined);
      }
      if (body.error) {
        cb && cb(body.error, undefined);
      } else {
        const currentData = body.current;
        cb && cb(undefined, currentData);
      }
    });
  } else {
    cb && cb("No name Provided!", undefined);
  }
};

module.exports = getWeatherData;
