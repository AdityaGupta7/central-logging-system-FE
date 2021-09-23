import React, { Component } from 'react';
import closeIcon from '../../../images/close.png';

class Filters extends Component {
    render() {
        return (
            <div className="data-filters">
                <div className="data-filters-inner">
                    <h6 className="container-heading">Data Filters</h6>

                    <ul>
                        <li><label>Date Range:</label><span>12.10.2010 - 12.11.2011</span> <img src={closeIcon} alt="" /></li>
                        <li><label>Mobile Num:</label><span>9999262722</span> <img src={closeIcon} alt="" /></li>
                        <li><label>Cust ID:</label><span>857576633</span> <img src={closeIcon} alt="" /></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Filters;