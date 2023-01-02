import * as _ from 'lodash';
import * as React from 'react';
import './styles.css';

import Counter from './Counter.jsx';
import Todo from './Todo.jsx';

const App = () => {

  return (
    <div>
      <h1 className="name">ZusTime Demo</h1>
        <Counter />
        <Todo />
    </div>
  );
};

export default App;
