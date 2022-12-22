import React from "react";
import Snapshots from "./FakeData";
import useStore from "../../store/store";
import { ReactDOM } from "react";
import '../../public/styles.css';

const Snapshot = ({index, injectScript}: {index: number, injectScript:any}) => {

    const updateIndex = useStore((state) => state.updateIndex);
    const previousStates = useStore((state) => state.previousStates);


    const handleClick = (e:any) => {
        injectScript(previousStates[index])
        updateIndex(index)
    }
    
    return (
        <div className="jumpshots">
            <div className="state">{previousStates[index]}</div>
            <div><button onClick={handleClick}>{`jump to state ${index}`}</button></div>

        </div>
    )
}

export default Snapshot;