import * as _ from 'lodash';
import * as React from "react";
import { useEffect } from 'react';
import useStore from '../store/store';
import Debugger from './Debugger/Debugger';
import Tree from './Tree/Tree';




function App() {

  const addPreviousState = useStore((state) => state.addPreviousState);
  const updateTreeComponents = useStore((state) => state.updateTreeComponents);
  const previousStates = useStore((state) => state.previousStates);

  //declaring our main port 
  let mainPort: any;
  let connected = false;

  const connect = () => {
    //connects devtool to inspected page
    if (!connected) {
      mainPort = chrome.runtime.connect();
      connected = true;
      console.log('port connected!');
    } else {
      console.log('port is already connected');
    }

    if (connected) {
      //listening for messages from background.js
      mainPort.onMessage.addListener((message, sender, sendResponse) => {

        //if tree is sent from the injected script
        if (message.body.tree) {
          updateTreeComponents(message.body.tree);
        }

        //if state snapshot is sent from injected script it is then grabbed and added to our store inside the previous states array
        if (message.body === 'stateSnapshot') {
          if (!previousStates.includes(message.snapshot)) {
            addPreviousState(message.snapshot);
            console.log('snapshot object added to array');
          }
        }
      });
    }
  }





  //this function runs when the dev tool is opened and injects the content script into the current users tab
  const injectContentScript = () => {
    mainPort.postMessage({
      body: 'runContentScript'
    })
  }

  //this function takes the previous state from the store and injects it into the current users tab. It is run whenver a jump to previous state button is clicked
  const injectScript = (previousState) => {
    console.log(mainPort)
    //these messages are being sent to background.js
    mainPort.postMessage({
      body: 'TIMETRAVEL',
      previousState: previousState
    });
  }

  // on mount of the application, run the connection and run function that will send a message to background.js to inject content script
  // useEffect(() => {
  //   connect()
  //   injectContentScript()
  // }, [])

  useEffect(() => {
    connect()
  });

  useEffect(() => {
    injectContentScript();
  }, [])



  return (
    <div>
      <div><Debugger injectScript={injectScript} /></div>
      <div><Tree /></div>
    </div>
  )

}

export default App;
