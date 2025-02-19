document.addEventListener('DOMContentLoaded', function () {
  const toggleButton = document.getElementById('toggleButton');

  // Set default state to disabled if not already set
  chrome.storage.local.get(['enabled'], function (result) {
    if (result.enabled === undefined) {
      chrome.storage.local.set({ enabled: false });
      toggleButton.textContent = 'Enable Content Script';
    } else {
      toggleButton.textContent = result.enabled ? 'Disable Content Script' : 'Enable Content Script';
    }
  });

  toggleButton.addEventListener('click', function () {
    chrome.storage.local.get(['enabled'], function (result) {
      const newState = !result.enabled;
      chrome.storage.local.set({ enabled: newState }, function () {
        toggleButton.textContent = newState ? 'Disable Content Script' : 'Enable Content Script';
        
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          const activeTab = tabs[0];
          chrome.runtime.sendMessage({ enabled: newState, tabId: activeTab.id });
        });
      });
    });
  });
});
