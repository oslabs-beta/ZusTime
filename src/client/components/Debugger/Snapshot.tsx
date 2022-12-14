import React from "react";
import useStore from "../../store/store";
import '../../public/styles.css';
import { snapshotProp } from "../../../types";

const Snapshot = ({index, injectScript, num}: snapshotProp) => {
    const updateIndex = useStore((state) => state.updateIndex);
    const previousStates = useStore((state) => state.previousStates);


    // handles click for when a snapshot is chosen
    // inject script with the snapshot
    // update index to indicate which snapshot we're on
    const handleClick = (e: React.MouseEvent) => {
        injectScript(previousStates[index]);
        updateIndex(index);
    }
    
    return (
        <div className="jumpshots">
            <div>{num}</div>
            <div className="state">{previousStates[index]}</div>
            <button onClick={handleClick}>{`Jump to state`}</button>

        </div>
    )
}

export default Snapshot;