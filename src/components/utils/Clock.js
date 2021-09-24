import React from 'react';

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date().toLocaleString('en-GB', { timeZone: 'IST' })
        };
    }
    componentDidMount() {
        this.intervalID = setInterval(
            () => this.tick(),
            1000
        );
    }
    componentWillUnmount() {
        clearInterval(this.intervalID);
    }
    tick() {
        this.setState({
            time: new Date().toLocaleString('en-GB', { timeZone: 'IST' })
        });
    }
    render() {
        return (
            <p className="App-clock">
                {this.state.time.split(',').map(item=>(<span>{item}</span>))}
            </p>
        );
    }
}

export default Clock;