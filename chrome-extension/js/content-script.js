//add a listener for messages from background
chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  //this log is a test from background that makes sure content script is connected and working
  console.log(req.body);
});

// things we can go back to

//content script listening for message from the injected script/window
// window.addEventListener('message', (event) => {
//   chrome.runtime.sendMessage(event.data)
// });
