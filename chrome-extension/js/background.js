chrome.runtime.onInstalled.addListener(() => {
  console.log('hello Zustand');
});

//declare background port
let backgroundPort;

// functions to assist with messaging api

// grabs the body from the dom and updates the color based on what is based in
function change(color) {
  document.querySelector('body').style.backgroundColor = color;
}

//listens for messages from content script and can then send messages to app.jsx
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request) {
    if (backgroundPort) {
      backgroundPort.postMessage({ body: request.body });
    }
  }
});

chrome.runtime.onConnect.addListener((port) => {
  //declaring background port
  //adding a listener to our port
  //this listens for messages from app.tsx and has the ability to send messages to content script
  let backgroundPort = port;

  backgroundPort.onMessage.addListener((message, sender, sendResponse) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      //injects content script into current users tab
      if (message.body === 'runContentScript') {
        console.log('runContentScript in background');
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id, allFrames: true },
          file: ['./content-script.js'],
        });
      }

      //injects a script of the previous state that currently updates the backgrounds color
      if (message.body === 'injectScript') {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id, allFrames: true },
          func: change,
          args: [message.previousState],
        });
      }

      //just a test that will show in the console if content script is connected and working
      chrome.tabs.sendMessage(tabs[0].id, {
        body: 'Communication line from BG to CS working!',
      });
    });
  });
});
