let noteTitle = [
  "Hallo",
  "Hanbit",
  "afdddddddddddddddddddddddddddddddddddddafddddddddddddddddddddddddddddddddddddd",
  "afdddddddddddddddddddddddddddddddddddddafddddddddddddddddddddddddddddddddddddd",
  "afddddddddddddddddddddddddddddddddddddd",
  "afddddddddddddddddddddddddddddddddddddd",
  "afddddddddddddddddddddddddddddddddddddd",
];
let noteText = [
  "nice to meet you!",
  "Hanbit",
  "afdddddddddddddddddddddddddddddddddddddafdddddddddddddddddddddddddddddddddddddafdddddddddddddddddddddddddddddddddddddafdddddddddddddddddddddddddddddddddddddafdddddddddddddddddddddddddddddddddddddafdddddddddddddddddddddddddddddddddddddafdddddddddddddddddddddddddddddddddddddafdddddddddddddddddddddddddddddddddddddafdddddddddddddddddddddddddddddddddddddafdddddddddddddddddddddddddddddddddddddafdddddddddddddddddddddddddddddddddddddafdddddddddddddddddddddddddddddddddddddafdddddddddddddddddddddddddddddddddddddafdddddddddddddddddddddddddddddddddddddafddddddddddddddddddddddddddddddddddddd",
  "afdddddddddddddddddddddddddddddddddddddafddddddddddddddddddddddddddddddddddddd",
  "afdddddddddddddddddddddddddddddddddddddafddddddddddddddddddddddddddddddddddddd",
  "afdddddddddddddddddddddddddddddddddddddafddddddddddddddddddddddddddddddddddddd",
  "afdddddddddddddddddddddddddddddddddddddafddddddddddddddddddddddddddddddddddddd",
];

let menuBar = false;

function render() {
  let note = document.getElementById("content");
  note.innerHTML = "";

  for (let i = 0; i < noteTitle.length; i++) {
    note.innerHTML += /*html*/ `
    <div id="note-block${i}" class="note-block">
      <div class="note-text">    ${noteTitle[i]} <br> ${noteText[i]} </div>

    <div onclick="deleteCard(${i})" class="note-cancel">
      X
    </div>
 </div>`;
  }
}

function addCard() {
  document.getElementById("editCard").classList.remove("d-none");
}

function deleteCard(index) {
  let cardID = document.getElementById(`note-block${index}`);
  cardID.classList.add("d-none");
  noteTitle.splice(index, 1);
  noteText.splice(index, 1);
  render();
}

function closeEditCard() {
  document.getElementById("editCard").classList.add("d-none");
  let newTitle = document.getElementById("editCardInput");
  let newText = document.getElementById("editCardTextArea");
  newTitle.value = "";
  newText.value = "";
}

function saveEditCard() {
  document.getElementById("editCard").classList.add("d-none");

  let newTitle = document.getElementById("editCardInput");
  let newText = document.getElementById("editCardTextArea");

  if (newTitle.value && newText.value) {
    noteTitle.push(newTitle.value);
    noteText.push(newText.value);
    newTitle.value = "";
    newText.value = "";
  } else {
    alert("fiel out the form");
  }

  render();
}
