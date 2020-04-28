const getWeatherData = require('./src/get-weater');
const getLocationData = require('./src/get-location');

getLocationData('bangalore', (err, response) => {
    if(err) {
        console.log(err)
    } else {
        console.log(response)
        getWeatherData(response.location, (err, weatherData) => {
            if(err) {
                console.log(err)
            } else {
                console.log(weatherData)
            }
        });
    }
});


