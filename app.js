let tasks = document.getElementById("tasks");
let addBtn = document.getElementById("add-btn");
let tasksArray = [];
// get data from local storage
function getTasksFromStorage() {
  let retrivedTasks = JSON.parse(localStorage.getItem("tasks"));
  tasksArray = retrivedTasks ?? [];
}
getTasksFromStorage();
// read task of tasks
function fillTaskOnThePage() {
  tasks.innerHTML = "";
  for (let i = 0; i < tasksArray.length; i++) {
    let content = `
  <div class="task ${tasksArray[i].isDone ? "done" : ""}">
    <div class="info">
    ${
      tasksArray[i].isDone
        ? `<span>🎉تم الأنجاز</span><h3><del>${tasksArray[i].title}<del/></h3>`
        : `<span>⏳مهمة غير منجزة</span><h3>${tasksArray[i].title}</h3>`
    }
      <div>
        <i class="fa-solid fa-calendar"></i>
        <span>
          ${tasksArray[i].date}
        </span>
      </div>
    </div> 
    <div class="btns-action">
    <button id='check'>
    <input type='checkbox' ${
      tasksArray[i].isDone ? "checked" : ""
    } onchange="toggleTaskComplation(${i},this)"/>
    </button>
    <button onclick="editTask(${i})" class="edit"><i class="fa-solid fa-pen"></i></button>
    <button onclick="deleteTask(${i})" class="delete"><i class="fa-solid fa-x"></i> </button>
    </div>
</div>`;
    tasks.innerHTML += content;
  }
  storageTasks();
  clearAllBtn();
}
{
  /* <button ${
  tasksArray[i].isDone ? "class='btn-done'" : ""
} onclick="toggleTaskComplation(${i})">
<i class="fa-solid fa-${tasksArray[i].isDone ? "x" : "check"}">
</i></button> */
}
fillTaskOnThePage();
// create date now
function dateNow() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours =
    date.getHours() >= 12 ? `${date.getHours() - 12}` : `${date.getHours()}`;
  let minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const formattedDate = `(${day}-${month}-${year}) ${hours}:${minutes} ${
    date.getHours() >= 12 ? "مساء" : "صباحا"
  }`;
  return formattedDate;
}

// Add task of TasksArray
addBtn.onclick = function () {
  let taskName = prompt("الرجاء ادخال عنوان المهمة");
  if (taskName) {
    let taskObj = {
      title: taskName,
      date: dateNow(),
      isDone: false,
    };
    tasksArray.push(taskObj);
    fillTaskOnThePage();
  }
};

// delete Task
function deleteTask(index) {
  let isConfirmed = confirm(
    `هل انت متاكد من حذف مهمة : ${tasksArray[index].title} ؟`
  );
  if (isConfirmed) {
    tasksArray.splice(index, 1);
    fillTaskOnThePage();
  }
}
// edit the task
function editTask(index) {
  let newTitle = prompt(
    "الرجاء ادخال عنوان المهمة الجديد",
    tasksArray[index].title
  );
  if (newTitle) {
    tasksArray[index].title = newTitle;
    tasksArray[index].date = dateNow();
    fillTaskOnThePage();
  }
}
// complate task
function toggleTaskComplation(index, element) {
  if (element.checked) {
    tasksArray[index].isDone = true;
  } else {
    tasksArray[index].isDone = false;
  }
  fillTaskOnThePage();
}

// Clear All Tasks
function clearAllBtn() {
  btnCl = document.getElementById("clear-btn");
  if (tasksArray.length > 0) {
    btnCl.style.display = "block";
  } else {
    btnCl.style.display = "none";
  }
  btnCl.onclick = function () {
    isConfirmed = confirm("هل انت متأكد من حذف كل المهام؟");
    if (isConfirmed) {
      tasksArray = [];
      fillTaskOnThePage();
      clearAllBtn();
    }
  };
}
clearAllBtn();
// ======= STORAGE TASKS ADD ===========
function storageTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
}
