(()=>{"use strict";class t{constructor(t){this.name=t,this.tasks=[]}getName(){return this.name}setName(t){this.name=t}addTask(t){this.tasks.push(t)}setTasks(t){this.tasks=t}getTask(t){return this.tasks.find((e=>e.getName()===t))}getTasks(){return this.tasks}clearTask(){this.task=[]}contains(t){return this.tasks.some((e=>e.getName()===t))}deleteTask(t){this.tasks=this.tasks.filter((e=>e.getName!==t))}}class e{constructor(){this.projects=[],this.projects.push(new t("Inbox")),this.projects.push(new t("Today")),this.projects.push(new t("This week"))}setProjects(t){this.projects=t}getProjects(){return this.projects}getProject(t){return this.projects.find((e=>e.getName()===t))}contains(t){return this.projects.some((e=>e.getName()===t))}addProject(t){this.projects.find((e=>e.getName()===t.getName()))||this.projects.push(t)}deleteProject(t){const e=this.projects.find((e=>e.getName()===t));this.projects.splice(this.projects.indexOf(e),1)}}class s{constructor(t,e=1,s="No Date"){this.name=t,this.priority=e,this.duedate=s}getName(){return this.name}getPriority(){return this.priority}setName(t){this.name=t}getDueDate(){return this.duedate}}const a=class{static saveTodoList(t){localStorage.setItem("todoList",JSON.stringify(t))}static getTodoList(){const a=Object.assign(new e,JSON.parse(localStorage.getItem("todoList")));return a.setProjects(a.getProjects().map((e=>Object.assign(new t,e)))),a.getProjects().forEach((t=>t.setTasks(t.getTasks().map((t=>Object.assign(new s,t)))))),a}static addProject(t){const e=this.getTodoList();e.addProject(t),this.saveTodoList(e)}static deleteProject(t){const e=this.getTodoList();e.deleteProject(t),this.saveTodoList(e)}static addTask(t,e){const s=this.getTodoList();s.getProject(t).addTask(e),this.saveTodoList(s)}static deleteTask(t,e){const s=this.getTodoList();s.getProject(t).deleteTask(e),this.saveTodoList(s)}};document.addEventListener("DOMContentLoaded",class{static loadHeader(){const t=document.createElement("header"),e=document.createElement("img");e.src="https://img.icons8.com/arcade/64/000000/todo-list.png";const s=document.createElement("p");return s.textContent="Todoism",t.append(e,s),t}static loadFooter(){const t=document.createElement("footer");t.textContent="Copyrights© JanusZhu |";const e=document.createElement("a");return e.href="#",e.textContent="Source Code",t.appendChild(e),document.getElementById("content").after(t),t}static loadHome(){const t=document.createElement("div");return t.classList.add("home"),t.append(this.loadSideBar(),this.loadProjectPreview()),t}static loadSideBar(){const t=document.createElement("div");return t.classList.add("sideBar"),t.append(this.loadProjects(),this.loadAddSection()),t}static loadProjects(){const t=document.createElement("div"),e=a.getTodoList();console.log(e.getProjects().length);for(let s=0;s<e.getProjects().length;s++){const a=e.getProjects()[s].getName();if(console.log(a),"Today"!=a&&"Inbox"!=a&&"This week"!=a){const e=document.createElement("div");e.classList.add("project"),e.addEventListener("click",(()=>{this.loadProjectDetails(a)}));const s=document.createElement("img");s.src="https://img.icons8.com/cotton/64/000000/bulleted-list.png";const n=document.createElement("p");n.textContent=a;const o=document.createElement("img");o.classList.add("delete"),o.src="https://img.icons8.com/sf-ultralight/25/000000/delete-forever.png",o.addEventListener("click",(()=>{this.handleDelete(a)})),e.append(s,n,o),t.append(e)}}return t}static loadAddSection(){const t=document.createElement("div");t.classList.add("add-project");const e=document.createElement("img");e.src="https://img.icons8.com/ios-glyphs/30/000000/plus-math.png";const s=document.createElement("p");return s.textContent="Add A New Project",t.append(e,s),t.addEventListener("click",(()=>{this.loadProjectBtn(t)})),t}static loadProjectDetails(t){const e=document.querySelector(".preview");e.innerHTML=`<div class = "project-title">${t}</div>`,this.loadTasks(t),e.append(this.loadAddTask())}static loadTasks(t){const e=document.createElement("div");e.classList.add("task-section"),document.querySelector(".preview").append(e),a.getTodoList().getProject(t).getTasks().forEach((t=>this.loadTask(t)))}static loadTask(t){document.querySelector(".task-section").innerHTML+=`<div class="task-detail"><img src="https://img.icons8.com/ios/50/000000/task-completed.png"/ class="task-complete"> <div class="task-name">${t.getName()}</div><div class="task-dueDate">${t.getDueDate()}</div><img src="https://img.icons8.com/ios-glyphs/30/000000/multiply.png"/ class="task-delete"></div>`}static loadAddTask(){const t=document.createElement("div");t.classList.add("add-task");const e=document.createElement("img");e.src="https://img.icons8.com/ios-glyphs/30/000000/plus-math.png";const s=document.createElement("p");return s.textContent="Add A New Task",t.append(e,s),t.addEventListener("click",(()=>{this.loadAddTaskBtn(t)})),t}static loadAddTaskBtn(t){t.classList.add("hidden");const e=document.createElement("div");e.classList.add("new-task");const s=document.createElement("input");s.id="task-name",s.type="text",s.placeholder="Name",s.maxLength=8;const a=document.createElement("button");a.classList.add("add"),a.textContent="Add",a.addEventListener("click",(()=>{this.handleAddTask()}));const n=document.createElement("button");n.classList.add("cancel"),n.textContent="Cancel",n.addEventListener("click",(()=>{this.handleCancel()})),e.append(s,a,n),document.querySelector(".preview").appendChild(e)}static handleAddTask(){const t=document.querySelector("#task-name"),e=document.querySelector(".project-title").textContent;""===t.value?alert("Please add a name"):(a.addTask(e,new s(t.value)),this.handleCancelTask(),this.loadContent())}static handleCancelTask(){document.querySelector(".new-task").remove(),document.querySelector(".hidden")&&document.querySelector(".hidden").classList.remove("hidden")}static loadProjectBtn(t){t.classList.add("hidden");const e=document.createElement("div");e.classList.add("new-project");const s=document.createElement("input");s.id="project-name",s.type="text",s.placeholder="Name",s.maxLength=8;const a=document.createElement("button");a.classList.add("add"),a.textContent="Add",a.addEventListener("click",(()=>{this.handleAdd()}));const n=document.createElement("button");n.classList.add("cancel"),n.textContent="Cancel",n.addEventListener("click",(()=>{this.handleCancel()})),e.append(s,a,n),document.querySelector(".sideBar").appendChild(e)}static handleAdd(){const e=document.querySelector("input");""===e.value?alert("Please add a name"):(a.addProject(new t(e.value)),this.handleCancel(),this.loadContent())}static handleDelete(t){console.log(t),a.deleteProject(t),this.loadContent()}static handleCancel(){document.querySelector(".new-project").remove(),document.querySelector(".hidden")&&document.querySelector(".hidden").classList.remove("hidden")}static loadProjectPreview(){const t=document.createElement("div");return t.classList.add("preview"),t}static loadContent(){const t=document.querySelector("#content");t.innerHTML="",t.append(this.loadHeader(),this.loadHome(),this.loadFooter())}}.loadContent())})();