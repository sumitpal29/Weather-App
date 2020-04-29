const path = require("path"); // core-module cross os path manipulation
const express = require("express");
const getWeatherData = require("./src/get-weater");
const getLocationData = require("./src/get-location");
const app = express();

// serving a static dicrectory
// order app to use express.static(dir)
app.use(express.static(path.join(__dirname, "./public")));

app.get("", (req, res) => {
  let weatherStr = "";
  if (req.query && req.query.location) {
    getLocationData(
      req.query.location,
      (err, { location, place_name: place } = {}) => {
        if (err || !location) {
          console.log(err || location);
        } else {
          getWeatherData(location, (error, weatherData) => {
            if (error) {
              console.log(error);
            } else {
              weatherStr = `weather forcast for ${place} - Temprature ${weatherData} degree celcius.`;
              res.send(weatherStr || "Hello Express Server!!");
            }
          });
        }
      }
    );
  } else {
    res.send(`<h1>Express</h1>`);
  }
});

app.get("/weather", (req, res) => {
  res.status(200).send({
    temprature: 20,
    metric: "celcius"
  })
});

app.listen("3000", () => {
  console.log("server started!!");
});
