function showDate() {
  let attachedCity = "";
  let cityName = document.querySelector("#city-name");
  let cityDate = document.querySelector("#date");
  let cityTime = document.querySelector("#time");
  let cityNames = ["Los Angeles", "Sydney", "Paris"];
  let cityTimeZone = [
    "America/Los_Angeles",
    "Australia/Sydney",
    "Europe/Paris",
  ];

  cityNames.forEach(function (value, index) {
    cityName.innerHTML = cityNames[index];
    cityDate.innerHTML = moment()
      .tz(cityTimeZone[index])
      .format("MMMM Do, YYYY");
    cityTime.innerHTML = `
      ${moment().tz(cityTimeZone[index]).format("h:mm:ss")} 
      <small>${moment().tz(cityTimeZone[index]).format("A")}</small>`;
    attachedCity += `
      ${cityName.innerHTML}
      ${cityDate.innerHTML}
      ${cityTime.innerHTML}`;
  });
  document.querySelector("#attached-cities").innerHTML = attachedCity;
}

showDate();
setInterval(showDate, 1000);
function updateCity(event) {
  if (event.target.value.lenght > 0) {
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
            <h2 id="city-name">${cityName}</h2>
            <div class="date" id="cities">${cityTimeZone.format(
              "MMM Do,YYYY"
            )}</div>
          </div>
          <div class="time" id="time">${cityTimeZone.format(
            "h:mm:ss"
          )} <small>${cityTimeZone.format("A")}</small></div>
        </div> <a href="/">All cities</a>`;
  }
}

let citiesSelect = document.querySelector("#cities-selection");
citiesSelect.addEventListener("change", updateCity);
updateCity();
setInterval(updateCity, 1000);
