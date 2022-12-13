import React from "react";
import Snapshots from "./FakeData";
import useStore from "../../store/store";
import { ReactDOM } from "react";
import '../../public/styles.css';

const Snapshot = ({color, index}: {color: any, index: number}) => {
    const newColor = useStore((state) => state.newColor);
    const updateIndex = useStore((state) => state.updateIndex);
    const addPreviousState = useStore((state) => state.addPreviousState);


    const jumpState = (e:any): void => {
        e.preventDefault()
        e.stopPropagation()
        const jumpedState = {
            r: color.r,
            g: color.g,
            b: color.b
        }
        newColor(jumpedState);
        updateIndex(index)
    }
    
    return (
        <div className="jumpshots">
            <div className="state">{`r: ${color.r}, g: ${color.g}, b: ${color.b} `}</div>
            <div><button onClick={jumpState}>{`jump to state ${index}`}</button></div>

        </div>
    )
}

export default Snapshot;