import React from 'react';
import useStore from '../store';

const List = () => {
    const todos = useStore((state) => state.todos);

    return(
        <div className='list'>
            {todos.map((items) => {
              return (<li className="items">{items}</li>);
            })}
        </div>
    )
}

export default List;