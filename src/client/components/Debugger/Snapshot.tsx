import React from "react";
import useStore from "../../store/store";
import '../../public/styles.css';

const Snapshot = ({index, injectScript}: {index: number, injectScript:any}) => {

    const updateIndex = useStore((state) => state.updateIndex);
    const previousStates = useStore((state) => state.previousStates);


    // handles click for when a snapshot is chosen
    // inject script with the snapshot
    // update index to indicate which snapshot we're on
    const handleClick = (e:any) => {
        injectScript(previousStates[index])
        updateIndex(index)
    }
    
    return (
        <div className="jumpshots">
            <div className="state">{previousStates[index]}</div>
            <div><button onClick={handleClick}>{`Jump to state`}</button></div>

        </div>
    )
}

export default Snapshot;