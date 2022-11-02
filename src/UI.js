function UI() {
  function creatHeader() {
    const header = document.createElement("header");

    const headerImg = document.createElement("img");
    headerImg.src = "https://img.icons8.com/arcade/64/000000/todo-list.png";
    const headerTxt = document.createElement("p");
    headerTxt.textContent = "todoism";
    header.append(headerImg, headerTxt);
    return header;
  }
  function createFooter() {
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

  function createHome() {
    const home = document.createElement("div");
    home.classList.add("home");
    return home;
  }
  const content = document.querySelector("#content");
  content.append(creatHeader(), createHome(), createFooter());
}

export default UI;
