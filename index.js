const todoList = document.getElementById("todoList");
const addButton = document.getElementById("addButton");
const taskInput = document.getElementById("taskInput");
loadTasks();
function createElement(tagName, className, textContent) {
  const element = document.createElement(tagName);
  element.className = className;
  if (textContent) element.appendChild(document.createTextNode(textContent));
  return element;
}
function createCard(inputId, taskContent) {
  const listItem = createElement("li", "todo-item");
  const checkbox = createElement("input", "task-checkbox");
  const taskLabel = createElement("label", "task-label", taskContent);
  const closeButton = createElement("button", "btn-close", "Close");
  checkbox.type = "checkbox";
  checkbox.id = inputId;
  taskLabel.htmlFor = inputId;

  checkbox.addEventListener("change", () => {
    taskLabel.style.textDecoration = checkbox.checked ? "line-through" : "none";
  });

  closeButton.addEventListener("click", (e) => {
    e.target.parentElement.remove();
    saveTasks();
  });

  listItem.append(checkbox, taskLabel, closeButton);
  return listItem;
}

const newTaskId = `task-${todoList.children.length + 1}`;
taskInput.addEventListener(`keyup`, (e) => {
  const taskValue = e.target.value.trim();
  if (e.key == "Enter" && e.target.value !== "") {
    todoList.appendChild(createCard(newTaskId, taskValue));
    e.target.value = "";
    saveTasks();
  }
});

addButton.addEventListener("click", () => {
  const taskValue = taskInput.value.trim();
  if (taskValue !== "") {
    todoList.appendChild(createCard(newTaskId, taskValue));
    taskInput.value = "";
    saveTasks();
  }
});

function saveTasks() {
  const tasks = [];
  const listItem = todoList.getElementsByClassName(`todo-item`);
  Array.from(listItem).forEach((element) => {
    const taskLabel = element.querySelector(".task-label");
    if (taskLabel) {
      const taskContent = taskLabel.textContent;
      tasks.push(taskContent);
    }
  });
  localStorage.setItem("keys", JSON.stringify(tasks));
}
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("keys")) || [];
  tasks.forEach((taskContent, index) => {
    const taskLabel = `task-${index + 1}`;
    const taskItem = createCard(taskLabel, taskContent);
    todoList.appendChild(taskItem);
  });
}
