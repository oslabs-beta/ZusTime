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
            stateObject.push(<li>{`${JSON.stringify(el)}: ${JSON.stringify(parsedState[el])}`}</li>)
        })
    }
    
    return (
        <div>
            <ul className="stateVisualizer">Current State: {stateObject}</ul>
        </div>
    )
}

export default StateVisualizer;