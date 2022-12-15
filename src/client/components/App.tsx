import * as _ from 'lodash';
import * as React from "react";
import { useEffect } from 'react';

import useStore from '../store/store';
import Debugger from './Debugger/Debugger';


function App() { 
  //mainPort will eventually return an object. Change 'any' to object type
  //declaring our main port 
 let mainPort: any;

 const connect = () => {
   //connects devtool to inspected page
   mainPort = chrome.runtime.connect();
   //listening for messages from background.js
   mainPort.onMessage.addListener((message, sender, sendResponse) => {
     if (message) {
       console.log(message.body)
     }
   })
 }

//this function runs when the dev tool is opened and injects the content script into the current users tab
 const injectContentScript = () => {
  mainPort.postMessage({
    body: 'runContentScript'
  })
 }

 //this function takes the previous state from the store and injects it inot the current users tab, changing the color of the background
 const injectScript = (previousState) => {
   //these messages are being sent to background.js
   mainPort.postMessage({
     body: 'injectScript',
     previousState: previousState
   });
 }

// on mount of the application, run the connection and run function that will send a message to background.js to inject content script
 useEffect(() => {
  connect()
  injectContentScript()
}, [])
 
    return (
      <div>
        <div><Debugger injectScript={injectScript}/></div>
      </div>
    )

}

export default App;
