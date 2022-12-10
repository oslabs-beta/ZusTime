import * as _ from 'lodash';
import * as React from "react";

import useStore from '../store/store';

//mainPort will eventually return an object. Change 'any' to object type
let mainPort: any;

const connect = () => {
  mainPort = chrome.runtime.connect();
  mainPort.onMessage.addListener((message:any, sender:any, sendResponse:any) => {
    //getting snapshots, real logic stuff. Not right now! We babies.
    console.log(message);
  })
}

const injectAndUpdateScript = () => {
  mainPort.postMessage({
    body: 'runContentScript'
  });
  //can add another message here to update the content script with the bundleResource
}

//these two functions above with be invoked either on mount or with a handle click function that 


function App() {
  const bgColor = useStore((state) => state.bgColor);
  const newColor = useStore((state) => state.newColor)
  const addPreviousState = useStore((state) => state.addPreviousState);
  const previousStates = useStore((state) => state.previousStates);

  // everytime the background is clicked 
    // add current state to the previousState array
    // generate the previousState array onto the dom
    // change the background color 
    
    const { r, g, b } = bgColor;
    const rgb = `rgb(${r}, ${g}, ${b})`;


    const generateRandomColor = () => {
      return Math.floor(Math.random() * 255);
    };

    const handleButton = (e:any) => {
      // e.preventDefault();
      //add current state in array
      console.log(bgColor)
      addPreviousState(bgColor);
      //then newColor
      newColor(generateRandomColor(), generateRandomColor(), generateRandomColor());
    }

    document.body.style.backgroundColor = rgb;

    const prev = previousStates.map((el:any) => {
      return <div>{`Previous Colors: r: ${el.r}, g: ${el.g}, b: ${el.b}`}</div>
    })

    return (
      <div>
        <h1>My background color is {`(${r}, ${g}, ${b})`}</h1>
        <button onClick={handleButton}>Click me for a new color!</button>
        <div>{prev}</div>
        <button>Previous</button>
        <button>Next</button>
      </div>
    )
}

export default App;