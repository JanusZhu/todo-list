import Project from "./Project";
import Storage from "./Storage";

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
    row.classList.add("add-section");
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

  static loadProjectBtn(e) {
    e.classList.add("hidden");
    const row = document.createElement("div");
    row.classList.add("new-project");
    const input = document.createElement("input");
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
