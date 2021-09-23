import React, { Component, Fragment } from 'react';
import Filters from './Filters/Filters';
import AllLogs from './Listing/Records/AllLogs';
import Charts from './Listing/Charts/Charts';

class Listing extends Component {
    render() {
        console.log('props from listing -> ', this.props);
        return (
            <Fragment>
                <Filters />
                <div className="logs-area">
                    <AllLogs />
                    <Charts />
                </div>
            </Fragment>
        );
    }
}

export default Listing;