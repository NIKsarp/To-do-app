const ul = document.getElementById("todoList");
const addButton = document.getElementById("addButton");
const input = document.getElementById("taskInput");

loadTasks();

function createElement(tagName, textContent) {
  const element = document.createElement(tagName);

  if (textContent) {
    element.appendChild(document.createTextNode(textContent));
  }

  return element;
}

function createCard(inputId, taskContent) {
  // ELEMENTS
  const li = createElement("li");
  const checkbox = createElement("input");
  const label = createElement("label", taskContent);
  const button = createElement("button", "Close");

  // CLASSNAME
  li.className = `todo-item`;
  checkbox.className = `task-checkbox`;
  label.className = `task-label`;
  button.className = `btn-close`;

  // ATTRIBUTES
  checkbox.type = "checkbox";
  checkbox.id = inputId;
  label.htmlFor = inputId;

  // EVENT LISTENERS
  checkbox.addEventListener("change", () => {
    label.style.textDecoration = checkbox.checked ? "line-through" : "none";
  });

  button.addEventListener("click", (e) => {
    e.target.parentElement.remove();
    saveTasks();
  });

  // APPEND ELEMENTS
  li.append(checkbox, label, button);
  return li;
}

const newTaskId = `task-${ul.children.length + 1}`;

input.addEventListener(`keyup`, (e) => {
  const taskValue = e.target.value.trim();

  if (e.key == "Enter" && e.target.value !== "") {
    ul.appendChild(createCard(newTaskId, taskValue));
    e.target.value = "";

    saveTasks();
  }
});

addButton.addEventListener("click", () => {
  const taskValue = input.value.trim();
  if (taskValue !== "") {
    ul.appendChild(createCard(newTaskId, taskValue));
    input.value = "";

    saveTasks();
  }
});

function saveTasks() {
  const tasks = [];
  const li = ul.getElementsByClassName(`todo-item`);

  for (let index = 0; index < li.length; index++) {
    const element = li[index];
    const label = element.querySelector(".task-label");

    if (label) {
      const taskContent = label.textContent;
      tasks.push(taskContent);
    }
  }

  localStorage.setItem("keys", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("keys")) || [];

  for (let index = 0; index < tasks.length; index++) {
    const taskContent = tasks[index];
    const label = `task-${index + 1}`;
    const taskItem = createCard(label, taskContent);

    ul.appendChild(taskItem);
  }
}
