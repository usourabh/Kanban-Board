const createTodo = () => {
  const todoTitle = document.getElementById("titleInput").value;
  const todoDescription = document.getElementById("textareaInput").value;
  const tagCollection = document
    .getElementById("tag-Container")
    .getElementsByTagName("h6");

  if (todoTitle !== "" && todoDescription !== "" && tagCollection.length >= 1) {
    const allTags = [];
    let todo = [];

    for (i = 0; i < tagCollection.length; i++) {
      allTags.push(tagCollection[i].innerHTML);
    }

    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hours = date.getHours();
    let minute = date.getMinutes();
    let ampm = hours >= 12 ? "pm" : "am";

    const fullDate =
      day + "-" + month + "-" + year + " " + hours + ":" + minute + " " + ampm;

    if (localStorage.getItem("kanbanBoard") == null) {
      todo = [
        {
          id: 1,
          todoName: todoTitle,
          todoDesc: todoDescription,
          tags: allTags,
          status: "todo",
          createdOn: fullDate,
          updateOn: fullDate,
        },
      ];
      localStorage.setItem("kanbanBoard", JSON.stringify(todo));
    } else {
      todo = JSON.parse(localStorage.getItem("kanbanBoard"));
      todo.push({
        id: todo.length + 1,
        todoName: todoTitle,
        todoDesc: todoDescription,
        tags: allTags,
        status: "todo",
        createdOn: fullDate,
        updateOn: fullDate,
      });
      localStorage.setItem("kanbanBoard", JSON.stringify(todo));
    }

    clearInputFields();
  } else {
    alert("Fill all the fields");
  }
};

const removeTag = (e) => {
  const tagContainer = document.getElementById("tag-Container");
  tagContainer.removeChild(e.parentElement);
};

const handleChipInput = (e) => {
  // const tagContainer = document.getElementById("tag-Container");
  // if (tagContainer.getElementsByClassName("tags").length < 5) {
  //   const tagTemp = document
  //     .getElementById("newTagTemp")
  //     .content.cloneNode(true);
  //   tagContainer.appendChild(tagTemp);
  // }

  // Fetch chip template, input field and tags container
  const chipTemplate = document.querySelector("#newTagTemp");
  const input = document.querySelector("chipInput");
  const tags = document.querySelector("#tag-Container");

  // const handleChipInput = (e) => {
  const { value } = e.target;
  // If value doesn't include ',', return
  if (!value.includes(",")) return;

  // Clone the chip template node
  const chip = chipTemplate.content.cloneNode(true);
  // Assign value to the chip
  chip.querySelector(".tagText").textContent = value.split(",")[0];

  // Insert the chip in the tags container before the input element
  tags.insertBefore(chip, input);
  // Reset the value
  e.target.value = "";
  // };
};

const createTodoNView = () => {
  const todoTitle = document.getElementById("titleInput").value;
  const todoDescription = document.getElementById("textareaInput").value;
  const tagCollection = document
    .getElementById("tag-Container")
    .getElementsByTagName("h6");

  createTodo();
  window.location.href = "../index.html";
};

const clearInputFields = () => {
  document.getElementById("titleInput").value = "";
  document.getElementById("textareaInput").value = "";
  const a = document.getElementById("tag-Container");
  function removeAllChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }
  removeAllChildNodes(a);
};
