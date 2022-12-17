import * as _ from 'lodash';
import * as React from 'react';
import './styles.css';
import useStore from './store';
import Sibling1 from './Sibling1.jsx';
import Sibling2 from './Sibling2.jsx';

const App = () => {
  const bgColor = useStore((state) => state.bgColor);
  const index = useStore((state) => state.index);
  const newColor = useStore((state) => state.newColor);
  const { r, g, b } = bgColor;
  const rgb = `rgb(${r}, ${g}, ${b})`;

  const handleClickMe = (e) => {
    e.preventDefault();
    e.stopPropagation();
    newColor();
  };

  document.body.style.backgroundColor = rgb;

  return (
    <div className="newColor">
      <div>bored?</div>
      <button id="clickMeButton" onClick={handleClickMe}>
        click me
      </button>
      <Sibling1 color={rgb} newcolor={newColor}></Sibling1>
      <Sibling2 color={rgb} index={index}></Sibling2>
    </div>
  );
};

export default App;
