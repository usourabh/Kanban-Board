// Global Constants
const dragStart = (e) => {
  e.dataTransfer.setData("text/plain", e.target.id);
};
const dragEnd = () => {
  console.log("dragEnd");
};
const dragOver = (e) => {
  e.preventDefault();
};
const dragEnter = () => {
  console.log("dragEnter");
};
const dragLeave = () => {
  console.log("dragLeave");
};
const drop = (e) => {
  const cardTemp = document
    .getElementById("singleTaskCardTempl")
    .content.cloneNode(true);

  const savedTask = JSON.parse(localStorage.getItem("kanbanBoard"));

  const cardId = e.dataTransfer.getData("text");

  savedTask.forEach((task) => {
    if (e.target.id == "inProgressDiv") {
      if (task.id == cardId) {
        task.status = "inProgress";
      }
    } else if (e.target.id == "doneDiv") {
      if (task.id == cardId) {
        task.status = "done";
      }
    } else if (e.target.id == "todoDiv") {
      if (task.id == cardId) {
        task.status = "todo";
      }
    }
  });

  localStorage.setItem("kanbanBoard", JSON.stringify(savedTask));
  e.target.appendChild(cardTemp);
  location.reload();
};

// containers.forEach((container) => {
//   container.addEventListener("dragover", (e) => {
//     e.preventDefault();
//     const draggable = document.querySelector(".draggable");
//     container.appendChild(draggable);
//   });
// });
const fixColorOfTag = () => {
  const allCard = document.querySelectorAll(".singleCard");
  allCard.forEach((card) => {
    const tags = card.querySelectorAll(".singleTag");
    tags.forEach((tag, tagIndex) => {
      tag.classList.add("_" + (tagIndex + 1));
    });
  });
};

const renderPage = () => {
  if (localStorage.getItem("kanbanBoard")) {
    const savedTask = JSON.parse(localStorage.getItem("kanbanBoard"));

    savedTask.map((task) => {
      const { status } = task;

      if (status == "todo") {
        const taskStatusDiv = document.querySelector("#todoDiv");
        cardsToAppend(taskStatusDiv, task);
        // setCardInCategory(taskStatusDiv, obj);
      } else if (status == "inProgress") {
        const taskStatusDiv = document.querySelector("#inProgressDiv");
        cardsToAppend(taskStatusDiv, task);
        taskStatusDiv.querySelectorAll(
          ".singleCard, .cardHeading, .cardHeadingNSvg, .tag-Container .descriptionCard"
        );
      } else {
        const taskStatusDiv = document.querySelector("#doneDiv");
        cardsToAppend(taskStatusDiv, task);
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

  fixColorOfTag();
};

const cardsToAppend = (element, data) => {
  const card = document
    .querySelector("#singleTaskCardTempl")
    .content.cloneNode(true);
  const singleCard = card.querySelector(".singleCard");
  const cardHeading = card.querySelector(".cardHeading");
  const cardDescription = card.querySelector(".description");
  const tagContainer = card.querySelector(".tag-Container");
  const todoCreateDate = card.querySelector(".createDateSpan");
  const todoUpdateDate = card.querySelector(".updateDateSpan");

  // Conditional Edit
  if (["inProgress", "done"].includes(data.status)) {
    card.querySelector(".editTodoSvg").remove();
  }

  // Set the following data content to element
  cardHeading.textContent = "#" + data.id + " " + data.todoName;
  singleCard.setAttribute("id", data.id);

  data.tags.forEach((tag) => {
    const tagElement = document
      .querySelector("#chipTagTemplate")
      .content.cloneNode(true);

    // tagElement.textContent = tag;
    tagElement.querySelector(".singleTag").textContent = tag;

    tagContainer.appendChild(tagElement);
  });
  cardDescription.textContent = data.todoDesc;
  todoCreateDate.textContent = data.createdOn;
  todoUpdateDate.textContent = data.updateOn;

  element.appendChild(card);
};

const editTask = (ele) => {
  const cardId = ele.target.parentNode.parentNode.id;
  const savedTask = JSON.parse(localStorage.getItem("kanbanBoard"));
  const singleTask = savedTask.find((task) => {
    if (task.id == parseInt(cardId)) {
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

window.onload = renderPage();

const addedReadmore = (element) => {
  const id = element.parentNode.parentNode.id;
  const targetCard = document.getElementById(id);
  const readMore = targetCard.querySelector(".readMore");

  readMore.parentNode.removeChild(readMore);

  const descriptionParagraph = targetCard.querySelector(".description");

  if (descriptionParagraph) {
    descriptionParagraph.setAttribute("style", "height: auto;");
  }
};
