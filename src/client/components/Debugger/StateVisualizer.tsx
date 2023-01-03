import React from "react";
import useStore from "../../store/store";

const StateVisualizer = () => {
    //import previousStates and index from Zustand store
    const previousStates = useStore((state) => state.previousStates);
    const index = useStore((state) => state.index);

    //declare a stateObject array that will hold all the elements of the curent state object
    const stateObject = [];
    if (previousStates.length) {
        const currentState = previousStates[index]
        const parsedState = JSON.parse(currentState);
        //iterate over the keys of the current state object and push them to the stateObject array
        Object.keys(parsedState).forEach(el => {
            stateObject.push(<div className="indiv-content">{`${JSON.stringify(el)}: ${JSON.stringify(parsedState[el])}`}</div>)
        })
    }
    
    return (
        <div>
            <div className="stateVisualizer">
                <h2>Current State:</h2>
                <div className="content">{stateObject}</div>
               </div>
        </div>
    )
}

export default StateVisualizer;