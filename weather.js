//converts Kelvin to Farenheit
//F = 1.8*(K-273) + 32 ; C = K − 273.15
function convertToF(temperatureK) {
  const temperatureF = 1.8 * (parseInt(temperatureK, 10) - 273) + 32;
  return temperatureF.toFixed(0);
}

// cherry picks weather information from API into a new object
function processData(rawWeatherData) {
  const weatherData = {};
  weatherData.city = rawWeatherData.name;
  weatherData.temperature = convertToF(rawWeatherData.main.temp);
  weatherData.main = rawWeatherData.weather[0].main;
  weatherData.description = rawWeatherData.weather[0].description;
  weatherData.highTemperature = convertToF(rawWeatherData.main.temp_max);
  weatherData.lowTemperature = convertToF(rawWeatherData.main.temp_min);
  return weatherData;
}

// get gif corresponding to realtime forecast description and makes it the body element image
async function getWeatherGif(description, city) {
  const body = document.querySelector("body");
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=KFyhHa3e4TIuZ66QSG8TxWWrjHbWELWz&s=weather ${
      description + " " + city
    }`,
    { mode: "cors" }
  );

  const gifData = await response.json();

  body.style.cssText = `background-image: url(${gifData.data.images.original.url});`;
}

//calls weather API & sets DOM
async function getWeather(location) {
  const response = await fetch(
    isNaN(location) //if location is not a number, it is assumed to be a zip code, otherwise it is assumed to be a city
      ? `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=2900d552e9d4c56b3333eb19717e2772`
      : `https://api.openweathermap.org/data/2.5/weather?zip=${location}&appid=2900d552e9d4c56b3333eb19717e2772`,
    { mode: "cors" }
  );

  const rawWeatherData = await response.json();
  const weatherData = processData(rawWeatherData);
  console.log(weatherData);

  // setting weather on dom
  getWeatherGif(weatherData.main, weatherData.city);
  const city = document.querySelector("#city");
  const temperature = document.querySelector("#temperature");
  const description = document.querySelector("#description");
  const highTemperature = document.querySelector("#high");
  const lowTemperature = document.querySelector("#low");

  city.textContent = weatherData.city;
  temperature.textContent = weatherData.temperature + "°";
  description.textContent = weatherData.description;
  highTemperature.textContent = "H: " + weatherData.highTemperature + "°";
  lowTemperature.textContent = "L: " + weatherData.lowTemperature + "°";
}

let currentCity = "London";

async function getCity(lat, lon) {
  const response = await fetch(
    `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=2900d552e9d4c56b3333eb19717e2772`,
    { mode: "cors" }
  );

  const rawGeoData = await response.json();
  console.log(rawGeoData[0]);
  currentCity = rawGeoData[0].name;
  getWeather(currentCity);
}

function success(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  getCity(lat, lon);
}

function error() {
  getWeather("London");
}

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(success, error);
} else {
  error();
}

const searchBar = document.querySelector("#search-bar");
const searchButton = document.querySelector("#search-button");

function searchLocation(location) {
  getWeather(location);
  searchBar.value = "";
}

searchButton.addEventListener("click", () => {
  searchLocation(searchBar.value);
});

searchBar.addEventListener("keydown", (event) => {
  if (event.isComposing || event.keyCode === 13) {
    searchLocation(searchBar.value);
  }
});
