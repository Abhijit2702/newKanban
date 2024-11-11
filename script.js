document.addEventListener("DOMContentLoaded", () => {
  const addTaskButton = document.getElementById("addTaskButton");
  const newTaskInput = document.getElementById("newTaskInput");
  const todoList = document.querySelector("#todo ul");
  const inProgressList = document.querySelector("#inProgress ul");
  const doneList = document.querySelector("#done ul");

  // Load tasks from local storage
  loadTasks();

  // Add task event
  addTaskButton.addEventListener("click", () => {
    const taskText = newTaskInput.value.trim();
    if (taskText) {
      addTask(taskText, "todo");
      newTaskInput.value = "";
    }
  });

  function addTask(taskText, status) {
    const li = document.createElement("li");
    li.textContent = taskText;

    li.addEventListener("click", () => {
      if (status === "todo") {
        moveTask(li, "inProgress");
      } else if (status === "inProgress") {
        moveTask(li, "done");
      } else {
        li.remove();
      }
    });

    if (status === "todo") {
      todoList.appendChild(li);
    } else if (status === "inProgress") {
      inProgressList.appendChild(li);
    } else {
      doneList.appendChild(li);
    }

    saveTasks();
  }

  function moveTask(task, newStatus) {
    task.remove();
    addTask(task.textContent, newStatus);
    saveTasks();
  }

  function saveTasks() {
    const tasks = {
      todo: Array.from(todoList.children).map((li) => li.textContent),
      inProgress: Array.from(inProgressList.children).map(
        (li) => li.textContent
      ),
      done: Array.from(doneList.children).map((li) => li.textContent),
    };
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
      tasks.todo.forEach((task) => addTask(task, "todo"));
      tasks.inProgress.forEach((task) => addTask(task, "inProgress"));
      tasks.done.forEach((task) => addTask(task, "done"));
    }
  }
});
