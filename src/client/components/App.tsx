import * as _ from 'lodash';
import * as React from "react";
import { useEffect } from 'react';

import useStore from '../store/store';


function App() {

  //mainPort will eventually return an object. Change 'any' to object type
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


  const bgColor = useStore((state) => state.bgColor);
  const newColor = useStore((state) => state.newColor)
  const addPreviousState = useStore((state) => state.addPreviousState);
  const previousStates = useStore((state) => state.previousStates);
  const index = useStore((state) => state.index);
  const updateIndex = useStore((state) => state.updateIndex);

  // everytime the background is clicked 
  // add current state to the previousState array
  // generate the previousState array onto the dom
  // change the background color 
  // do we need to compare the deep copy or shallow copy so previous state doesn't get added to the list

  // useEffect(() => {
  //   //adds color to state
  //   addPreviousState(bgColor);
  // }, [bgColor])

  const { r, g, b } = bgColor;
  const rgb = `rgb(${r}, ${g}, ${b})`;


  const generateRandomColor = () => {
    return Math.floor(Math.random() * 255);
  };

  const handleNewColorButton = (e: any) => {
    // e.preventDefault();
    //add current state in array
    //then newColor
    if (!previousStates.includes(bgColor)) {
      addPreviousState(bgColor);
    }

    const newBgColor = {
      r: generateRandomColor(),
      g: generateRandomColor(),
      b: generateRandomColor()
    }
    newColor(newBgColor);

    updateIndex(index + 1);

  }

  document.body.style.backgroundColor = rgb;

  const prev = previousStates.map((el: any) => {
    return <div>{`Colors: r: ${el.r}, g: ${el.g}, b: ${el.b}`}</div>
  })

  const handlePrevious = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    if (!previousStates.includes(bgColor)) {
      addPreviousState(bgColor);
    }
    updateIndex(index - 1);
    const previousState = previousStates[index - 1]
    newColor(previousState)

  }

  const handleNext = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    updateIndex(index + 1);
    const nextState = previousStates[index + 1]
    newColor(nextState)
  }

  console.log(previousStates)
  return (
    <div>
      <h2>hey</h2>
      <h1>My background color is {`(${r}, ${g}, ${b})`}</h1>
      <button onClick={handleNewColorButton}>Click me for a new color!</button>
      <div>{prev}</div>
      <button onClick={handlePrevious}>Previous</button>
      <button onClick={handleNext}>Next</button>
      <button id="connect" onClick={handleClick}>Connect!</button>
    </div>
  )
}

export default App;

//why didn't useEffect work?