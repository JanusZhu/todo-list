export default class Task {
  constructor(name, priority = 1, dueDate = 'No Date') {
    this.name = name;
    this.priority = priority;
    this.dueDate = dueDate;
  }

  getName() {
    return this.name;
  }

  getPriority() {
    return this.priority;
  }

  setName(newName) {
    this.name = newName;
  }

  getDueDate() {
    return this.dueDate;
  }

  setDueDate(newDueDate) {
    this.dueDate = newDueDate;
  }
}
