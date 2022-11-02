class Storage {
  static setDefaultProjects() {
    localStorage.removeItem("projects");
    localStorage.setItem("projects", ["Inbox", "Today", "This week"]);
  }

  static addProject(project) {
    let projects = localStorage.getItem("projects").split(",");
    projects.push(project);
    localStorage.setItem("projects", projects);
  }

  static deleteProject(i) {
    let projects = localStorage.getItem("projects").split(",");
    projects.splice(i, 1);
    localStorage.setItem("projects", projects);
  }

  static getProjects() {
    console.log(localStorage.getItem("projects"));
    return localStorage.getItem("projects");
  }
}

export default Storage;
