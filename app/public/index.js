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
      <td>${item.name}</td>
      <td>${item.done}</td>
    `;

    theList.appendChild(pi);
  });
}

function sendItem() {
  const nameEl = document.querySelector("#td");

  // validate form
  if (nameEl.value === "") {
    errorEl.textContent = "Enter an Item!";
    return;
  } else {
    errorEl.textContent = "";
  }

  // create record
  const item = {
    name: nameEl.value,
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
    .then((data) => {
      if (data.errors) {
        errorEl.textContent = "Missing Information";
      } else {
        // clear form
        nameEl.value = "";
      }
    })
    .catch((err) => {
      // fetch failed, so save in indexed db
      saveRecord(transaction);

      // clear form
      nameEl.value = "";
      amountEl.value = "";
    });
}

document.querySelector("#add-btn").addEventListener("click", function (event) {
  event.preventDefault();
  sendItem(true);
});
