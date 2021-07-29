let items = [];

fetch("/api/item")
  .then((response) => response.json())
  .then((data) => {
    // save db data on global variable
    items = data;
    populateChecklist();
  });

function populateChecklist() {
  const theList = document.querySelector("#theList");
  theList.innerHTML = "";

  items.forEach((item) => {
    const pi = document.createElement("pi");
    pi.innerHTML = `
      <td>${item.name}<button class="delete" id=${item._id}>Check</button></td><hr><br>
    `;

    theList.appendChild(pi);
  });
}

function sendItem() {
  const nameEl = document.querySelector("#td").value;

  console.log("hi");
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

      // clear form
      nameEl.value = "";
    });
}

theList.addEventListener("click", function (e) {
  if (e.target.matches(".delete")) {
    console.log("4");
    element = e.target;
    donezo.push(element);
    console.log(donezo);
    id = element.getAttribute("id");
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
        element.parentNode.remove();
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
