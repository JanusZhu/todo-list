import Project from "./Project";
export default class TodoList {
  constructor() {
    this.projects = [];
    this.projects.push(new Project("Inbox"));
    this.projects.push(new Project("Today"));
    this.projects.push(new Project("This week"));
  }
  setProjects(projects) {
    this.projects = projects;
  }

  getProjects() {
    return this.projects;
  }

  getProject(projectName) {
    return this.projects.filter((project) => project.getName() === projectName);
  }

  contains(projectName) {
    return this.projects.some((project) => project.getName() === projectName);
  }

  addProject(newProject) {
    if (
      this.projects.find(
        (project) => project.getName() === newProject.getName()
      )
    )
      return;
    this.projects.push(newProject);
  }

  deleteProject(projectName) {
    const deletedProject = this.projects.find(
      (project) => project.getName() === projectName
    );
    this.projects.splice(projects.indexOf(deletedProject), 1);
  }
}
