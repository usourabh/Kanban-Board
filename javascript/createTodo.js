const createTodo = () => {
  const todo = [];
  const todoTitle = document.getElementById("#createBtn").value;
  const todoDescription = document.getElementById("#createBtn").value;

  if (localStorage.getItem("todo") == null) {
    todo = [
      {
        id: 1,
        todoName: todoTitle,
        todoDesc: todoDescription,
      },
    ];
  }
};

const removeTag = (e) => {
  e.parentNode.parentNode.removeChild(e.parentNode.parentNode);
};
