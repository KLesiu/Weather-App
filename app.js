const button = document.querySelector("button");
const getCityCoordinates = (city) => {
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=c1333c94dc45bb3213e10b24ec0db7f0
  `,
    {
      mode: `cors`,
    }
  )
    .then(function (response) {
      return response.json();
    })

    .then(function (resp) {
      const lat = resp[0].lat;
      const lon = resp[0].lon;
      getCityWeather(lat, lon, city);
    })
    .catch(function () {
      alert("Please, enter the correct city");
    });
};
const getCityWeather = (lat, lon, city) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c1333c94dc45bb3213e10b24ec0db7f0
    `,
    {
      mode: `cors`,
    }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (resp) {
      const temp = resp.main.temp;
      const feelsTemp = resp.main.feels_like;
      const weather = resp.weather[0].main || resp.weather.main;
      const wind = resp.wind.speed;
      const humidity = resp.main.humidity;
      const country = resp.sys.country;
      const nameCity = city;
      updateData(temp, feelsTemp, weather, wind, humidity, country, nameCity);
      addImage(weather);
    });
};
const getCityFromInput = () => {
  const input = document.querySelector("input");

  getCityCoordinates(input.value);
};
const updateData = (
  temp,
  feelsTemp,
  weather,
  wind,
  humidity,
  country,
  city
) => {
  const currentTemp = Math.round(temp - 273.15);
  const feelsCurrentTemp = Math.round(feelsTemp - 273.15);
  document.querySelector(".temp").innerHTML = currentTemp + `°C`;
  document.querySelector(".feels_like").innerHTML = feelsCurrentTemp + `°C`;
  document.querySelector(".weather").innerHTML = weather;
  document.querySelector(".wind").innerHTML = wind + `m/s`;
  document.querySelector(".humidity").innerHTML = humidity + `%`;

  document.querySelector(".cityName").innerHTML = `${city},${country}`;
  localStorage.setItem("city", city);
};
const addImage = (weather) => {
  const img = document.querySelector("img");
  if (weather === `Clouds`) {
    img.src = "./img/clouds.png";
  } else if (weather === `Thunderstorm`) {
    img.src = `./img/storm.png`;
  } else if (weather === `Snow`) {
    img.src = `./img/snow.png`;
  } else if (weather === `Rain`) {
    img.src = `./img/rain.png`;
  } else if (weather === "Mist") {
    img.src = `./img/mist.png`;
  } else {
    img.src = `./img/sun.png`;
  }
  const date = new Date();
  const hour = date.getHours();
  if (hour > 22 || hour < 5) {
    img.src = `./img/night.png`;
  }
};
button.addEventListener("click", getCityFromInput);

getCityCoordinates(localStorage.getItem("city") || `London`);
