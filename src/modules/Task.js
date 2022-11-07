export default class Task {
  constructor(name, priority = 1, dueDate = "No Date") {
    this.name = name;
    this.priority = priority;
    this.duedate = dueDate;
  }
  getName() {
    return this.name;
  }
  getPriority() {
    return this.priority;
  }
  setName(name) {
    this.name = name;
  }
  getDueDate() {
    return this.duedate;
  }
}
