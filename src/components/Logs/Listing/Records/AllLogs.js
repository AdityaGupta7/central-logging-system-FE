import React, { Component } from 'react';
import Loader from '../../../utils/Loader';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import popupClose from '../../../../images/close.png';
import { Chart } from "react-google-charts";

class AllLogs extends Component {
    redirectToDetails = (item) => {
        const { filtersList, history } = this.props;
        history.push({
            pathname: '/details',
            state: {
                filtersList: filtersList.filter(item => item.value),
                selectedItem: item
            }
        });
    }

    render() {
        const { allLogs, allLogsLoader, allLogsError, allLogsEmptyMsg } = this.props;
        const filterStats = [];
        if (allLogs && allLogs.length > 0) {
            filterStats.push(["SUCCESS", allLogs.filter(item => item.isSuccess).length]);
            filterStats.push(["FAILED", allLogs.filter(item => !item.isSuccess).length]);
        }
        return (
            <>
                <div className="logs-listing">
                    <div className="logs-listing-inner">
                        <div className="total-api-count">
                            <h6 className="container-heading">Search Results {allLogs && allLogs.length > 0 && !allLogsLoader ? <label htmlFor="popup-trigger">(View Breakdown)</label> : null}</h6>
                            {allLogs && allLogs.length > 0 && !allLogsLoader ? <p className="total-api"><label>Total API's</label><span>{allLogs.length}</span></p> : null}
                        </div>

                        <div className="log-card-list">

                            {allLogsLoader ? <Loader /> : (allLogs && allLogs.length > 0) ? <>
                                {allLogs.map(item => {
                                    return (
                                        <div className={`card ${item.isSuccess ? "success" : "failure"}`} onClick={() => this.redirectToDetails(item)}>
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
                            </> : <div className="no-result-screen">
                                <div className="no-result-screen-inner">
                                    <h4>{allLogsError || allLogsEmptyMsg || "Start Filtering"}</h4>
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>
                {/* charts popup */}
                <input type="checkbox" id="popup-trigger" />
                <div className="stats-popup">
                    <div className="stats-popup-inner">
                        <div className="popup-header">
                            <div className="popup-header-inner">
                                <h4>Status Breakdown</h4>
                                <label htmlFor="popup-trigger"><img src={popupClose} alt="" /></label>
                            </div>
                        </div>
                        <div className="popup-body">
                            <div className="popup-body-inner">
                                <Chart
                                    width={'500px'}
                                    height={'300px'}
                                    chartType="PieChart"
                                    loader={<div>Loading Chart</div>}
                                    data={[
                                        ['Status', 'No of logs'],
                                        ...filterStats
                                    ]}
                                    options={{
                                        // title: 'My Daily Activities',
                                    }}
                                    rootProps={{ 'data-testid': '1' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => ({
    allLogs: state && state.allReducers && state.allReducers.allLogs && state.allReducers.allLogs.allLogs && state.allReducers.allLogs.allLogs,
    allLogsLoader: state && state.allReducers && state.allReducers.allLogs && state.allReducers.allLogs.loading,
    allLogsError: state && state.allReducers && state.allReducers.allLogs && state.allReducers.allLogs.error,
    allLogsEmptyMsg: state && state.allReducers && state.allReducers.allLogs && state.allReducers.allLogs.emptyMessage,
    sourceList: state && state.allReducers && state.allReducers.sourceList && state.allReducers.sourceList.sourceList,
    sourceListLoader: state && state.allReducers && state.allReducers.sourceList && state.allReducers.sourceList.loading,
    filtersList: state && state.allReducers && state.allReducers.filtersList && state.allReducers.filtersList.filtersList,
});

const mapDispatchToProps = dispatch => ({

});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withRouter, withConnect)(AllLogs);