$(document).ready(() => {
  getWeather();

  let fri = 0;
  let weekendWeather = []; //This will store the array of weather to determine css for display

  function getWeather() {
    //Call API for weather JSON File
    var query =
      "https://api.openweathermap.org/data/2.5/onecall?lat=45.2845&lon=-85.0789&appid=009898d31c9d9e7bb647f2a5e033ff5c";

    $.ajax({
      url: query,
      method: "GET",
    }).then(function (response) {
      console.log(response);

      // Show Current Weather Conditions
      var fTemp = Math.floor((response.current.temp - 273.15) * 1.8 + 32);
      $("#temp").text("Temp: " + fTemp + " Degrees");
      $("#description").text(
        "Current Weather: " + response.current.weather[0].main
      );

      //Gather the Weekend Weather
      //Determine what day today is, so that we can find where in the API array Friday is.
      switch (new Date().getDay()) {
        case 0:
          fri = 4;
          break;
        case 1:
          fri = 3;
          break;
        case 2:
          fri = 2;
          break;
        case 3:
          fri = 1;
          break;
        case 4:
          fri = 0;
          break;
        case 5:
          fri = 6;
          break;
        case 6:
          fri = 5;
      }

      for (let i = fri; i < 3 + fri; i++) {
        console.log(i);
        let dTemp = Math.floor(
          (response.daily[i].temp.day - 273.15) * 1.8 + 32
        );
        let dWeath = response.daily[i].weather[0].main;
        console.log(dTemp);
        let iconcode = response.daily[i].weather[0].icon;
        let iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
        console.log(iconurl);
        $("#threeDays").append(`
          <div class="col-4 col-lg-2 day">
            <p class = "day">${dTemp} Degrees</p>
            <p class = "day">${dWeath}</p>
            <img id="wicon" src="${iconurl}" alt="Weather icon">
          </div>`);
        weekendWeather.push(dWeath);
        console.log(weekendWeather);
      }
    });
  }
});
