let noteTitle = ["hello"];
let noteText = ["hello"];

function render() {
  let note = document.getElementById("content");
  note.innerHTML = "";

  getTrash();

  for (let i = 0; i < trashTitle.length; i++) {
    note.innerHTML += /*html*/ `
    <div id="note-block${i}" class="note-block">
      <div class="note-text">    ${trashTitle[i]} <br> ${trashText[i]} </div>

    <div onclick="deleteCard(${i})" class="note-cancel">
      X
    </div>
 </div>`;
  }
}

function getTrash() {
  let titleAsText = localStorage.getItem("trashTitle");
  let noteAsText = localStorage.getItem("trashNote");
  if (titleAsText && noteAsText) {
    noteTitle = JSON.parse(titleAsText);
    noteText = JSON.parse(noteAsText);
  }
}
