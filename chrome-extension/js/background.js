chrome.runtime.onInstalled.addListener(() => {
  console.log('hello Zustand');
});

//declare background port
let backgroundPort;

//listens for messages from content script and can then send messages to app.jsx
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request) {
    if (backgroundPort) {
      backgroundPort.postMessage({ body: request.body })
      console.log('message with food was received in background.js')
    }
  }
});

//listens for messages from app.js (main port) and can then send new messages or commands to content script
chrome.runtime.onConnect.addListener((port) => {
  backgroundPort = port;
  backgroundPort.onMessage.addListener((message) => {
    //listening for inital run content script message from app
    if (message.body === 'runContentScript') {
      console.log('runContentScript in background')
      chrome.tabs.executeScript({file: './content-script.js'})
    };
    if (message.body === "what's for dinner") {
      console.log('dinner in background')
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
          body: "what's for dinner",
        })
      })
    };
    if (message.body === 'updateScript') {
      setTimeout(() => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.tabs.sendMessage(tabs[0].id, {
            body: 'update',
            script: message.script
          });
        });
      }, 50)
    }
  });
});
