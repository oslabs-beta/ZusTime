import React from "react";
import useStore from "../../store/store";

const StateVisualizer = ({index}: {index: number}) => {
    const previousStates = useStore((state) => state.previousStates);

    let allStates = []
    for (let i = 0; i <= index; i++) {
        allStates.push(<div>{`r: ${previousStates[i].bgColor.r}, g: ${previousStates[i].bgColor.g}, b: ${previousStates[i].bgColor.b}`}</div>)
    }
    return (
        <div>
            <h3>State: {allStates}</h3>
        </div>
    )
}

export default StateVisualizer;