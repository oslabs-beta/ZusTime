import React from 'react';
import useStore from './store.ts';

const List = () => {
    const todos = useStore((state) => state.todos);

    return(
        <div>
            {todos.map((items) => {
              return (<li clasName="items">{items}</li>);
            })}
        </div>
    )
}

export default List;