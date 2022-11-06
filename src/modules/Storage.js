import TodoList from "./TodoList";
import Project from "./Project";
import Task from "./Task";

class Storage {
  static saveTodoLIst(data) {
    localStorage.setItem("projects", data);
  }

  static getProjects() {
    const todoList = Object.assign(
      new TodoList(),
      JSON.parse(localStorage.getItem("projects"))
    );
    todoList.setProjects(
      todoList
        .getProjects()
        .map((project) => Object.assign(new Project(), project))
    );

    todoList
      .getProjects()
      .forEach((project) =>
        project.setTasks(
          project.getTasks().map((task) => Object.assign(new Task(), task))
        )
      );

    return todoList;
  }

  static addProject(projectName) {
    const todoList = this.getProjects();
    todoList.addProject(projectName);
    this.saveTodoLIst(todoList);
  }

  static deleteProject(projectName) {
    const todoList = this.getProjects();
    todoList.deleteProject(projectName);
    this.saveTodoLIst(todoList);
  }

  static addTask(projectName, taskName) {
    const todoList = this.getProjects();
    todoList.getProject(projectName).addTask(taskName);
    this.saveTodoLIst(todoList);
  }

  static deleteTask(projectName, taskName) {
    const todoList = this.getProjects();
    todoList.getProject(projectName).deleteTask(taskName);
    this.saveTodoLIst(todoList);
  }
}

export default Storage;
