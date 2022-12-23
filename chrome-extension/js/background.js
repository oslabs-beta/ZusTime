//declare background port
let backgroundPort;

//listens for messages from content script and can then send messages to app.jsx
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (backgroundPort) {
    backgroundPort.postMessage({ body: request.body, snapshot: request.snapshot });
  }
});

chrome.runtime.onConnect.addListener((port) => {
  //declaring background port
  //adding a listener to our port
  //this listens for messages from app.tsx and has the ability to send messages to content script
  backgroundPort = port;

  backgroundPort.onMessage.addListener((message, sender, sendResponse) => {

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      //injects content script into current users tab
      if (message.body === 'runContentScript') {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          files: ['./js/content-script.js'],
        });

      }

      //sends a message to the previously injected script containing the previous state that the user's store should be udpated to
      if (message.body === 'TIMETRAVEL') {
        //send message to content script
        chrome.tabs.sendMessage(tabs[0].id, {
          body: 'TIMETRAVEL',
          previousState: message.previousState
        });
      }
    });
  });
});
