chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'addStickyNote') {
      const { noteText } = request;
      chrome.storage.local.get({ 'stickyNotes': [] }, function (result) {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
          return;
        }
  
        const storedNotes = result.stickyNotes;
        storedNotes.push(noteText);
        chrome.storage.local.set({ 'stickyNotes': storedNotes }, function () {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
            return;
          }
          sendResponse({ status: 'Note added successfully' });
        });
      });
    }
  });
  