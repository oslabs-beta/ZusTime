import * as _ from 'lodash';
import * as React from "react";
import '../../public/styles.css'

import useStore from '../../store/store';
import Snapshot from './Snapshot';
import StateVisualizer from './StateVisualizer'

const Debugger = ({injectScript}) => {
    // grabbing parts of the store
    const index = useStore((state) => state.index);
    const previousStates = useStore((state) => state.previousStates);

    const treeData = useStore((state) => state.treeComponents);
    console.log('treeData in Debugger', treeData);

    // declare array to hold states to render
    const states = [];
    // loop through previous states to produce a snapshot of every state in snapshots array
    for (let i = 0; i < previousStates.length; i += 2) {
        states.push(<Snapshot index={i} injectScript={injectScript} />)
    }

    return (
        <div>
            <div className='debugContainer'>
            <div className="snapshotContainer">
                <h2>Time Travel Debugger</h2>
                <div>{states}</div></div>
            <div className="stateVisualContainer"><StateVisualizer /></div>
            </div>
        </div>
    )
}

export default Debugger;