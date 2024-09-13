import React, { Component } from 'react';
import Counter from './counterComponent'


class Counters extends Component {
    state = { 
        Counters : [
            { id: 1, value: 4 },
            { id: 2, value: 0 },
            { id: 3, value: 0 },
            { id: 4, value: 0 }
        ]
    };

    deletor = (delete_id) => {
        console.log('deletor id is :',delete_id);
        // const Counter = this.state.Counters.filter(c => c.id !== delete_id)
        // this.setState(Counters : Counter)
    };



    render() {
        return (
        <div>
            {this.state.Counters.map(counter => <Counter key={counter.id} onDelete={this.deletor} value = {counter.value} id = {counter.id}/>)}
        </div>);
    }
}
 
export default Counters;