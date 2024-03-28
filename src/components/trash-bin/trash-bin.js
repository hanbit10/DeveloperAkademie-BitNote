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
        <div class="note-text"> ${trashTitle[i]} <br> ${trashText[i]} </div>

      <div onclick="deleteTrash(${i})" class="note-cancel"> X </div>
      <div onclick="restoreCard(${i})">O</div>
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
  localStorage.setItem("trashNoteText", JSON.stringify(trashTitle));
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
