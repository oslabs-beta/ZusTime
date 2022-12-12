import * as _ from 'lodash';
import * as React from "react";
import { useEffect } from 'react';

import useStore from '../store/store';
import Debugger from './Debugger/Debugger';

//only problem we have now is saving the current state 
//when time traveling, it saves that previous state to the array when you click new color
  //deep copy vs shallow copy?
function App() {

    return (
      <div>
        <Debugger/>
      </div>
    )
}

export default App;