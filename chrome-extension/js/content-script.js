// content script listening for message from the injected script/window and sends message to background
window.addEventListener('message', (event) => {
  chrome.runtime.sendMessage(event.data);
});

//add a listener for messages from background.. can send message to injected script
chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  //this log is a test from background that makes sure content script is connected and working
  if (req.body === 'TIMETRAVEL') {
    window.postMessage({body: 'TIMETRAVEL', previousState: req.previousState});
  }
});


function injectScript(file, node) {
  const body0 = document.getElementsByTagName(node)[0];
  const s0 = document.createElement('script'); 
  s0.setAttribute('type', 'text/javascript');
  //built in chrome method to get the path of the file to be injected to the user's app
  s0.setAttribute('src', chrome.runtime.getURL(file));
  body0.appendChild(s0);
}

injectScript('./js/injected-script.js', 'body');


