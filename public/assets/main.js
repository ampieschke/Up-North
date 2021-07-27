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

      //TESTER DATA!!!!!!
      // $("#today").text("Friday is " + fri);
      // let friTemp = Math.floor(
      //   (response.daily[fri].temp.day - 273.15) * 1.8 + 32
      // );
      // console.log(friTemp);
      // let satTemp = Math.floor(
      //   (response.daily[sat].temp.day - 273.15) * 1.8 + 32
      // );
      // console.log(satTemp);
      // let sunTemp = Math.floor(
      //   (response.daily[sun].temp.day - 273.15) * 1.8 + 32
      // );
      // console.log(sunTemp);

      //  Function to grab weekend weather
    });
  }

  ////ADD TODOs/////
  const createToDoBtn = document.getElementById("create-form");

  if (createToDoBtn) {
    createToDoBtn.addEventListener("submit", (e) => {
      e.preventDefault();

      // Grabs the value of the textarea that goes by the name, "quote"
      const newTodo = {
        todo: document.getElementById("td").value.trim(),
      };

      // Send POST request to create a new quote
      fetch("/api/checklist", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        // make sure to serialize the JSON body
        body: JSON.stringify(newTodo),
      }).then(() => {
        // Empty the form
        document.getElementById("td").value = "";

        // Reload the page so the user can see the new quote
        console.log("Created a new ToDo!");
        location.reload();
      });
    });
  }
});
