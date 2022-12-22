import * as _ from 'lodash';
import * as React from 'react';
import './styles.css';

import Sibling1 from './Sibling1.jsx';
import Sibling2 from './Sibling2.jsx';

const App = () => {

  return (
    <div className="newColor">
      <div>bored?</div>
      <button id="clickMeButton">
        click me
      </button>
      <Sibling1 ></Sibling1>
      <Sibling2 ></Sibling2>
    </div>
  );
};

export default App;
