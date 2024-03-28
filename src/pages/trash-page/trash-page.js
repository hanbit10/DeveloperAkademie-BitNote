async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html"); // "includes/header.html"
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = "Page not found";
    }
  }
}

function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}

let noteTitle = [];
let noteText = [];

let trashTitle = [];
let trashText = [];

function render() {
  let note = document.getElementById("content");
  note.innerHTML = "";

  getTrash();

  for (let i = 0; i < trashTitle.length; i++) {
    note.innerHTML += /*html*/ `
      <div id="note-block${i}" class="note-block">
        <div class="note-text"> <h3>${trashTitle[i]}</h3> <br> ${trashText[i]} </div>

      <div onclick="deleteTrash(${i})" class="note-cancel">X</div>
      <div onclick="restoreCard(${i})" class="note-restore">0</div>
   </div>`;
  }
}

function getTrash() {
  let titleAsText = localStorage.getItem("trashNoteTitle");
  let noteAsText = localStorage.getItem("trashNoteText");
  if (titleAsText && noteAsText) {
    trashTitle = JSON.parse(titleAsText);
    trashText = JSON.parse(noteAsText);
  }
}

function deleteTrash(index) {
  let cardID = document.getElementById(`note-block${index}`);
  cardID.classList.add("d-none");
  trashTitle.splice(index, 1);
  trashText.splice(index, 1);

  saveTrash();
  render();
}

function saveTrash() {
  localStorage.setItem("trashNoteTitle", JSON.stringify(trashTitle));
  localStorage.setItem("trashNoteText", JSON.stringify(trashText));
}

function saveCard() {
  localStorage.setItem("title", JSON.stringify(noteTitle));
  localStorage.setItem("note", JSON.stringify(noteText));
}

function getCard() {
  let titleAsText = localStorage.getItem("title");
  let noteAsText = localStorage.getItem("note");
  if (titleAsText && noteAsText) {
    noteTitle = JSON.parse(titleAsText);
    noteText = JSON.parse(noteAsText);
  }
}

function restoreCard(index) {
  getCard();
  noteTitle.push(trashTitle[index]);
  noteText.push(trashText[index]);
  deleteTrash(index);
  saveCard();
}
