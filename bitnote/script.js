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

let noteTitle = [];
let noteText = [];

let trashTitle = [];
let trashText = [];

function render() {
  let note = document.getElementById("content");
  note.innerHTML = "";

  getCard();
  getTrash();
  for (let i = 0; i < noteTitle.length; i++) {
    note.innerHTML += createNote(i);
  }
}

function createNote(i) {
  return /*html*/ `
  <div id="note-block${i}" class="note-block">
    <div  class="note-cancel"> 
      <img  class="trash-img" onclick="deleteCard(${i})" src="/bitnote/assets/icons/icons8-trash2.svg" alt="">
    </div>
    <div class="note-text"  onclick="editCard(${i})"> 
      <h3>${noteTitle[i]}</h3><pre>${noteText[i]} </pre>
    </div>
  </div>

    `;
}

function editCard(i) {
  document.getElementById("editCard").classList.remove("d-none");
  let editTitle = document.getElementById("editCardInput");
  let editText = document.getElementById("editCardTextArea");
  editTitle.value = noteTitle[i];
  editText.value = noteText[i];

  let saveButton = document.getElementById("saveEditCard");
  saveButton.innerHTML = /*html*/ `
  <button class="save-btn" onclick="saveEditCard(${i})" > SAVE</button>
  `;
}

function addCard() {
  document.getElementById("createCard").classList.remove("d-none");
}

function closeCreateCard() {
  document.getElementById("createCard").classList.add("d-none");
  let newTitle = document.getElementById("createCardInput");
  let newText = document.getElementById("createCardTextArea");
  newTitle.value = "";
  newText.value = "";
}

function closeEditCard() {
  document.getElementById("editCard").classList.add("d-none");
}

function deleteCard(index) {
  let cardID = document.getElementById(`note-block${index}`);
  cardID.classList.add("d-none");
  trashTitle.push(noteTitle[index]);
  trashText.push(noteText[index]);
  noteTitle.splice(index, 1);
  noteText.splice(index, 1);

  saveTrash();
  saveCard();
  render();
}

function saveCreateCard() {
  document.getElementById("createCard").classList.add("d-none");

  let newTitle = document.getElementById("createCardInput");
  let newText = document.getElementById("createCardTextArea");

  if (newTitle.value && newText.value) {
    noteTitle.push(newTitle.value);
    noteText.push(newText.value);
    newTitle.value = "";
    newText.value = "";
  } else {
    alert("fiel out the form");
  }

  saveCard();
  render();
}

function saveEditCard(i) {
  document.getElementById("editCard").classList.add("d-none");

  let newTitle = document.getElementById("editCardInput");
  let newText = document.getElementById("editCardTextArea");

  if (newTitle.value && newText.value) {
    noteTitle[i] = newTitle.value;
    noteText[i] = newText.value;
    newTitle.value = "";
    newText.value = "";
  } else {
    alert("fiel out the form");
  }

  saveCard();
  render();
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

function saveTrash() {
  localStorage.setItem("trashNoteTitle", JSON.stringify(trashTitle));
  localStorage.setItem("trashNoteText", JSON.stringify(trashText));
}

function getTrash() {
  let titleAsText = localStorage.getItem("trashNoteTitle");
  let noteAsText = localStorage.getItem("trashNoteText");
  if (titleAsText && noteAsText) {
    trashTitle = JSON.parse(titleAsText);
    trashText = JSON.parse(noteAsText);
  }
}

function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
}
