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

const renderTodos = function (todos, filters) {
  const filteredTodos = todos.filter(function (todo) {
    const searchTextMatch = todo.text
      .toLowerCase()
      .includes(filters.searchText.toLowerCase());
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed;

    return searchTextMatch && hideCompletedMatch;

    //return todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
  });

  // filteredTodos = filteredTodos.filter(function (todos) {
  //   return !filters.hideCompleted || !todos.completed;
  //   // if (filters.hideCompleted) {
  //   //   return !todo.completed;
  //   // } else {
  //   //   return true;
  //   // }
  // });

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
  const p = document.createElement("p");

  p.textContent = todo.text;
  return p;
};

const generateSummaryDOM = function (incompleteTodos) {
  const summary = document.createElement("h2");
  summary.textContent = `You have ${incompleteTodos.length} todos left`;
  return summary;
};
