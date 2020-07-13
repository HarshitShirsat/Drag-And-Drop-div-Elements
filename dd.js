function addDragListeners() {
  const draggableItems = document.querySelectorAll(".list-item");
  // kinda redundant use only for small list of items
  [].forEach.call(draggableItems, (item) => {
    // for the source of data

    if (!item.dataset.el) {
      item.dataset.el = "listening";
      item.addEventListener("dragstart", dragstarthandle, false);

      // for destination
      item.addEventListener("dragenter", dragenterhandle, false);
      item.addEventListener("dragover", dragoverhandle, false);
      item.addEventListener("dragleave", dragleavehandle, false);

      // when source is dropped
      item.addEventListener("dragend", dragendhandle, false);

      // when destination receives the data
      item.addEventListener("drop", drophandle, false);
    }
  });
}

addDragListeners();

let dragElSrc = null;

function dragstarthandle() {
  this.classList.add("fade");

  // set the variable to currently moving element
  dragElSrc = this;

  // give the permission to transfer data on moving the element
  event.dataTransfer.effectAllowed = "move";
  // what data has to be moved
  event.dataTransfer.setData("text/html", this.innerHTML);
}

function dragenterhandle() {
  this.classList.add("highlight");
}

function dragoverhandle(event) {
  event.preventDefault();
  this.classList.add("highlight");
  event.dataTransfer.dropEffect = "move";
}

function dragleavehandle() {
  this.classList.remove("highlight");
}

function dragendhandle() {
  this.classList.remove("fade");
}

function drophandle(event) {
  event.stopPropagation();
  // because by default browser redirects on the case of drop event

  if (this !== dragElSrc) {
    dragElSrc.innerHTML = this.innerHTML;
    this.innerHTML = event.dataTransfer.getData("text/html");
    this.classList.remove("highlight");
  }
  return false;
}

const questionForm = document.getElementById("question-form");

questionForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // get the container for questions
  const listContainer = document.getElementById("question-holder");

  // get the value of input
  const question = document.getElementById("question");

  // create new element to be appended to question container
  let newQuestion = document.createElement("div");
  newQuestion.className = "list-item card"; // classes used
  newQuestion.textContent = `${question.value}`; // text
  newQuestion.setAttribute("draggable", true); // to make it draggable
  newQuestion.setAttribute("dropzone", true); // so that other questions can be dropped on it

  listContainer.appendChild(newQuestion);
  // finally add the new question to the container

  addDragListeners();
  // to make sure that new element is also given a drag event listener

  question.value = "";
});
