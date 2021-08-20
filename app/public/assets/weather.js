$(document).ready(() => {
  getWeather();

  let fri = 0;
  let weekendWeather = []; //This will store the array of weather to determine css for display
  let weekendTemps = []; //Store Weekend Temperature to determine which packlist to use

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
          fri = 5;
          break;
        case 1:
          fri = 4;
          break;
        case 2:
          fri = 3;
          break;
        case 3:
          fri = 2;
          break;
        case 4:
          fri = 1;
          break;
        case 5:
          fri = 0;
          break;
        case 6:
          fri = 6;
      }
      console.log(fri);
      //Display Weather
      for (let i = fri; i < 3 + fri; i++) {
        console.log(i);
        console.log(response.daily[i]);
        let dTemp = Math.floor(
          (response.daily[i].temp.day - 273.15) * 1.8 + 32
        );
        let dWeath = response.daily[i].weather[0].main;
        let iconcode = response.daily[i].weather[0].icon;
        let iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

        $("#threeDaysW").append(`
          <div class="col">
            <div class="row">
              <div class="col-3">
                <img id="wicon" src="${iconurl}" alt="Weather icon">
              </div>
              <div class="col-8 day">
                <p class="temp">${dTemp}°</p>
                <p class="daily">${dWeath}</p>
              </div>
            </div>
          </div>`);
        weekendWeather.push(dWeath);
        weekendTemps.push(dTemp);
        if (weekendTemps[1] >= 65) {
          var bg = document.querySelector("body");
          bg.setAttribute("class", "warm");
          // const addButton = document.getElementById("btntoggle");
          // addButton.innerHTML = "";
          // $("#btntoggle").append(`
          // <input type="text" id="td" placeholder="Add an Item">
          // <button type="submit" class="btn btn-primary btn-md" id="add-btn">
          //   <span class="fa fa-fire"></span> Add an Item</button>
          //     `);
        } else if (weekendTemps[1] < 65) {
          bg.setAttribute("class", "cold");
          // const addButton = document.getElementById("btntoggle");
          // addButton.innerHTML = "";
          // $("#btntoggle").append(`
          // <input type="text" id="td" placeholder="Add an Item">
          // <button type="submit" class="btn btn-primary btn-md" id="add-btn">
          //   <span class="fa fa-fire"></span> Add an Item</button>
          //     `);
        }
      }
    });
  }
});
