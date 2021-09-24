import React, { Component } from 'react';
import Loader from '../../../utils/Loader';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class AllLogs extends Component {
    render() {
        const { allLogs, allLogsLoader, allLogsError } = this.props;
        console.log('allLogs -> ', allLogs);
        return (
            <div className="logs-listing">
                <div className="logs-listing-inner">
                    <h6 className="container-heading">Search Results</h6>

                    <div className="log-card-list">

                        {allLogsLoader ? <Loader /> : (allLogs && allLogs.length > 0) ? <>
                            {allLogs.map(item => {
                                return (
                                    <div className={`card ${item.isSuccess ? "success" : "failure"}`}>
                                        <div className="card-inner">
                                            <p className="card-state">{item.isSuccess ? "SUCCESS" : "FAILED"}</p>
                                            <p className="url"><strong>URL:</strong> {item.url}</p>
                                            <ul>
                                                {item.custId ? <li>
                                                    <div className="data-block">
                                                        <div className="data-block-inner">
                                                            <label htmlFor="">Cust ID</label>
                                                            <strong>{item.custId}</strong>
                                                        </div>
                                                    </div>
                                                </li> : null}
                                                {item.leadId ? <li>
                                                    <div className="data-block">
                                                        <div className="data-block-inner">
                                                            <label htmlFor="">Lead ID</label>
                                                            <strong>{item.leadId}</strong>
                                                        </div>
                                                    </div>
                                                </li> : null}
                                                {item.createdOn ? <li>
                                                    <div className="data-block">
                                                        <div className="data-block-inner">
                                                            <label htmlFor="">Created On</label>
                                                            <strong>12-10-2921</strong>
                                                        </div>
                                                    </div>
                                                </li> : null}
                                                {item.requestType ? <li>
                                                    <div className="data-block">
                                                        <div className="data-block-inner">
                                                            <label htmlFor="">Request Type</label>
                                                            <strong>{item.requestType}</strong>
                                                        </div>
                                                    </div>
                                                </li> : null}
                                            </ul>
                                        </div>
                                    </div>
                                );
                            })}
                            {/*<div className="card success">
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
                            </div>*/}
                        </> : <div className="no-result-screen">
                            <div className="no-result-screen-inner">
                                <h4>{allLogsError || "Start Filtering"}</h4>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    allLogs: state && state.allReducers && state.allReducers.allLogs && state.allReducers.allLogs.allLogs && state.allReducers.allLogs.allLogs,
    allLogsLoader: state && state.allReducers && state.allReducers.allLogs && state.allReducers.allLogs.loading,
    allLogsError: state && state.allReducers && state.allReducers.allLogs && state.allReducers.allLogs.error,
});

const mapDispatchToProps = dispatch => ({

});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withRouter, withConnect)(AllLogs);