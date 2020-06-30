let todos = todoGetSaved();

const filters = {
  searchText: "",
  hideCompleted: false,
};

renderTodos(todos, filters);

document.querySelector("#search-text").addEventListener("input", function (e) {
  filters.searchText = e.target.value;
  renderTodos(todos, filters);
});

document.querySelector("#new-todo").addEventListener("submit", function (e) {
  e.preventDefault();
  todos.push({
    id: uuidv4(),
    text: e.target.elements.text.value,
    completed: false,
  });
  todoSaved(todos);
  renderTodos(todos, filters);
  e.target.elements.text.value = ""; //clears after submit is clicked
});

document.querySelector("#hide").addEventListener("change", function (e) {
  filters.hideCompleted = e.target.checked;
  renderTodos(todos, filters);
  //console.log(e.target.checked);
});
