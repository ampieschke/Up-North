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

/////GET LIST//////
function getList() {
  fetch("/api", {
    method: "GET",
    headers: {
      //   Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success in grabbing List!");
      data.map(({ todo_name }, i) => {
        const sectionBreak = document.createElement("hr");
        const listItem = document.createElement("div");
        listItem.classList.add("list");

        listItem.setAttribute("id", `list-item-${i}`);
        const itemList = document.getElementById("theList");
        itemList.appendChild(listItem);

        const itemEl = document.createElement("h2");
        itemEl.textContent = `${todo_name}`;

        listItem.appendChild(itemEl);
        listItem.appendChild(sectionBreak);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
getList();
