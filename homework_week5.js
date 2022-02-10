let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let date = now.getDate();
let months = [
  "January",
  "February",
  "March",
  "April",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${day}, ${date} ${month}`;

let hour = String(now.getHours()).padStart(2, "0");
let minutes = String(now.getMinutes()).padStart(2, "0");
let currentTime = document.querySelector("#current-time");

currentTime.innerHTML = `${hour}:${minutes}`;

function showWeatherData(response) {
  let apiCity = response.data.name;
  let city = document.querySelector("#city");
  city.innerHTML = apiCity;

  let apiCelciusTemperature = Math.round(response.data.main.temp);
  let celciusTemperature = document.querySelector("#temperature");
  celciusTemperature.innerHTML = apiCelciusTemperature;

  let apiDescription = response.data.weather[0].description;
  let description = document.querySelector("#description");
  description.innerHTML = apiDescription;

  let apiHumidity = Math.round(response.data.main.humidity);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = apiHumidity;

  let apiWind = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#wind");
  wind.innerHTML = apiWind;

  let apiTempMax = Math.round(response.data.main.temp_max);
  let tempMax = document.querySelector("#temp-max");
  tempMax.innerHTML = apiTempMax;

  let apiTempMin = Math.round(response.data.main.temp_min);
  let tempMin = document.querySelector("#temp-min");
  tempMin.innerHTML = apiTempMin;

  let icon = document.querySelector("#lead-emoji");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function search(city) {
  let apiKey = "cc9d95ff70494e22ebe5e4ea828d0369";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeatherData);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}

search("Vienna");

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

function showCurrentCity(event) {
  function showPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "cc9d95ff70494e22ebe5e4ea828d0369";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    function showCurrentWeatherData(response) {
      console.log(response.data);
      let apiCityName = response.data.name;
      let cityName = document.querySelector("#current-city");
      cityName.innerHTML = `<strong>${apiCityName}</strong>`;

      let apiCelciusTemperature = Math.round(response.data.main.temp);
      let celciusTemperature = document.querySelector("#temperature");
      celciusTemperature.innerHTML = apiCelciusTemperature;

      let apiDescription = response.data.weather[0].description;
      let description = document.querySelector("#description");
      description.innerHTML = apiDescription;

      let apiHumidity = Math.round(response.data.main.humidity);
      let humidity = document.querySelector("#humidity");
      humidity.innerHTML = apiHumidity;

      let apiWind = Math.round(response.data.wind.speed);
      let wind = document.querySelector("#wind");
      wind.innerHTML = apiWind;

      let apiTempMax = Math.round(response.data.main.temp_max);
      let tempMax = document.querySelector("#temp-max");
      tempMax.innerHTML = apiTempMax;

      let apiTempMin = Math.round(response.data.main.temp_min);
      let tempMin = document.querySelector("#temp-min");
      tempMin.innerHTML = apiTempMin;

      let icon = document.querySelector("#lead-emoji");
      icon.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
      );
    }
    axios.get(apiUrl).then(showCurrentWeatherData);
  }
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentCityButton = document.querySelector("#current-city-button");
currentCityButton.addEventListener("click", showCurrentCity);
