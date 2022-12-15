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
    const bgColor = useStore((state) => state.bgColor);
    const index = useStore((state) => state.index);
      
      const { r, g, b } = bgColor;
      const rgb = `rgb(${r}, ${g}, ${b})`;
  
    const states = data.map(el => {
        return <Snapshot color={el.bgColor} index={el.index} injectScript={injectScript} />
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