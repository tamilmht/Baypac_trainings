import React, {Component} from 'react';

class Counter extends Component {
    state = {
        value : this.props.value,
        // tags : ['tag1','tag2','tag3']
    };

    incrementer = () => {
        this.setState({value : this.state.value + 1});
    };

    // constructor() {
    //     super();
    //     this.incrementer = this.incrementer.bind(this);
    // }
   
    render() {

        return (
                <div>
                    <span className={ this.getBadgeClasses() }>{ this.formatcount() }</span>
                    <button onClick={this.incrementer} className='btn btn-secondary btn-sm'>Increment</button>
                    {/* <ul>
                        {this.state.tags.map(tag => <li key={tag}>{tag}</li>)}
                    </ul> */}
                    <button onClick={this.props.onDelete(this.props.id)} className = 'btn btn-danger m-2  btn-sm'>Delete</button>
                </div>
                );
    }

    getBadgeClasses() {
        let classes = "badge m-2 badge-";
        classes += this.state.value === 0 ? "warning" : "primary";
        return classes;
    }

    formatcount(){
        return this.state.value === 0 ? 'Zero' : this.state.value
    }
}

export default Counter;