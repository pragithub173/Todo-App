//check for exsting or saved data

const todoGetSaved = () => {
  const todoJSON = localStorage.getItem("todos");
  return todoJSON !== null ? JSON.parse(todoJSON) : [];
};

const todoSaved = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};
const removeTodo = (id) => {
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
  }
};

//toggeltodo
const toogleTodo = (id) => {
  const todo = todos.find((todo) => todo.id === id);
  if (todo !== undefined) {
    todo.completed = !todo.completed;
  }
};

const renderTodos = (todos, filters) => {
  const filteredTodos = todos.filter((todo) => {
    const searchTextMatch = todo.text
      .toLowerCase()
      .includes(filters.searchText.toLowerCase());
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed;
    //debugger;
    return searchTextMatch && hideCompletedMatch;

    //return todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
  });

  const incompleteTodos = filteredTodos.filter((todo) => !todo.completed);

  document.querySelector("#todos").innerHTML = "";

  const summary = document.createElement("h2");
  summary.textContent = `You have ${incompleteTodos.length} todos left`;
  document
    .querySelector("#todos")
    .appendChild(generateSummaryDOM(incompleteTodos));

  filteredTodos.forEach((todo) => {
    document.querySelector("#todos").appendChild(generateTodoDOM(todo));
  });
};

//generate DOM structure

const generateTodoDOM = (todo) => {
  const todoEl = document.createElement("div");

  const checkBox = document.createElement("input");

  const todoText = document.createElement("span");

  const button = document.createElement("button");

  //set up todo checkbox
  checkBox.setAttribute("type", "checkbox");
  checkBox.checked = todo.completed;
  todoEl.appendChild(checkBox);
  checkBox.addEventListener("change", () => {
    toogleTodo(todo.id);
    todoSaved(todos);
    renderTodos(todos, filters);
  });

  //setup todo text
  todoText.textContent = todo.text;
  todoEl.appendChild(todoText);

  button.textContent = "x";
  todoEl.appendChild(button);
  button.addEventListener("click", function () {
    removeTodo(todo.id); //modify
    todoSaved(todos); //save
    renderTodos(todos, filters); //display
  });

  return todoEl;
};

const generateSummaryDOM = (incompleteTodos) => {
  const summary = document.createElement("h2");
  summary.textContent = `You have ${incompleteTodos.length} todos left`;
  return summary;
};
