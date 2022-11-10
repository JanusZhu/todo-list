import Project from "./Project";
import Storage from "./Storage";
import Task from "./Task";

export default class UI {
  static loadContent() {
    const content = document.querySelector("#content");
    content.innerHTML = "";
    this.loadHeader();
    this.loadHome();
    this.loadFooter();
  }

  static loadHeader() {
    const content = document.querySelector("#content");
    const header = document.createElement("header");

    const headerImg = document.createElement("img");
    headerImg.src = "https://img.icons8.com/arcade/64/000000/todo-list.png";
    const headerTxt = document.createElement("p");
    headerTxt.textContent = "Todoism";
    header.append(headerImg, headerTxt);
    content.append(header);
  }
  static loadFooter() {
    const content = document.querySelector("#content");
    const footer = document.createElement("footer");
    footer.textContent = "Copyrights© JanusZhu |";
    const link = document.createElement("a");
    link.href = "#";
    link.textContent = "Source Code";
    footer.appendChild(link);
    content.append(footer);
  }

  static loadHome() {
    const content = document.querySelector("#content");
    const home = document.createElement("div");
    home.classList.add("home");
    content.append(home);
    this.loadSideBar();
    this.loadProjectPreview();
  }

  static loadSideBar() {
    const home = document.querySelector(".home");
    const sideBar = document.createElement("div");
    sideBar.classList.add("sideBar");
    home.append(sideBar);
    this.loadProjects();
  }

  static loadProjects() {
    const sideBar = document.querySelector(".sideBar");
    sideBar.innerHTML = "";
    const projectSection = document.createElement("div");
    const todoList = Storage.getTodoList();
    console.log(todoList.getProjects().length);
    for (let i = 0; i < todoList.getProjects().length; i++) {
      const projectName = todoList.getProjects()[i].getName();
      console.log(projectName);
      if (
        projectName != "Today" &&
        projectName != "Inbox" &&
        projectName != "This week"
      ) {
        const row = document.createElement("div");
        row.classList.add("project");
        row.addEventListener("click", () => {
          this.loadProjectDetails(projectName);
        });
        const icon = document.createElement("img");
        icon.src = "https://img.icons8.com/cotton/64/000000/bulleted-list.png";

        const text = document.createElement("p");
        text.textContent = projectName;
        const deleteBtn = document.createElement("img");
        deleteBtn.classList.add("delete");
        deleteBtn.src =
          "https://img.icons8.com/sf-ultralight/25/000000/delete-forever.png";
        deleteBtn.addEventListener("click", () => {
          this.handleDelete(projectName);
        });

        row.append(icon, text, deleteBtn);
        projectSection.append(row);
      }
    }
    sideBar.append(projectSection, this.loadAddSection());
  }

  static loadAddSection() {
    const row = document.createElement("div");
    row.classList.add("add-project");
    const addIcon = document.createElement("img");
    addIcon.src = "https://img.icons8.com/ios-glyphs/30/000000/plus-math.png";
    const text = document.createElement("p");
    text.textContent = "Add A New Project";
    row.append(addIcon, text);
    row.addEventListener("click", () => {
      this.loadProjectBtn(row);
    });
    return row;
  }
  static loadProjectDetails(name) {
    const preview = document.querySelector(".preview");
    preview.innerHTML = `<div class = "project-title">${name}</div>`;

    this.loadTasks(name);
    this.loadAddTask();
    this.loadCompleteBtn();
    this.loadDeleteBtn();
    this.loadNameBtn();
  }
  static replaceName(btn) {
    const div = document.createElement("div");
    const taskName = btn.textContent;
    div.innerHTML = `<div class="change-name"><input type="text" id="new-name" value=${btn.textContent} maxlength="8"> <button class="update"> Update </button> <button class="cancel"> Cancel </button></div>`;
    btn.insertAdjacentElement("afterend", div);
    const update = document.querySelector(".update");
    update.addEventListener("click", () => {
      const newName = document.querySelector("#new-name").value;
      console.log(newName);
      const projectName = document.querySelector(".project-title").textContent;
      Storage.changeTaskName(projectName, taskName, newName);
      this.loadProjectDetails(projectName);
    });
  }

  static loadNameBtn() {
    const btns = Array.from(document.querySelectorAll(".task-name"));
    btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        btn.classList.add("hidden");
        this.replaceName(btn);
      });
    });
  }
  static loadDeleteBtn() {
    const btns = Array.from(document.querySelectorAll(".task-complete"));
    btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const name = btn.getAttribute("data-for-task");
        const task = document.querySelector(`[data-info-task = ${name}]`);
        task.classList.toggle("completed");
      });
    });
  }
  static loadCompleteBtn() {
    const btns = Array.from(document.querySelectorAll(".task-delete"));
    btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const taskName = btn.getAttribute("data-for-task");
        const projectName =
          document.querySelector(".project-title").textContent;
        Storage.deleteTask(projectName, taskName);
        this.loadProjectDetails(projectName);
        console.log("yes");
      });
    });
  }
  static loadTasks(name) {
    const taskSection = document.createElement("div");
    taskSection.classList.add("task-section");
    document.querySelector(".preview").append(taskSection);
    Storage.getTodoList()
      .getProject(name)
      .getTasks()
      .forEach((task) => this.loadTask(task));
  }
  static loadTask(task) {
    const taskSection = document.querySelector(".task-section");
    taskSection.innerHTML += `<div class="task-detail"><img src = "https://img.icons8.com/ios/50/000000/task-completed.png" class= "task-complete" data-for-task = "${task.getName()}"><div class="task-name" data-info-task = "${task.getName()}">${task.getName()}</div> <div class="task-dueDate">${task.getDueDate()}</div><img src="https://img.icons8.com/ios-glyphs/30/000000/multiply.png"/ class="task-delete" data-for-task = "${task.getName()}"></div>`;
  }
  static loadAddTask() {
    const row = document.createElement("div");
    row.classList.add("add-task");
    const addIcon = document.createElement("img");
    addIcon.src = "https://img.icons8.com/ios-glyphs/30/000000/plus-math.png";
    const text = document.createElement("p");
    text.textContent = "Add A New Task";
    row.append(addIcon, text);
    const preview = document.querySelector(".preview");
    preview.append(row);
    row.addEventListener("click", () => {
      this.loadAddTaskBtn(row);
    });
  }
  static loadAddTaskBtn(e) {
    console.log(e);
    e.classList.add("hidden");
    const row = document.createElement("div");
    row.classList.add("new-task");
    const input = document.createElement("input");
    input.id = "task-name";
    input.type = "text";
    input.placeholder = "Name";
    input.maxLength = 8;
    const addBtn = document.createElement("button");
    addBtn.classList.add("add");
    addBtn.textContent = "Add";
    addBtn.addEventListener("click", () => {
      this.handleAddTask();
    });
    const cancelBtn = document.createElement("button");
    cancelBtn.classList.add("cancel");
    cancelBtn.textContent = "Cancel";
    cancelBtn.addEventListener("click", () => {
      this.handleCancelTask();
    });
    row.append(input, addBtn, cancelBtn);
    const preview = document.querySelector(".preview");
    preview.appendChild(row);
  }

  static handleAddTask() {
    const input = document.querySelector("#task-name");
    const projectName = document.querySelector(".project-title").textContent;
    if (input.value === "") {
      alert("Please add a name");
    } else {
      Storage.addTask(projectName, new Task(input.value));
      this.handleCancelTask();
      this.loadProjectDetails(projectName);
    }
  }

  static handleCancelTask() {
    document.querySelector(".new-task").remove();
    if (document.querySelector(".hidden")) {
      const row = document.querySelector(".hidden");
      row.classList.remove("hidden");
    }
  }

  static loadProjectBtn(e) {
    e.classList.add("hidden");
    const row = document.createElement("div");
    row.classList.add("new-project");
    const input = document.createElement("input");
    input.id = "project-name";
    input.type = "text";
    input.placeholder = "Name";
    input.maxLength = 8;
    const addBtn = document.createElement("button");
    addBtn.classList.add("add");
    addBtn.textContent = "Add";
    addBtn.addEventListener("click", () => {
      this.handleAdd();
    });
    const cancelBtn = document.createElement("button");
    cancelBtn.classList.add("cancel");
    cancelBtn.textContent = "Cancel";
    cancelBtn.addEventListener("click", () => {
      this.handleCancel();
    });
    row.append(input, addBtn, cancelBtn);
    const sideBar = document.querySelector(".sideBar");
    sideBar.appendChild(row);
  }
  static handleAdd() {
    const input = document.querySelector("input");
    if (input.value === "") {
      alert("Please add a name");
    } else {
      Storage.addProject(new Project(input.value));
      this.handleCancel();
      this.loadProjects();
    }
  }
  static handleDelete(i) {
    console.log(i);
    Storage.deleteProject(i);
    this.loadContent();
  }
  static handleCancel() {
    document.querySelector(".new-project").remove();
    if (document.querySelector(".hidden")) {
      const row = document.querySelector(".hidden");
      row.classList.remove("hidden");
    }
  }

  static loadProjectPreview() {
    const home = document.querySelector(".home");
    const preview = document.createElement("div");
    preview.classList.add("preview");
    home.append(preview);
  }
}
