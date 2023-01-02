import React from 'react';
import Input from './Input.jsx';
import List from './List.jsx';

const Todo = () => {

    return (
        <div className="todo">
            <Input />
            <List className="list"/>
        </div>
    );
};

export default Todo;