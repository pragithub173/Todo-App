//check for exsting or saved data

const todoGetSaved = function () {
  const todoJSON = localStorage.getItem("todos");
  if (todoJSON !== null) {
    return JSON.parse(todoJSON);
  } else {
    return [];
  }
};

const todoSaved = function () {
  localStorage.setItem("todos", JSON.stringify(todos));
};
const removeTodo = function (id) {
  const todoIndex = todos.findIndex(function (todo) {
    return todo.id === id;
  });
  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
  }
};

//toggeltodo
const toogleTodo = function (id) {
  const todo = todos.find(function (todo) {
    return todo.id === id;
  });
  if (todo !== undefined) {
    todo.completed = !todo.completed;
  }
};

const renderTodos = function (todos, filters) {
  const filteredTodos = todos.filter(function (todo) {
    const searchTextMatch = todo.text
      .toLowerCase()
      .includes(filters.searchText.toLowerCase());
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed;
    //debugger;
    return searchTextMatch && hideCompletedMatch;

    //return todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
  });

  const incompleteTodos = filteredTodos.filter(function (todo) {
    return !todo.completed;
  });

  document.querySelector("#todos").innerHTML = "";

  const summary = document.createElement("h2");
  summary.textContent = `You have ${incompleteTodos.length} todos left`;
  document
    .querySelector("#todos")
    .appendChild(generateSummaryDOM(incompleteTodos));

  filteredTodos.forEach(function (todo) {
    document.querySelector("#todos").appendChild(generateTodoDOM(todo));
  });
};

//generate DOM structure

const generateTodoDOM = function (todo) {
  const todoEl = document.createElement("div");

  const checkBox = document.createElement("input");

  const todoText = document.createElement("span");

  const button = document.createElement("button");

  //set up todo checkbox
  checkBox.setAttribute("type", "checkbox");
  checkBox.checked = todo.completed;
  todoEl.appendChild(checkBox);
  checkBox.addEventListener("change", function () {
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

const generateSummaryDOM = function (incompleteTodos) {
  const summary = document.createElement("h2");
  summary.textContent = `You have ${incompleteTodos.length} todos left`;
  return summary;
};
