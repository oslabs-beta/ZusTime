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

    const currentStateObj = []
    if (previousStates.length) {
        const currentState = previousStates[previousStates.length - 1]
        const parsedState = JSON.parse(currentState);
        //iterate over the keys of the current state object and push them to the stateObject array
        Object.keys(parsedState).forEach(el => {
            currentStateObj.push(<div className="indiv-content">{`${JSON.stringify(el)}: ${JSON.stringify(parsedState[el])}`}</div>)
        })
    }

    
    return (
        <div>
            <div className="stateVisualizer">
                <div className="state-container">
                <h2>Most Recent State:</h2>
                <div className="content">{currentStateObj}</div></div>
                <div className="state-container">                
                <h2>Jumped State:</h2>
                <div className="content">{stateObject}</div>
                </div>
               </div>
        </div>
    )
}

export default StateVisualizer;