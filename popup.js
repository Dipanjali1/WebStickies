document.addEventListener('DOMContentLoaded', function () {
    const noteInput = document.getElementById('note-input');
    const saveButton = document.getElementById('save-button');
    const notesList = document.getElementById('notes-list');
  
    // Load and display saved notes when the popup is opened
    chrome.storage.local.get({ 'stickyNotes': [] }, function (result) {
      if (!chrome.runtime.lastError) {
        const savedNotes = result.stickyNotes;
        savedNotes.forEach(function (noteText) {
          addStickyNote(noteText);
        });
      }
    });
  
    saveButton.addEventListener('click', function () {
        const noteText = noteInput.value.trim();
        if (noteText !== '') {
          // Your existing code to save the note (e.g., saving to chrome.storage.local)
          chrome.storage.local.get({ 'stickyNotes': [] }, function (result) {
            if (!chrome.runtime.lastError) {
              const savedNotes = result.stickyNotes;
              savedNotes.push(noteText);
      
              // Update the extension's storage with the new note
              chrome.storage.local.set({ 'stickyNotes': savedNotes }, function () {
                if (!chrome.runtime.lastError) {
                  // Update the popup UI to display the saved note
                  addStickyNote(noteText);
                  // Clear the input field
                  noteInput.value = '';
                } else {
                  console.error(chrome.runtime.lastError);
                }
              });
            }
          });
        }
      });
      
  
    function addStickyNote(noteText) {
      const note = document.createElement('div');
      note.className = 'note';
      note.textContent = noteText;
      notesList.appendChild(note);
    }
  });
  