let items = [];

function getResults() {
  clearTodos();
  fetch("/api/item")
    .then(function (response) {
      if (response.status !== 200) {
        console.log(
          "Looks like there was a problem. Status Code: " + response.status
        );
        return;
      }
      response.json().then(function (data) {
        populateChecklist(data);
      });
    })
    .catch(function (err) {
      console.log("Fetch Error :-S", err);
    });
}

function populateChecklist(res) {
  // const theList = document.querySelector("#theList");
  // theList.innerHTML = "";
  // items.forEach((item) => {
  //   const pi = document.createElement("pi");
  //   pi.innerHTML = `
  //     <span>${item.name}<button class="delete" id=${item._id}>Check</button></span><hr><br>
  //   `;

  //   theList.appendChild(pi);
  // });

  for (var i = 0; i < res.length; i++) {
    let data_id = res[i]["_id"];
    let name = res[i]["name"];
    let todoList = document.getElementById("theList");
    snippet = `
    <p class="data-entry">
    <span class = "dataTitle" data-id=${data_id}>${name}</span>
    <span onClick = "delete" class="delete" data-id=${data_id}>x</span>
    </p>`;
    todoList.insertAdjacentHTML("beforeend", snippet);
  }
}

function clearTodos() {
  const todoList = document.getElementById("theList");
  todoList.innerHTML = "";
}

getResults();

function sendItem() {
  const nameEl = document.querySelector("#td").value;
  console.log(nameEl);

  // create record
  const item = {
    name: nameEl,
    done: false,
    date: new Date().toISOString(),
  };

  // add to beginning of current array of data
  items.unshift(item);

  // re-run logic to populate ui with new record
  populateChecklist();

  // also send to server
  fetch("/api/item", {
    method: "POST",
    body: JSON.stringify(item),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((err) => {
      // fetch failed, so save in indexed db
      sendItem(item);
    });
}

theList.addEventListener("click", function (e) {
  if (e.target.matches(".delete")) {
    console.log("4");
    element = e.target;
    element.parentNode.remove();
    id = element.getAttribute("data-id");
    fetch("/api/" + id, {
      method: "delete",
    })
      .then(function (response) {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          return;
        }
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err);
      });
  }
  populateChecklist();
});

document.querySelector("#add-btn").addEventListener("click", function (event) {
  event.preventDefault();
  sendItem(true);
});
