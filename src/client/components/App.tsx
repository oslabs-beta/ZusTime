import * as _ from 'lodash';
import * as React from "react";
import { useEffect } from 'react';

import useStore from '../store/store';
import Debugger from './Debugger/Debugger';


function App() {  //mainPort will eventually return an object. Change 'any' to object type
  //declaring our main port 
 let mainPort: any;

 const connect = () => {
   //connects devtool to inspected page
   mainPort = chrome.runtime.connect();
   //listening for messages from background.js
   mainPort.onMessage.addListener((message, sender, sendResponse) => {
     //getting snapshots, real logic stuff. Not right now! We babies.
     console.log('message sent back from bg to app')
     console.log(message);
     if (message.body.food) {
       console.log(message.body.food)
       alert(message.body.food)
     }
   })
 }

 const injectAndUpdateScript = () => {
   //these messages are being sent to background.js
   mainPort.postMessage({
     body: 'runContentScript'
   });
   mainPort.postMessage({
     body: "what's for dinner"
   });


   chrome.devtools.inspectedWindow.getResources((resources) => {
     for (let i = 0; i < resources.length; i++) {
       // if (resources[i].type === 'script') {
       if (resources[i].url.endsWith('bundle.js')) {
         resources[i].getContent((content, encoding) => {
           mainPort.postMessage({
             body: 'updateScript',
             script: content
           });
         });
         break;
       };
     };
   });

 }



 //handle click to handle the CONNECT BUTTON click and invoke the two functions above
 const handleClick = () => {
   alert('connect button clicked');
   connect();
   injectAndUpdateScript();
 }
 
    return (
      <div>
        <div><Debugger/></div>
        <div><button id="connect" onClick={handleClick}>Connect!</button></div>
      </div>
    )

}

export default App;

//why didn't useEffect work?