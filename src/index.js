function showDate() {
  let attachedCity = "";
  let cityNames = ["Los Angeles", "Sydney", "Paris"];
  let cityTimeZone = [
    "America/Los_Angeles",
    "Australia/Sydney",
    "Europe/Paris",
  ];

  cityNames.forEach(function (value, index) {
    let attachedCityName = cityNames[index];
    let attachedCityDate = moment()
      .tz(cityTimeZone[index])
      .format("MMMM Do, YYYY");
    let attachedCityTime = `
      ${moment().tz(cityTimeZone[index]).format("h:mm:ss")} 
      <small>${moment().tz(cityTimeZone[index]).format("A")}</small>`;
    attachedCity += `
     <div class="attached-cities">
          <div class="city" id="cities">
            <h2 >${attachedCityName}</h2>
            <div class="date" >${attachedCityDate}</div>
          </div>
          <div class="time" >${attachedCityTime}</div>
        </div>`;
  });
  document.querySelector("#attached-cities").innerHTML = attachedCity;
}

showDate();
setInterval(showDate, 1000);
function updateCity(event) {
  let cityTime = event.target.value;
  if (cityTime === "current") {
    cityTime = moment.tz.guess();
  }
  let cityName = cityTime.replace(`_`, ` `).split(`/`)[1];
  let cityTimeZone = moment().tz(cityTime);
  let cityElement = document.querySelector("#attached-cities");
  cityElement.innerHTML = `
    <div class="attached-cities" >
          <div class="city">
            <h2 >${cityName}</h2>
            <div class="date">${cityTimeZone.format("MMM Do,YYYY")}</div>
          </div>
          <div class="time" >${cityTimeZone.format(
            "h:mm:ss"
          )} <small>${cityTimeZone.format("A")}</small></div>
        </div> <a href="/">All cities</a>`;

  setInterval(updateCity, 1000);
}

let citiesSelect = document.querySelector("#cities-selection");
citiesSelect.addEventListener("change", updateCity);
