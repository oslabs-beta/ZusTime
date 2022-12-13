import * as _ from 'lodash';
import * as React from "react";
import { useEffect } from 'react';
import '../../public/styles.css'

import useStore from '../../store/store';
import Snapshot from './Snapshot';
import StateVisualizer from './StateVisualizer'

import data from './FakeData'


const Debugger = () => {
    const bgColor = useStore((state) => state.bgColor);
    const index = useStore((state) => state.index);
  
    // // everytime the background is clicked 
    //   // add current state to the previousState array
    //   // generate the previousState array onto the dom
    //   // change the background color 
    //   // do we need to compare the deep copy or shallow copy so previous state doesn't get added to the list
  
    // // useEffect(() => {
    // //   //adds color to state
    // //   addPreviousState(bgColor);
    // // }, [bgColor])
      
      const { r, g, b } = bgColor;
      const rgb = `rgb(${r}, ${g}, ${b})`;
  
  
    //   const generateRandomColor = () => {
    //     return Math.floor(Math.random() * 255);
    //   };
  
    //   const handleNewColorButton = (e:any) => {
    //     // e.preventDefault();
    //     //add current state in array
    //     //then newColor
    //     if (!previousStates.includes(bgColor)) {
    //       addPreviousState(bgColor);
    //     }
  
    //     const newBgColor = {
    //       r: generateRandomColor(),
    //       g: generateRandomColor(),
    //       b: generateRandomColor()
    //     }
    //     newColor(newBgColor);
  
    //     updateIndex(index + 1);
  
    //   }
  
    //   document.body.style.backgroundColor = rgb;
  
    //   const prev = previousStates.map((el:any) => {
    //     return <div>{`Colors: r: ${el.r}, g: ${el.g}, b: ${el.b}`}</div>
    //   })
  
    //   const handlePrevious = (e:any) => {
    //     e.preventDefault()
    //     e.stopPropagation()
    //     if (!previousStates.includes(bgColor)) {
    //       addPreviousState(bgColor);
    //     }
    //     updateIndex(index - 1);
    //     const previousState = previousStates[index - 1]
    //     newColor(previousState)
  
    //   }
  
    //   const handleNext = (e:any) => {
    //     e.preventDefault()
    //     e.stopPropagation()
    //     updateIndex(index + 1);
    //     const nextState = previousStates[index + 1]
    //     newColor(nextState)
    //   }
  
    //   console.log(previousStates)
    //   return (
    //     <div>
    //       <h1>My background color is {`(${r}, ${g}, ${b})`}</h1>
    //       <button onClick={handleNewColorButton}>Click me for a new color!</button>
    //       <div>{prev}</div>
    //       <button onClick={handlePrevious}>Previous</button>
    //       <button onClick={handleNext}>Next</button>
    //     </div>
    //   )
    const states = data.map(el => {
        return <Snapshot color={el.bgColor} index={el.index} />
    })

    // document.body.style.backgroundColor = rgb;
    return (
        <div>
            <div className='debugContainer'>
            <div className="snapshotContainer">{states}</div>
            <div className="stateVisualContainer"><StateVisualizer index={index - 1}/></div>
            </div>
        </div>
    )
}

export default Debugger;