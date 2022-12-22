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
    
    console.log('previous states in debugger.tsx', previousStates);

    const states = [];
    for (let i = 0; i < previousStates.length; i += 2) {
        states.push(<Snapshot index={i} injectScript={injectScript} />)
    }

    // const states = previousStates.map((el, index) => {
    //     return <Snapshot index={index} injectScript={injectScript} />
    // })

    return (
        <div>
            <div className='debugContainer'>
            <div className="snapshotContainer">{states}</div>
            <div className="stateVisualContainer"><StateVisualizer index={index - 1}/></div>
            </div>
        </div>
    )
}

export default Debugger;