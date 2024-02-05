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
    alert("hello");
  }
};
/**
 *
 * @param {*} element
 * @param {*} data
 *
 *
 * @returns
 */
const cardsToAppend = (element, data) => {
  const card = document
    .querySelector("#singleTaskCardTempl")
    .content.cloneNode(true);

  const cardHeading = card.querySelector(".cardHeading");
  const tagContainer = card.querySelector(".tag-Container");

  // Set the following data content to element
  cardHeading.textContent = data.todoName;

  data.tags.forEach((tag) => {
    const tagElement = document
      .querySelector("#chipTagTemplate")
      .content.cloneNode(true);
    tagElement.textContent = tag;

    tagContainer.appendChild(tagElement);
    console.log(tagElement, tag);
  });

  element.appendChild(card);
};

// const setCardInCategory = (div, name, desc, tags, createDate, updateDate) => {
//   const tagTemp = document
//     .getElementById("singleTaskCardTempl")
//     .content.cloneNode(true);
//   div.appendChild(tagTemp);

//   const todoTag = document.querySelector("#tag-Container");
//   const todoCreateDate = document.querySelector("#createDateSpan");
//   const todoUpdateDate = document.querySelector("#updateDateSpan");

//   document.querySelector("h4").innerHTML = name;

//   for (let i = 0; i < tags.length; i++) {
//     const chipTagTemplate = todoTag
//       .getElementsByClassName("chipTagTemplate")
//       .content.cloneNode(true);
//     todoTag.appendChild(chipTagTemplate);
//     // chipTagTemplate.innerHTML = tags[i];
//     document.querySelectorAll(".tags")[i].innerHTML = tags[i];
//   }

//   document.querySelector("h5").innerHTML = desc;
//   todoCreateDate.innerHTML = createDate;
//   todoUpdateDate.innerHTML = updateDate;
// };
