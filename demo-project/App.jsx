import * as _ from 'lodash';
import * as React from 'react';
import './styles.css';
import useStore from './store';

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
      <button onClick={handleClickMe}>click me</button>
    </div>
  );
};

export default App;
