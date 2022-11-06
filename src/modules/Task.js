export default class Task {
  constructor(name, priority = 1) {
    this.name = name;
    this.priority = priority;
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
}
