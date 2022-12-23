import React from 'react';
import Grandchild1 from './Grandchild1.jsx'
import useStore from './store.ts';

const Sibling1 = () => {

const counter = useStore((state) => state.counter);
const incrementCounter = useStore((state => state.incrementCounter));

  return (
    <div>
      <Grandchild1/>
      <h5>Counter: {counter}</h5>
      <button onClick={incrementCounter}>Increment Counter</button>
    </div>
  );
};

export default Sibling1;
