// Core
import React from 'react';
// Local Components
import List from './00-components/List';
// Styles
import './App.css';


function App(){
    return (
        <div>
            <h1 className="ui-red">Hello, world!</h1>
            <List value={[
                {value: 'one', name: 'One'},
                {value: 'two', name: 'Two'},
                {value: 'three', name: 'Three'},
            ]}
            />
        </div>
    );
}

export default App;
