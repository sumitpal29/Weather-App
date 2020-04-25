const getWeatherData = require('./src/get-weater');
const getLocationData = require('./src/get-location');

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


