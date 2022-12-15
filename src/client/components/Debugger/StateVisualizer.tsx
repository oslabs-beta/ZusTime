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
            <div className="stateVisualizer">Previous States: {allStates}</div>
        </div>
    )
}

export default StateVisualizer;