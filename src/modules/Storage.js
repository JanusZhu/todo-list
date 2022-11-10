import TodoList from "./TodoList";
import Project from "./Project";
import Task from "./Task";

class Storage {
  static saveTodoList(data) {
    localStorage.setItem("todoList", JSON.stringify(data));
  }

  static getTodoList() {
    const todoList = Object.assign(
      new TodoList(),
      JSON.parse(localStorage.getItem("todoList"))
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

  static addProject(project) {
    const todoList = this.getTodoList();
    todoList.addProject(project);
    this.saveTodoList(todoList);
  }

  static deleteProject(projectName) {
    const todoList = this.getTodoList();
    todoList.deleteProject(projectName);
    this.saveTodoList(todoList);
  }

  static addTask(projectName, task) {
    const todoList = this.getTodoList();
    todoList.getProject(projectName).addTask(task);
    this.saveTodoList(todoList);
  }

  static deleteTask(projectName, taskName) {
    const todoList = this.getTodoList();
    todoList.getProject(projectName).deleteTask(taskName);
    this.saveTodoList(todoList);
  }

  static changeTaskName(projectName, taskName, newTaskName) {
    const todoList = this.getTodoList();
    todoList.getProject(projectName).getTask(taskName).setName(newTaskName);
    this.saveTodoList(todoList);
  }
  static changeTaskDate(projectName, taskName, newTaskDate) {
    const todoList = this.getTodoList();
    todoList.getProject(projectName).getTask(taskName).setDueDate(newTaskDate);
    this.saveTodoList(todoList);
  }
}

export default Storage;
