window.onload = () => {
  if (localStorage.getItem("kanbanBoard")) {
    const savedTask = JSON.parse(localStorage.getItem("kanbanBoard"));

    savedTask.map((task) => {
      const { status } = task;

      if (status == "todo") {
        const taskStatusDiv = document.querySelector("#todoDiv");
        cardsToAppend(taskStatusDiv, task);
        // setCardInCategory(taskStatusDiv, obj);
      } else if (status == "inprogress") {
        const taskStatusDiv = document.querySelector("#inProgressDiv");
        // setCardInCategory(taskStatusDiv);
      } else {
        const taskStatusDiv = document.querySelector("#doneDiv");
        // setCardInCategory(taskStatusDiv);
      }
    });
  } else {
    const todoDiv = document.getElementById("todoDiv");
    const inprogressDiv = document.getElementById("inProgressDiv");
    const doneDiv = document.getElementById("doneDiv");

    const noTaskFound = document
      .querySelector("#noTaskFoundTemp")
      .content.cloneNode(true);
    todoDiv.appendChild(noTaskFound);

    const noTaskFound2 = document
      .querySelector("#noTaskFoundTemp")
      .content.cloneNode(true);
    inprogressDiv.appendChild(noTaskFound2);

    const noTaskFound3 = document
      .querySelector("#noTaskFoundTemp")
      .content.cloneNode(true);
    doneDiv.appendChild(noTaskFound3);
  }
};

const cardsToAppend = (element, data) => {
  const card = document
    .querySelector("#singleTaskCardTempl")
    .content.cloneNode(true);

  const cardHeading = card.querySelector(".cardHeading");
  const cardDescription = card.querySelector(".description");
  const tagContainer = card.querySelector(".tag-Container");
  const todoCreateDate = card.querySelector(".createDateSpan");
  const todoUpdateDate = card.querySelector(".updateDateSpan");
  const editButton = card.querySelector(".editTodoSvg");

  // Set the following data content to element
  cardHeading.textContent = data.todoName;
  editButton.setAttribute("id", data.id);

  data.tags.forEach((tag) => {
    const tagElement = document
      .querySelector("#chipTagTemplate")
      .content.cloneNode(true);
    // tagElement.textContent = tag;
    tagElement.querySelector(".singleTag").textContent = tag;

    tagContainer.appendChild(tagElement);
  });
  cardDescription.textContent = data.todoDesc.slice(0, 30);
  todoCreateDate.textContent = data.createdOn;
  todoUpdateDate.textContent = data.updateOn;

  element.appendChild(card);
};

const editTask = (id) => {
  const savedTask = JSON.parse(localStorage.getItem("kanbanBoard"));
  const singleTask = savedTask.find((task) => {
    if (task.id == id) {
      return task;
    }
  });
  if (singleTask) {
    if (localStorage.getItem("taskToEdit")) {
      localStorage.removeItem("taskToEdit");
      localStorage.setItem("taskToEdit", JSON.stringify(singleTask));
      window.open("http://127.0.0.1:5500/html/edittask.html", "_blank");
    } else {
      localStorage.setItem("taskToEdit", JSON.stringify(singleTask));
      window.open("http://127.0.0.1:5500/html/edittask.html", "_blank");
    }
    // const taskTile = document.querySelector("#titleInput");
    // const taskDesc = document.querySelector("#textareaInput");
    // const tagContainer = document.querySelector("#tag-Container");
    // const singleTag = document
    //   .querySelector("#newTagTemp")
    //   .content.cloneNode(true);

    // taskTile.textContent = singleTag.todoName;
    // taskDesc.textContent = singleTag.todoDesc;

    // singleTag.tags.forEach((tag) => {
    //   const singleTag = document
    //     .querySelector("#newTagTemp")
    //     .content.cloneNode(true);

    //   singleTag.querySelector(".singleTag").textContent = tag;

    //   tagContainer.appendChild(singleTag);
    // });
  }
};

const drag = (e) => {
  e.dataTransfer.setData("text", e.target.id);
};
