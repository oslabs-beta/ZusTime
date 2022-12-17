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

// const clickMeButton = document.querySelector('#clickMeButton');
// clickMeButton.addEventListener('click', () => {
//   // alert(document.querySelector('body').style.backgroundColor);
//   window.postMessage({
//     body: { color: document.querySelector('body').style.backgroundColor },
//   });
// });

// reactMonitor's code
function injectScript(file, node) {
  // test - inject javascript, access fibergraph
  const body0 = document.getElementsByTagName(node)[0];
  const s0 = document.createElement('script'); //<script type= 'text/javascript' src= 'packag'> consol.log("script injected")</script>
  s0.setAttribute('type', 'text/javascript');
  //built in chrome method to get the path of the file to be injected to the user's app
  s0.setAttribute('src', chrome.runtime.getURL(file));
  // console.log(chrome.extension.getURL(file[0]), "injectedfile");
  body0.appendChild(s0);
}
/*
... this will inject the following HTML tags into index.html:
<script type='text/javascript' src="/containerWrapper.js">
<script type='text/javascript' src="/fiberTreeAnalyzer.js">
*/

setTimeout(() => {
  injectScript('./js/injected-script.js', 'body');
}, 1000);
