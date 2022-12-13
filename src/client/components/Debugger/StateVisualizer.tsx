import React from "react";
import useStore from "../../store/store";

const StateVisualizer = ({index}: {index: number}) => {
    const previousStates = useStore((state) => state.previousStates);

    let allStates = []
    for (let i = 0; i <= index; i++) {
        allStates.push(<div>{`rgb: (${previousStates[i].bgColor.r},${previousStates[i].bgColor.g},${previousStates[i].bgColor.b})`}</div>)
    }
    return (
        <div>
            <h3 className="stateVisualizer">Previous States: {allStates}</h3>
        </div>
    )
}

export default StateVisualizer;