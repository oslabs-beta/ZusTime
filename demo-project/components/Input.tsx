import React from 'react';
import useStore from '../store';
// import { inputProps } from '../types';

const Input = () => {
    const newTodo = useStore((state) => state.newTodo);
    const setNewTodo = useStore((state) => state.setNewTodo);
    const addTodo = useStore((state) => state.addTodo);

    const add = (e) => {
        e.preventDefault();
        addTodo(e);
    }
    return (
        <div>
            <h1>To-Do List</h1>
            <div>
                <form>
                    <input
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="New Todo"
                    className="inputBar" 
                    />
                    <button onClick={add} className="todoButton">Add Todo</button>
                </form>
            </div>
        </div>
    );
};

export default Input;