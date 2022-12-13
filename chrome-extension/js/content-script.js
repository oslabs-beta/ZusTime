//content script listening for message from the injected script/window
window.addEventListener('message', (event) => {
  chrome.runtime.sendMessage(event.data)
});


//add a listener for messages from background
chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  if (req.body === "what's for dinner") {
    console.log("whats for dinner in content-script")
    window.postMessage({ 
      body: { 
       food: "mac n cheese"
      }
    })
  }
  //if update message received, this will update the page show to the user to be the previous state they clicked
  if (req.body === 'update') {
    const updatedPage = document.createElement('script');
    const root = document.getElementById('root');
    while (root.children.length) {
      root.children[0].remove();
    }
    // updatedPage.text = `function() {
    //   'use strict';

    //   //this will make a deep copy of the state and all that is inside of it in an object form
    //   //through stringify, the link to the original object is broken, thus creating a deep copy 
    //   const copyOfState = event => JSON.parse(JSON.stringify(event));
    //   let cacheState = [];
    //   const components = [];
    //   const lastIndex = 0;

    //   //this message will send the component state to background and then to app.tsx for use
    //   const sendMessage = (componentStates) => {
    //   window.postMessage({
    //     body: {
    //       componentStates: componentStates,
    //       cacheLength: cacheState.length;
    //     }
    //   })}
      
    // }`
  }
})

// console.log('hello this is coming from content-script.ts');

// document.getElementsByClassName("lnXdpd").addEventListener("click", function() {
//   alert(yay);
//   console.log('hey');
//   chrome.runtime.sendMessage({
//     hey: 'sam'
//   })
// });

// const port = chrome.runtime.connect({name: "knockknock"});
// port.postMessage({joke: "Knock knock"});
// port.onMessage.addListener(function(msg) {
//   if (msg.question === "Who's there?")
//     port.postMessage({answer: "Madame"});
//   else if (msg.question === "Madame who?")
//     port.postMessage({answer: "Madame... Bovary"});
// });