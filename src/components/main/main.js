let noteTitle = ["Hallo", "Hanbit"];
let noteText = ["nice to meet you!", "Hanbit"];

function render() {
  let note = document.getElementById("content");
  note.innerHTML = "";

  for (let i = 0; i < noteTitle.length; i++) {
    note.innerHTML += /*html*/ `<div class="note-block">${noteTitle[i]} <br> ${noteText[i]} <br>
  <img class="note-img" src="/src/assets/icons/menu-dot.svg"></div>`;
  }
}

function addCard() {
  document.getElementById("editCard").classList.remove("d-none");
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
