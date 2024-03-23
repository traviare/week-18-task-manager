// переменные для нахождения элементов на странице
const findInput = document.querySelector("#input-1");
const findAddBtn = document.querySelector("#button-add");
const findDeleteBtn = document.querySelector("#button-delete");
const findUl = document.querySelector(".tasks");
const findNoTask = document.querySelector(".no-task");
const formOne = document.forms.form;
const findCheckbox = document.querySelector(".task_checkbox");

// работа с localStorage
let tasks = [];

if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
}

tasks.forEach(function (task) {
  createTask(task);
});

// добавление задач
formOne.addEventListener("submit", function (event) {
  // отменяем отправку формы
  event.preventDefault();
  // получаем значение из инпута
  const taskText = findInput.value;

  tasks.push(taskText);

  //формируем разметку для новой задачи
  createTask(taskText);
  findInput.value = "";
  findInput.focus();

  // сохраняем задачи в localStorage
  const tasksJSON = JSON.stringify(tasks);
  localStorage.setItem("tasks", tasksJSON);
});

// удаление задач
function deleteTask() {
  const findTasks = document.querySelectorAll(".task");
  const array = Array.from(findTasks);
  array.forEach(function (item) {
    item.remove();
  });
  findNoTask.classList.remove("none");
  findDeleteBtn.disabled = true;
  localStorage.clear();
  location.reload(false);
}

findDeleteBtn.addEventListener("click", deleteTask);

//функция для создания и добавления задачи в список
function createTask(task) {
  const taskHTML = `<li class="task">
    <p class="task_text">${task}</p>
    <input type="checkbox" class="task_checkbox">
</li>`;

  findUl.insertAdjacentHTML("beforeend", taskHTML);
  if (findUl.children.length > 1) {
    findNoTask.classList.add("none");
    findDeleteBtn.disabled = false;
  }
}
