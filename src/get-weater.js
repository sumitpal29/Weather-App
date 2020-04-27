const request = require("postman-request");
const url = (name) =>
  `http://api.weatherstack.com/current?access_key=a79f13a481e267a05222fbedb2eaae94&query=${name}`;

const getWeatherData = (name, cb) => {
  if (name && cb) {
    request({ url: url(name), json: true }, (err, res) => {
      if (err) {
        cb && cb(err, undefined);
      }
      const { body } = res;
      if (body.error) {
        cb && cb(body.error, undefined);
      } else {
        const currentData = body.current;
        cb && cb(undefined, currentData.temperature);
      }
    });
  } else {
    cb && cb('No name Provided!', undefined);
  }
};

module.exports = getWeatherData;
