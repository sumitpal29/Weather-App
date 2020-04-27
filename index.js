const getWeatherData = require('./src/get-weater');
const getLocationData = require('./src/get-location');

getWeatherData("bangalore", (err, response) => {
    if(err) {
        console.log(err)
    } else {
        console.log(response)
    }
});


