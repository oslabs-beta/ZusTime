import * as _ from 'lodash';
import * as React from "react";
import { useEffect, useState } from 'react';
import useStore from '../store/store';
import Debugger from './Debugger/Debugger';
import '../public/styles.css'
import Tree from './Tree/Tree';


function App() {
  const addPreviousState = useStore((state) => state.addPreviousState);
  const updateTreeComponents = useStore((state) => state.updateTreeComponents);

  //declaring our main port 
  let mainPort: any;
  let connected: boolean = false;

  const connect = (): void => {
    //connects devtool to inspected page
    if (!connected) {
      mainPort = chrome.runtime.connect();
      connected = true;
    }

    if (connected) {
      //listening for messages from background.js
      mainPort.onMessage.addListener((message, sender, sendResponse) => {

        //if tree is sent from the injected script
        if (message.body === "hierarchy") {
          updateTreeComponents(JSON.parse(message.hierarchy));
        }

        //if state snapshot is sent from injected script it is then grabbed and added to our store inside the previous states array
        if (message.body === 'stateSnapshot') {
          addPreviousState(message.snapshot);
        }
      });
    }
  }

  //this function runs when the dev tool is opened and injects the content script into the current users tab
  const injectContentScript = (): void => {
    mainPort.postMessage({
      body: 'runContentScript'
    })
  }

  //this function takes the previous state from the store and injects it into the current users tab. It is run whenver a jump to previous state button is clicked
  const injectScript = (previousState: string): void => {
    //these messages are being sent to background.js
    mainPort.postMessage({
      body: 'TIMETRAVEL',
      previousState: previousState
    });
  }

  // on mount of the application, run the connection and run function that will send a message to background.js to inject content script
  useEffect((): void => {
    connect();
    //disconnects port when user leaves the dev
    window.addEventListener('beforeunload', () => {
      mainPort.disconnect();
    });
  });

  useEffect((): void => {
    injectContentScript();
  }, [])

  // set two local states to either show time travel/hide component tree or show component tree/hide time travel
  const [showTree, setShowTree] = useState(false);
  const [showTravel, setShowTravel] = useState(true);
  // const componentTree = document.querySelectorAll('svg')

  // on click, hide component tree
  const timeTravelClick = (e: React.MouseEvent): void => {
    e.preventDefault()
    if (!showTravel) {
      setShowTravel(true)
      setShowTree(false);
      document.querySelector('svg').style.display = "none"
    }
  }
  // on click hide time travel 
  const componentTreeClick = (e: React.MouseEvent): void => {
    e.preventDefault()
    if (!showTree) {
      setShowTree(true);
      setShowTravel(false);
      document.querySelector('svg').style.display = "block"

    }
  }

  const [component, setComponent] = useState(true);


  return (
    <div>
      <nav className="navBarContainer">
        <button onClick={timeTravelClick}>Time Travel</button>
        <button onClick={componentTreeClick}>Component Tree</button>
      </nav>
      {showTravel && (<div id="debugger"><Debugger injectScript={injectScript} /></div>)}
      {showTree && <div id="tree" ><Tree setComponent={setComponent} component={component} /></div>}
    </div>
  )
}



export default App;
