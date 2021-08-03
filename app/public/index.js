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
        newItemSnippet(data);
      });
    })
    .catch(function (err) {
      console.log("Fetch Error :-S", err);
    });
}

function newItemSnippet(response) {
  for (var i = 0; i < response.length; i++) {
    let data_id = response[i]["_id"];
    let name = response[i]["name"];
    let todoList = document.getElementById("theList");
    snippet = `
    <p class="data-entry">
    <span class="dataTitle" data-id=${data_id}>${name}</span>
    <span class="pack" data-id=${data_id}> PACK </span>
    <span onClick="delete" class="delete" data-id=${data_id}> X </span>
    </p>
    <hr>`;
    todoList.insertAdjacentHTML("beforeend", snippet);
  }
}

function clearTodos() {
  const todoList = document.getElementById("theList");
  todoList.innerHTML = "";
}
getResults();

theList.addEventListener("click", function (e) {
  if (e.target.matches(".delete")) {
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
});

theList.addEventListener("click", function (e) {
  if (e.target.matches(".pack")) {
    element = e.target;
    element.parentNode.remove();
    id = element.getAttribute("data-id");
    console.log(id);
    fetch("/api/" + id, {
      method: "put",
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
});

document.querySelector("#add-btn").addEventListener("click", function (event) {
  event.preventDefault();
  element = event.target;
  data_id = element.getAttribute("data-id");
  fetch("/api/item", {
    method: "post",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: document.getElementById("td").value,
      done: false,
      created: Date.now(),
    }),
  })
    .then((res) => res.json())
    .then((res) => newItemSnippet([res]));
  const addSpot = document.getElementById("td");
  addSpot.value = "";
});
