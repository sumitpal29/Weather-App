const path = require("path"); // core-module cross os path manipulation
const express = require("express");
const hbs = require('hbs');

const getWeatherData = require("./src/get-weater");
const getLocationData = require("./src/get-location");
// Application
const app = express();
//directories
const publicDirectory = path.join(__dirname, "./public");
const views = path.join(__dirname, "./templates/views");
const partialPath = path.join(__dirname, "./templates/partials");

// serving a static dicrectory
// order app to use express.static(dir)
app.use(express.static(publicDirectory));
// set up view engine with express -> key - value
app.set("view engine", "hbs");
// setting up custom directory for views
app.set('views', views);
// Setting up partials
hbs.registerPartials(partialPath)

app.get("", (req, res) => {
  // let weatherStr = "";
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
              // weatherStr = `weather forcast for ${place} - Temprature ${weatherData} degree celcius.`;
              // res.send(weatherStr || "Hello Express Server!!");
              res.render("index", {
                name: "Sumit",
                place,
                weatherData,
              });
            }
          });
        }
      }
    );
  } else {
    res.render("index", {
      name: "sumit",
    });
  }
});

app.get("/weather", (req, res) => {
  res.status(200).send({
    temprature: 20,
    metric: "celcius",
  });
});

app.listen("3000", () => {
  console.log("server started!!");
});
