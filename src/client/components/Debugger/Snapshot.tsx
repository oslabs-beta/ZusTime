import React from "react";
import Snapshots from "./FakeData";
import useStore from "../../store/store";
import { ReactDOM } from "react";
import '../../public/styles.css';

const Snapshot = ({color, index, injectScript}: {color: any, index: number, injectScript:any}) => {
    const newColor = useStore((state) => state.newColor);
    const updateIndex = useStore((state) => state.updateIndex);
    const addPreviousState = useStore((state) => state.addPreviousState);


    const handleClick = (e:any):void => {

        const rgb = `rgb(${color.r}, ${color.g}, ${color.b})`

        injectScript(rgb)
        updateIndex(index)

    }
    
    return (
        <div className="jumpshots">
            <div className="state">{`r: ${color.r}, g: ${color.g}, b: ${color.b} `}</div>
            <div><button onClick={handleClick}>{`jump to state ${index}`}</button></div>

        </div>
    )
}

export default Snapshot;