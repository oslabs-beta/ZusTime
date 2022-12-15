import * as _ from 'lodash';
import * as React from "react";
import { useEffect } from 'react';
import '../../public/styles.css'

import useStore from '../../store/store';
import Snapshot from './Snapshot';
import StateVisualizer from './StateVisualizer'

import data from './FakeData'


const Debugger = ({injectScript}) => {
    // grabbing parts of the store
    const index = useStore((state) => state.index);
     const previousStates = useStore((state) => state.previousStates);
    
  
    const states = previousStates.map((el, index) => {
        return <Snapshot color={el.bgColor} index={index} injectScript={injectScript} />
    })

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