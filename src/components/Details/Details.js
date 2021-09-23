import React, { Component } from 'react';

class Details extends Component {    
    render() {
        console.log('props from details -> ', this.props);
        return (
            <div className="details-container">
                Details
            </div>
        )
    }
}

export default Details;