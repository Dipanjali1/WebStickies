
function addStickyNote(noteText) {
  const note = document.createElement('div');
  note.className = 'note';
  note.textContent = noteText;
  document.body.appendChild(note);
}
