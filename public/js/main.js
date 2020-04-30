console.log("***** Main JS Loaded *****");
let lastActiveLink = null;

// DOM elements
const links = document.getElementsByClassName("link");
const inputBox = document.getElementById("locationInput");
const weatherForm = document.getElementById("weaterForm");
const weatherResult = document.getElementById("weatherResult");
const cardImage = weatherResult.querySelector(".card-image");
const cardBody = weatherResult.querySelector(".card-body");

const currentUrl = window.location.href;

for (let i = 0; i < links.length; i++) {
  const element = links[i];
  if (element.href === currentUrl) {
    lastActiveLink && lastActiveLink.classList.remove("active");
    lastActiveLink = element;
    lastActiveLink.classList.add("active");
    break;
  }
}
// focus input box
inputBox && inputBox.focus();

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchText = e.target.querySelector("input").value;

  if (searchText) {
    weatherResult.style.opacity = 1;

    fetch(`/weather?location=${searchText}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          return;
        }
        const { weatherData } = data;
        const { place } = data;
        const imageEL = createEl("img");
        imageEL.src = `../images/weather/${getImageSource(
          weatherData.weather_code
        )}.svg`;

        const temp = createEl("h2");
        temp.innerHTML = `Temperature : ${weatherData.temperature}˙C`;
        const location = createEl("h3");
        location.innerHTML = place;

        const humidity = createEl("p");
        humidity.innerHTML = `Humidity : ${weatherData.humidity}%`;
        const cloudcover = createEl("p");
        cloudcover.innerHTML = `Cloudcover: ${weatherData.cloudcover}%`;
        const feelslike = createEl("p");
        feelslike.innerHTML = `Feelslike: ${weatherData.feelslike}˙C`;
        const weatherType = createEl("p");
        weatherType.innerHTML = `Weather: ${weatherData.weather_descriptions.join(
          " "
        )}`;
        const lastupdated = createEl("p");
        lastupdated.innerHTML = `Last updated today at: ${weatherData.observation_time}`;

        cardBody.innerHTML = "";
        cardBody.appendChild(temp);
        cardBody.appendChild(location);
        cardBody.appendChild(weatherType);
        cardBody.appendChild(humidity);
        cardBody.appendChild(cloudcover);
        cardBody.appendChild(feelslike);
        cardBody.appendChild(lastupdated);

        cardImage.innerHTML = "";
        cardImage.appendChild(imageEL);
      });
  }
});

const createEl = (el) => document.createElement(el);
const getImageSource = (c) => {
  console.log(typeof c);
  if (c === 113) {
    // sunny
    return "sunny";
  } else if (c === 116) {
    return "partly-cloudy";
  } else if (c === 119) {
    return "cloudy";
  } else if (c === 122) {
    return "overcast";
  } else if (c === 143 || c === 248 || c === 260) {
    // mist
    return "fog";
  } else if (
    c === 176 ||
    c === 185 ||
    c === 263 ||
    c === 266 ||
    c === 281 ||
    c === 293 ||
    c === 296 ||
    c === 305 ||
    c === 311
  ) {
    return "patch-rain";
  } else if (c === 179 || c === 182) {
    return "snow";
  } else if (c === 200) {
    return "thunder";
  } else if (c === 227) {
    return "modarate-snow";
  } else if (c === 220) {
    return "blizzard";
  } else if (c === 284 || c === 305) {
    return "rain-thunder";
  } else if (c === 299 || c === 302) {
    return "heavy-rain";
  }
};
