import React from 'react';
import useStore from '../store';

const Counter = () => {
    const counter = useStore((state) => state.counter);
    const incrementCounter = useStore((state => state.incrementCounter));
    const decrementCounter = useStore((state => state.decrementCounter));

    return (
        <div className="counter">
            <h1 className="counterHeader">Counter: {counter}</h1>
            <button onClick={incrementCounter} className="addCount">Increment Counter</button>
            <button onClick={decrementCounter} className="subCount">Decrement Counter</button>
        </div>
    );
};

export default Counter;