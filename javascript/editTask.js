window.onload = () => {
  if (localStorage.getItem("taskToEdit")) {
    const task = JSON.parse(localStorage.getItem("taskToEdit"));
    // name
    const name = (document.getElementById("titleInput").value = task.todoName);
    // Description
    const description = (document.getElementById("textareaInput").value =
      task.todoDesc);

    const tagContainer = document.getElementById("tag-Container");

    task.tags.forEach((tag) => {
      const tagTemp = document
        .querySelector("#newTagTemp")
        .content.cloneNode(true);
      tagTemp.querySelector(".emptyTag").textContent = tag;
      tagContainer.appendChild(tagTemp);
    });
  }
};

const createNewTag = () => {
  const tagContainer = document.getElementById("tag-Container");
  if (tagContainer.getElementsByClassName("singleTag").length < 5) {
    const tagTemp = document
      .getElementById("newTagTemp")
      .content.cloneNode(true);
    tagContainer.appendChild(tagTemp);
  }
};

const removeTag = (e) => {
  const tagContainer = document.getElementById("tag-Container");
  tagContainer.removeChild(e.parentElement);
};

const editNView = () => {
  const singletask = JSON.parse(localStorage.getItem("taskToEdit"));
  const allTask = JSON.parse(localStorage.getItem("kanbanBoard"));

  const name = document.getElementById("titleInput").value;
  // Description
  const description = document.getElementById("textareaInput").value;

  const editedTags = document
    .querySelector("#tag-Container")
    .querySelectorAll(".emptyTag");

  const editedTagsArray = Array.from(editedTags).map((tag) => tag.textContent);

  let idToBeRemoved;
  allTask.map((task) => {
    if (task.id == singletask.id) {
      // allTask.splice(task.id - 1, 1);
      allTask.splice(task.id - 1, 1);

      idToBeRemoved = task.id;
      const newUpdatedTag = editTask(
        task.id,
        name,
        description,
        editedTagsArray,
        task.createdOn
      );
      allTask.push(newUpdatedTag);
    }
  });

  localStorage.setItem("kanbanBoard", JSON.stringify(allTask));
  localStorage.removeItem("taskToEdit");
  window.open("http://127.0.0.1:5500/index.html", "_blank");
};

const editTask = (id, name, description, allTags, createdOn) => {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let hours = date.getHours();
  let minute = date.getMinutes();
  let ampm = hours >= 12 ? "pm" : "am";

  const fullDate =
    day + "-" + month + "-" + year + " " + hours + ":" + minute + " " + ampm;

  const editedTask = {
    id: id,
    todoName: name,
    todoDesc: description,
    tags: allTags,
    status: "todo",
    createdOn: createdOn,
    updateOn: fullDate,
  };
  return editedTask;
  // for (let i = 0; i < editedTags.length; i++) {
  //   editedTask.tags.push(editedTags[i].innerText);
  // }
};

const removeId = (id, obj) => {
  delete obj[id];
};
