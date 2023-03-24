// 날짜 및 시간
const dateNow = document.querySelector(".date_now");
const time = document.querySelector(".time");

// 지역 및 날씨
const cityName = document.querySelector(".city_name");
const cityWeather = document.querySelector(".city_weather");

// API 키
const API_KEY = "5364edc8e16c3044f66aa6339eb6681e";

function getDateMonthYear() {
  const now = new Date();

  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const day = now.getDay();

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  const week = {
    0: "Sun",
    1: "Mon",
    2: "Tue",
    3: "Wed",
    4: "Tur",
    5: "Fri",
    6: "Sat",
  };
  const monthList = {
    0: "Jan.",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sept",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };

  dateNow.innerText = `${monthList[month]} ${date} ${week[day]}, ${year}`;
  time.innerText = `${hours}:${minutes}`;
}

getDateMonthYear();
setInterval(getDateMonthYear, 1000);

// 여기부턴
// geolocation 파트

function getLocationTemp(position) {
  console.log(position);
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.name, data.weather[0].main);
      cityName.innerText = data.name;
      cityWeather.innerText = `${data.weather[0].main} ${data.main.temp} ℃`;
      saveLocationTemp(
        data.name,
        `${data.weather[0].main} ${data.main.temp} ℃`
      );
    });
}

function saveLocationTemp(cityName, cityWeather) {
  localStorage.setItem("cityName", cityName);
  localStorage.setItem("cityWeather", cityWeather);
  console.log("this is citynameandweather" + cityName + cityWeather);
}

function getLocationTempError() {
  cityName.innerText = "Location not found";
  cityWeather.innerText = "weather -℃";
}

if (localStorage.getItem("cityName") === null) {
  navigator.geolocation.getCurrentPosition(
    getLocationTemp,
    getLocationTempError
  );
} else {
  cityName.innerText = localStorage.getItem("cityName");
  cityWeather.innerText = localStorage.getItem("cityWeather");
}
