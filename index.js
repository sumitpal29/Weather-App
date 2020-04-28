const getWeatherData = require('./src/get-weater');
const getLocationData = require('./src/get-location');
const arg = process.argv[2]
console.log('Forcasting weather for ', arg)

getLocationData(arg, (err, {location,  place_name: place} = {}) => {
    if(err || !location) {
        console.log(err || location)
    } else {
        getWeatherData(location, (error, weatherData) => {
            if(error) {
                console.log(error)
            } else {
                console.log(`weather forcast for ${place} - Temprature ${weatherData} degree celcius.`)
            }
        });
    }
});


