const createTodo = () => {
  let todo = [];
  const todoTitle = document.getElementById("titleInput").value;
  const todoDescription = document.getElementById("textareaInput").value;
  const tagCollection = document
    .getElementById("tag-Container")
    .getElementsByTagName("h6");
  const allTags = [];

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
};

const removeTag = (e) => {
  const tagContainer = document.getElementById("tag-Container");
  tagContainer.removeChild(e.parentElement);
};

const createNewTag = () => {
  const tagContainer = document.getElementById("tag-Container");
  if (tagContainer.getElementsByClassName("tags").length < 5) {
    const tagTemp = document
      .getElementById("newTagTemp")
      .content.cloneNode(true);
    tagContainer.appendChild(tagTemp);
  }
};

const createTodoNView = () => {
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
