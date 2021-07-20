$(document).ready(() => {
  getWeather();
});

function getWeather() {
  //Call API for weather JSON File
  var query =
    "https://api.openweathermap.org/data/2.5/onecall?lat=45.2845&lon=-85.0789&appid=009898d31c9d9e7bb647f2a5e033ff5c";

  $.ajax({
    url: query,
    method: "GET",
  }).then(function (response) {
    console.log(query);
    console.log(response);

    // Show Current Weather Conditions
    var fTemp = Math.floor((response.current.temp - 273.15) * 1.8 + 32);
    $("#temp").text("Temp: " + fTemp + " Degrees");
    $("#description").text(
      "Current Weather: " + response.current.weather[0].main
    );
  });
}
