const getCityCoordinates = (city) => {
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=c1333c94dc45bb3213e10b24ec0db7f0
  `)
    .then(function (response) {
      return response.json();
    })
    .then(function (resp) {
      const lat = resp[0].lat;
      const lon = resp[0].lon;
      getCityWeather(lat, lon);
    });
};
const getCityWeather = (lat, lon) => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c1333c94dc45bb3213e10b24ec0db7f0
    `)
    .then(function (response) {
      return response.json();
    })
    .then(function (resp) {
      console.log(resp);
    });
};
getCityCoordinates(`Sieradz`);
