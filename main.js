const input = document.getElementById("input");
const button = document.getElementById("button");
const form = document.getElementById("form");
const ul = document.getElementById("ul");

form.addEventListener("submit", addTodo);

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function addTodo(event) {
  event.preventDefault();

  if (input.value.trim() === "") {
    return alert("Заполните поле");
  }

  const obj = {
    id: Date.now().toString(),
    title: input.value,
    completed: false,
  };

  todos.push(obj);
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos(todos);
  input.value = "";
}

function renderTodos(todosArray = []) {
  ul.innerHTML = "";

  todosArray.forEach((element) => {
    const li = document.createElement("li");
    li.id = element.id;

    const span = document.createElement("span");
    span.textContent = element.title;
    if (element.completed) {
      span.style.textDecoration = "line-through";
      span.style.textDecorationThickness = "2px";
      span.style.textDecorationColor = "red";
    }

    li.classList.add("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");
    checkbox.checked = element.completed;
    checkbox.addEventListener("change", () => {
      element.completed = checkbox.checked;
      updateTodo(element.id, element.completed);
      renderTodos(todos);
    });

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("button1");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      deleteTodo(element.id);
    });

    const liContainer = document.createElement("div");
    liContainer.classList.add("delete-container");
    liContainer.append(checkbox, deleteButton);
    li.append(span, liContainer);
    ul.append(li);
  });
}

function updateTodo(id, completed) {
  todos = todos.map((todo) => {
    if (todo.id === id) {
      return { ...todo, completed };
    }
    return todo;
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteTodo(id) {
  const vibor = document.getElementById("vibor");
id1.style.display = "block";

  const no = document.getElementById("no");
  const yes = document.getElementById("yes");

  yes.addEventListener("click", () => {
    todos = todos.filter((item) => item.id !== id);
    localStorage.setItem("todos", JSON.stringify(todos));
  id1.style.display = "none";
    renderTodos(todos);
  });

  no.addEventListener("click", () => {
  id1.style.display = "none";
  });
}

renderTodos(todos);
