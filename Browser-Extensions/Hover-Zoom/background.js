chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.enabled !== undefined && message.tabId !== undefined) {
    if (message.enabled) {
      chrome.scripting.executeScript({
        target: { tabId: message.tabId },
        files: ['content.js']
      });
    } else {
      chrome.scripting.executeScript({
        target: { tabId: message.tabId },
        func: () => {
          // Disable content script functionality
          if (window.contentScriptEnabled) {
            window.contentScriptEnabled = false;
	    window.location.reload();
          }
        }
      });
    }
  }
});
