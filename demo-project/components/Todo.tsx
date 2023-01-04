import React from 'react';
import { classNameProp } from '../types';
import Input from './Input';
import List from './List';

const Todo = () => {
    return (
        <div className="todo">
            <Input />
            <List />
        </div>
    );
};

export default Todo;