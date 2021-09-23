import React, { Component } from 'react';

class FilterSection extends Component {
    render() {
        return (
            <div className="filter-wrapper">
                <div className="filter-wrapper-inner">
                    <div className="brand-title">
                        <h3>Search filters</h3>
                    </div>

                    {/* <div className="user-info-wrapper">
                       <div className="user-info-wrapper-inner">
                            <div className="img-wrapper">
                                <img src="" alt="" />
                            </div>
                            <div className="content-wrapper">
                                <p>Welcome</p>
                                <h4>Aditya Gupta</h4>
                            </div>
                       </div>
                   </div> */}

                    <div className="filter-list-wrapper">
                        <div className="filter-list-wrapper-inner">
                            <ul>
                                <li>
                                    <div className="floating__placeholder select__type mobile__view">
                                        <div className="floating__placeholder__inner">
                                            <select>
                                                <option disabled selected hidden>Select Source</option>
                                                <option value="">option 1</option>
                                                <option value="">option 2</option>
                                                <option value="">option 3</option>
                                                <option value="">option 4</option>
                                                <option value="">option 5</option>
                                            </select>
                                            <label>Source Selection</label>
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    <div className="floating__placeholder mobile__view">
                                        <div className="floating__placeholder__inner">
                                            <input type="date" placeholder=" " />
                                            <label>Date Range</label>
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    <div className="floating__placeholder mobile__view">
                                        <div className="floating__placeholder__inner">
                                            <input type="text" placeholder=" " />
                                            <label>Customer ID</label>
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    <div className="floating__placeholder mobile__view">
                                        <div className="floating__placeholder__inner">
                                            <input type="text" placeholder=" " />
                                            <label>Mobile Number</label>
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    <div className="floating__placeholder mobile__view">
                                        <div className="floating__placeholder__inner">
                                            <input type="text" placeholder=" " />
                                            <label>Url End Point</label>
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    <div className="floating__placeholder mobile__view">
                                        <div className="floating__placeholder__inner">
                                            <input type="text" placeholder=" " />
                                            <label>Lead ID</label>
                                        </div>
                                    </div>
                                </li>

                            </ul>

                            <div className="btn-control">
                                <div className="btn-controls-inner">
                                    <button className="btn btn-primary">Reset</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FilterSection;