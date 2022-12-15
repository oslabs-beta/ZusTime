import React from "react";
import Snapshots from "./FakeData";
import useStore from "../../store/store";
import { ReactDOM } from "react";
import '../../public/styles.css';

const Snapshot = ({color, index, injectScript}: {color: any, index: number, injectScript:any}) => {

    const updateIndex = useStore((state) => state.updateIndex);


    const handleClick = (e:any) => {
        injectScript(color.rgb)
        updateIndex(index)

    }
    
    return (
        <div className="jumpshots">
            <div className="state">{color.rgb}</div>
            <div><button onClick={handleClick}>{`jump to state ${index}`}</button></div>

        </div>
    )
}

export default Snapshot;