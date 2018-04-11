import React, { Component }  from 'react';
import { connect } from 'react-redux';

class Counter extends Component {

    increment = () => {
        this.props.dispatch({ type: 'INCREMENT' });
    }

    decrement = () => {
        this.props.dispatch({ type: 'DECREMENT' });
    }

    render() {
        return (
            <main className="main cms-page cms-page-counter">
                <h1>{'Counter'}</h1>
                <p>Test Redux - Counter Example</p>
                <div className="counter-wrapper">
                    <button onClick={this.decrement} className="qty-button">-</button>
                    <span className="qty-box">{this.props.count}</span>
                    <button onClick={this.increment} className="qty-button">+</button>
                </div>
            </main>
        );
    }
}

function mapStateToProps(state) {
    return {
        count: state.counter.count
    };
}

export default connect(mapStateToProps)(Counter);