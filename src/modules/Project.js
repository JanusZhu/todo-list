export default class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }
  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }

  addTask(task) {
    this.tasks.push(task);
  }

  setTasks(tasks) {
    this.tasks = tasks;
  }

  getTask(taskName) {
    return this.tasks.find((task) => task.getName() === taskName);
  }

  getTasks() {
    return this.tasks;
  }

  clearTask() {
    this.task = [];
  }

  contains(taskName) {
    return this.tasks.some((task) => task.getName() === taskName);
  }

  deleteTask(taskName) {
    this.tasks = this.tasks.filter((task) => task.getName() !== taskName);
  }
}
