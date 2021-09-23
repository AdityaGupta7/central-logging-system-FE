import React, { Component } from 'react';
import Loader from '../../../utils/Loader';

class AllLogs extends Component {
    render() {
        return (
            <div className="logs-listing">
                <div className="logs-listing-inner">
                    <h6 className="container-heading">Search Results</h6>

                    <div className="log-card-list">

                        <Loader />

                        {/* <div className="no-result-screen">
                            <div className="no-result-screen-inner">
                                <h4>Start Filtering</h4>
                            </div>
                        </div> */}

                        {/* <div className="card success">
                            <div className="card-inner">
                                <p className="card-state">Success</p>
                                <p className="url"><strong>URL:</strong> https://www.flaticon.com/free-icon/close_1828666?term=cross&page=1&position=7&page=1&position=7&related_id=1828666&origin=search</p>
                                <ul>
                                    <li>
                                        <div className="data-block">
                                            <div className="data-block-inner">
                                                <label htmlFor="">Cust ID</label>
                                                <strong>83645653633</strong>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="data-block">
                                            <div className="data-block-inner">
                                                <label htmlFor="">Lead ID</label>
                                                <strong>83645653633</strong>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="data-block">
                                            <div className="data-block-inner">
                                                <label htmlFor="">Created On</label>
                                                <strong>12-10-2921</strong>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="data-block">
                                            <div className="data-block-inner">
                                                <label htmlFor="">Request Type</label>
                                                <strong>POST</strong>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="card success">
                            <div className="card-inner">
                                <p className="card-state">Success</p>
                                <p className="url"><strong>URL:</strong> https://www.flaticon.com/free-icon/close_1828666?term=cross&page=1&position=7&page=1&position=7&related_id=1828666&origin=search</p>
                                <ul>
                                    <li>
                                        <div className="data-block">
                                            <div className="data-block-inner">
                                                <label htmlFor="">Cust ID</label>
                                                <strong>83645653633</strong>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="data-block">
                                            <div className="data-block-inner">
                                                <label htmlFor="">Lead ID</label>
                                                <strong>83645653633</strong>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="data-block">
                                            <div className="data-block-inner">
                                                <label htmlFor="">Created On</label>
                                                <strong>12-10-2921</strong>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="data-block">
                                            <div className="data-block-inner">
                                                <label htmlFor="">Request Type</label>
                                                <strong>POST</strong>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="card failure">
                            <div className="card-inner">
                                <p className="card-state">Failed</p>
                                <p className="url"><strong>URL:</strong> https://www.flaticon.com/free-icon/close_1828666?term=cross&page=1&position=7&page=1&position=7&related_id=1828666&origin=search</p>
                                <ul>
                                    <li>
                                        <div className="data-block">
                                            <div className="data-block-inner">
                                                <label htmlFor="">Cust ID</label>
                                                <strong>83645653633</strong>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="data-block">
                                            <div className="data-block-inner">
                                                <label htmlFor="">Lead ID</label>
                                                <strong>83645653633</strong>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="data-block">
                                            <div className="data-block-inner">
                                                <label htmlFor="">Created On</label>
                                                <strong>12-10-2921</strong>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="data-block">
                                            <div className="data-block-inner">
                                                <label htmlFor="">Request Type</label>
                                                <strong>POST</strong>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div> */}

                    </div>
                </div>
            </div>
        );
    }
}

export default AllLogs;