const geolocation = document.querySelector("#geolocation");
const dateNow = document.querySelector(".date_now");
const time = document.querySelector(".time");

function getLocationTemp() {}

function getDateMonthYear() {
  const now = new Date();
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

  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const day = now.getDay();

  const hours = now.getHours();
  const minutes = now.getMinutes();

  dateNow.innerText = `${monthList[month]} ${date} ${week[day]}, ${year}`;
  time.innerText = `${hours}:${minutes}`;
}

getDateMonthYear();
setInterval(getDateMonthYear, 1000);

//구현해야 될 기능:
//1. 날짜 (done)
//2. 시간 (done)

//3. 지역 위치
//4. 온도
