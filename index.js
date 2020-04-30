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
  res.render("index", {
    name: "sumit",
  });
});

app.get("/weather", (req, res) => {
  if (req.query && req.query.location) {
    getLocationData(
      req.query.location,
      (err, { location, place_name: place } = {}) => {
        if (err || !location) {
          const errData = !location ? 'Cannot find the location' : err;
          return res.send( {
            error: errData,
          });
        } else {
          getWeatherData(location, (error, weatherData) => {
            if (error) {
              return res.send( {
                error: errData,
              });
            } else {
              return res.status(200).send({
                place,
                weatherData,
              });
            }
          });
        }
      }
    );
  } else {
    return res.send( {
      error: "Location not provided",
    });
  }
});

app.get("/about", (req, res) => {
  res.status(200).render('about');
});

app.get("*", (req, res) => {
  res.status(404).render('404');
});

app.listen("3000", () => {
  console.log("server started!!");
});
