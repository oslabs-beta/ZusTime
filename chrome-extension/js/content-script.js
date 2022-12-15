// content script listening for message from the injected script/window
window.addEventListener('message', (event) => {
  chrome.runtime.sendMessage(event.data);
});

//add a listener for messages from background
chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  //this log is a test from background that makes sure content script is connected and working
  // console.log(req.body);
  // console.log(document.querySelector('#clickMeButton'));
  // if (req.body === 'GETCOLOR') {
  //   alert(document.querySelector('body').style.backgroundColor);
  //   window.postMessage({
  //     body: { color: document.querySelector('body').style.backgroundColor },
  //   });
  // }
});

const clickMeButton = document.querySelector('#clickMeButton');
clickMeButton.addEventListener('click', () => {
  // alert(document.querySelector('body').style.backgroundColor);
  window.postMessage({
    body: { color: document.querySelector('body').style.backgroundColor },
  });
});
