import React, { Component } from 'react';
import {connect} from 'react-redux';
import {addGun,removeGun,addAsync} from './index.redux';
@connect((state) => ({num:state.counter}),{addGun,removeGun,addAsync})
class App extends Component {
    render() {
       const { num,addGun,removeGun,addAsync } = this.props;
        return (
            <div>
                <h1>现在是数字{num}</h1>
                <button onClick={addGun}>Add</button> 
                <button onClick={removeGun}>Remove</button> 
                <button onClick={addAsync}>AsyncAdd</button> 
            </div>
        );
    }
}
export default App;