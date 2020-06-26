// const todos = [
//   {
//     text: "Get up at 6",
//     completed: true,
//   },
//   {
//     text: "take bath",
//     completed: false,
//   },
//   {
//     text: "Go to college",
//     completed: true,
//   },
//   {
//     text: "Come back home",
//     completed: false,
//   },
//   {
//     text: "Sleep on the bed",
//     completed: true,
//   },
// ];

let todos = todoGetSaved();

const filters = {
  searchText: "",
  hideCompleted: false,
};

renderTodos(todos, filters);

// const pTag = document.querySelectorAll("p");
// console.log(pTag);

// pTag.forEach(function (paragraphs) {
//   //n.remove();
//   if (paragraphs.textContent.includes("the")) {
//     paragraphs.remove();
//   }
// });

//adding a new element dynamically

// const incompleteTodo = todoTask.filter(function (todo) {
//   return !todo.completed;
// });

// const summary = document.createElement("h2");
// summary.textContent = `You have ${incompleteTodo.length} todos left`;
// document.querySelector("body").appendChild(summary);

// todoTask.forEach(function (todo) {
//   if (!todo.completed) {
//     const para = document.createElement("p");
//     para.textContent = todo.title;
//     document.querySelector("body").appendChild(para);
//   }
// });

//listen for new todo creation
// document.querySelector("#add-content").addEventListener("click", function (e) {
//   console.log("Add content");
// });

//listen for to do text change
// document
//   .querySelector("#new-todo-text")
//   .addEventListener("input", function (e) {
//     console.log(e.target.value);
//   });

document.querySelector("#search-text").addEventListener("input", function (e) {
  filters.searchText = e.target.value;
  renderTodos(todos, filters);
});

document.querySelector("#new-todo").addEventListener("submit", function (e) {
  e.preventDefault();
  todos.push({
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
