import Project from "./Project";
import Storage from "./Storage";
import Task from "./Task";

export default class UI {
  static loadHeader() {
    const header = document.createElement("header");

    const headerImg = document.createElement("img");
    headerImg.src = "https://img.icons8.com/arcade/64/000000/todo-list.png";
    const headerTxt = document.createElement("p");
    headerTxt.textContent = "Todoism";
    header.append(headerImg, headerTxt);
    return header;
  }
  static loadFooter() {
    const footer = document.createElement("footer");
    footer.textContent = "Copyrights© JanusZhu |";
    const link = document.createElement("a");
    link.href = "#";
    link.textContent = "Source Code";
    footer.appendChild(link);
    const content = document.getElementById("content");
    content.after(footer);
    return footer;
  }

  static loadHome() {
    const home = document.createElement("div");
    home.classList.add("home");
    home.append(this.loadSideBar(), this.loadProjectPreview());
    return home;
  }

  static loadSideBar() {
    const sideBar = document.createElement("div");
    sideBar.classList.add("sideBar");

    sideBar.append(this.loadProjects(), this.loadAddSection());

    return sideBar;
  }

  static loadProjects() {
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
    return projectSection;
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
    preview.append(this.loadAddTask());
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
    taskSection.innerHTML += `<div class="task-detail"><img src="https://img.icons8.com/ios/50/000000/task-completed.png"/ class="task-complete"> <div class="task-name">${task.getName()}</div><div class="task-dueDate">${task.getDueDate()}</div><img src="https://img.icons8.com/ios-glyphs/30/000000/multiply.png"/ class="task-delete"></div>`;
  }
  static loadAddTask() {
    const row = document.createElement("div");
    row.classList.add("add-task");
    const addIcon = document.createElement("img");
    addIcon.src = "https://img.icons8.com/ios-glyphs/30/000000/plus-math.png";
    const text = document.createElement("p");
    text.textContent = "Add A New Task";
    row.append(addIcon, text);
    row.addEventListener("click", () => {
      this.loadAddTaskBtn(row);
    });
    return row;
  }
  static loadAddTaskBtn(e) {
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
      this.handleCancel();
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
      this.loadContent();
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
      this.loadContent();
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
    const preview = document.createElement("div");
    preview.classList.add("preview");
    return preview;
  }

  static loadContent() {
    const content = document.querySelector("#content");
    content.innerHTML = "";
    content.append(this.loadHeader(), this.loadHome(), this.loadFooter());
  }
}
