// global variables
var addInput = document.getElementById("floatingText");
var addBtn = document.querySelector(".add_btn");
var tasksCounter = document.querySelectorAll(".tasks-counter");
var CompletedCounter = document.querySelector(".completed-counter");
var tasksContainer = document.querySelector(".tasks-container");
var notfoundText = document.querySelector(".notfound-tasks");
var icon = document.querySelector(".add_btn i");

var tasksList;

if (localStorage.getItem("Tasks")) {
  tasksList = JSON.parse(localStorage.getItem("Tasks"));
  displayTasks(tasksList);
  toggleEmptyState();
  updateCounters();
} else {
  tasksList = [];
  displayTasks(tasksList);
  toggleEmptyState();
  updateCounters();
}

// Add tasks Function

addBtn.addEventListener("click", addTasks);

function addTasks() {
  if (addInput.value.trim() == "") {
    Swal.fire({
      title: "Input is empty",
      text: "Please Write in the input",
      icon: "warning",
    });
    return;
  }
  if (currentIndex == -1) {
    tasksList.push({
      title: addInput.value.trim(),
      completed: false,
    });
  } else {
    tasksList[currentIndex].title = addInput.value.trim();
    currentIndex = -1;

    icon.classList.remove("fa-pen");
    icon.classList.add("fa-plus");
  }

  addInput.value = "";
  displayTasks(tasksList);
  toggleEmptyState();
  updateCounters();
  saveToLocalStorage();
}

// Display tasks function
function displayTasks(tasks) {
  var box = "";
  for (var i = 0; i < tasks.length; i++) {
    box += `
                          <div class="task-card ${tasks[i].completed ? "completed" : ""}">
  <div class="task-left">
    <input
      class="form-check-input"
      type="checkbox"
      onchange="toggleCompleted(${i})"
      ${tasks[i].completed ? "checked" : ""}
    />

    <h5 class="task-title">${tasks[i].title}</h5>
  </div>

  <div class="task-actions">
    <button class="action-btn edit-btn" onclick="updateTasks(${i})">
      <i class="fa-solid fa-pen"></i>
    </button>

    <button class="action-btn delete-btn" onclick="deleteTasks(${i})">
      <i class="fa-solid fa-trash"></i>
    </button>
  </div>
</div>
        `;
  }
  tasksContainer.innerHTML = box;
}

function toggleEmptyState() {
  if (tasksList.length === 0) {
    notfoundText.classList.remove("d-none");
  } else {
    notfoundText.classList.add("d-none");
  }
}

// delete tasks function

function deleteTasks(index) {
  Swal.fire({
    title: "Are you sure?",
    text: "You want to delete this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      tasksList.splice(index, 1);
      displayTasks(tasksList);
      updateCounters();
      saveToLocalStorage();
    } else {
      Swal.fire({
        title: " hasn't been deleted",
        text: "Your Task hasn't been deleted.",
        icon: "success",
      });
    }

    if (result.isConfirmed)
      Swal.fire({
        title: "Deleted!",
        text: "Your Task has been deleted.",
        icon: "success",
      });
  });
}
// Update Tasks function

var currentIndex = -1;
function updateTasks(index) {
  addInput.value = tasksList[index].title;
  addInput.focus()

  currentIndex = index;

  icon.classList.remove("fa-plus");
  icon.classList.add("fa-pen");
}

function saveToLocalStorage() {
  localStorage.setItem("Tasks", JSON.stringify(tasksList));
}

function updateCounters() {
  for (var i = 0; i < tasksCounter.length; i++) {
    tasksCounter[i].innerHTML = tasksList.length;
  }

  var completed = 0;

  for (var i = 0; i < tasksList.length; i++) {
    if (tasksList[i].completed) {
      completed++;
    }
  }

  CompletedCounter.innerHTML = completed;
}

function toggleCompleted(index) {
  tasksList[index].completed = !tasksList[index].completed;

  displayTasks(tasksList);
  updateCounters();
  saveToLocalStorage();
}