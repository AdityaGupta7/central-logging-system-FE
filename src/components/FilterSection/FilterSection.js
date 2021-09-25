import { cloneDeep, debounce, isEqual } from 'lodash';
import React, { Component } from 'react';
import { connect } from "react-redux";
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { fetchLogsListInjector, fetchMasterSource, updateFiltersListInjector, clearLogsData } from '../../service/data/redux/actions';
import { numRegex, dateFormat, stateVariables } from '../utils/constants';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import moment from 'moment';
import filterIcon from '../../images/filter.png';
import menuClose from '../../images/menu-close.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class FilterSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            source: "",
            dateRange: null,
            custId: "",
            mobNo: "",
            url: "",
            leadId: ""
        };
        this.debouncedAddToFiltersList = debounce(this.debouncedAddToFiltersList.bind(this), 1500);
    }

    componentDidMount() {
        this.props.loadSourceList();

        const { location } = this.props;
        if (location && location.state && location.state.filtersList && location.pathname === '/details') {
            this.initializeState(location.state.filtersList);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (!isEqual(prevProps.filtersList, this.props.filtersList)) {
            const filtersList = this.props.filtersList;
            if (prevProps.filtersList.length > filtersList.length) {
                //fields cleanup
                const obj = {};
                stateVariables.filter(item => filtersList.find(el => el.type === item) === undefined).forEach(item => {
                    if (item === "dateRange") {
                        obj[item] = null;
                    }
                    else {
                        obj[item] = "";
                    }
                });
                if (Object.keys(obj).length > 0) {
                    this.setState(obj);
                }
            }

            this.callFetchLogsAPI();
        }

        if (prevProps.location.pathname === "/details" && this.props.location.pathname === "/" && this.props.filtersList.length === 0) {
            //clear all values
            this.setState({
                source: "",
                dateRange: null,
                custId: "",
                mobNo: "",
                url: "",
                leadId: ""
            });
        }
    }

    callFetchLogsAPI = () => {
        const { filtersList } = this.props;
        //const noEmptyValue = filtersList.filter(item => item.value);
        if (filtersList.length > 0) {
            //send fetch logs API
            const reqPayload = {};
            filtersList.forEach(item => {
                if (item.type === "dateRange") {
                    if (item.value && item.originalDateRange && item.originalDateRange.length > 0) {
                        reqPayload['dateRangeFrom'] = item.originalDateRange[0].getTime();
                        reqPayload['dateRangeTo'] = item.originalDateRange[1].getTime();
                    }
                }
                else {
                    reqPayload[item.type] = item.value;
                }
            })
            if (Object.keys(reqPayload).length > 0) {
                console.log('reqPayload -> ', reqPayload);
                this.props.fetchLogs(reqPayload);
            }
        }
        else {
            //last filter also removed - no data state
            this.props.clearLogsData();
        }
    }

    initializeState = (stateObj) => {
        if (stateObj && stateObj.length > 0) {
            const obj = {
                source: "",
                dateRange: null,
                custId: "",
                mobNo: "",
                url: "",
                leadId: ""
            };
            stateObj.forEach(item => {
                if (item.type === "dateRange") {
                    obj["dateRange"] = item.originalDateRange;
                }
                else {
                    obj[item.type] = item.value;
                }
            });
            this.setState(obj);
        }
    }

    addToFiltersList = (item) => {
        const { filtersList } = this.props;
        const index = filtersList.findIndex(filter => filter.type === item.type);
        if (index >= 0) {
            const clonedList = cloneDeep(filtersList);
            clonedList[index] = item;
            this.props.updateFiltersList(clonedList);
        }
        else {
            this.props.updateFiltersList([...filtersList, item]);
        }
    }

    debouncedAddToFiltersList(item) {
        this.addToFiltersList(item);
    }

    onSelectChange = (e) => {
        this.setState({
            source: e.target.value
        }, () => {
            // this.addToFiltersList({ type: 'source', value: this.state.source, label: 'Source' });
        });
    }

    onCustIdChange = (e) => {
        const val = e.target.value.slice(0, 10);
        if (numRegex.test(val) || val === "") {
            const { custId } = this.state;
            if (val !== custId) {
                this.setState({
                    custId: val
                }, () => {
                    // this.debouncedAddToFiltersList({ type: 'custId', value: this.state.custId, label: 'Customer ID' });
                });
            }
        }
    }

    onMobileNoChange = (e) => {
        const val = e.target.value.slice(0, 10);
        if (numRegex.test(val) || val === "") {
            const { mobNo } = this.state;
            if (val !== mobNo) {
                this.setState({
                    mobNo: val
                }, () => {
                    // this.debouncedAddToFiltersList({ type: 'mobNo', value: this.state.mobNo, label: 'Mobile' });
                });
            }
        }
    }

    onUrlChange = (e) => {
        const val = e.target.value.slice(0, 200);
        this.setState({
            url: val
        }, () => {
            // this.debouncedAddToFiltersList({ type: 'url', value: this.state.url, label: 'URL' });
        });
    }

    onLeadIDChange = (e) => {
        const val = e.target.value.slice(0, 10);
        if (numRegex.test(val) || val === "") {
            const { leadId } = this.state;
            if (val !== leadId) {
                this.setState({
                    leadId: val
                }, () => {
                    // this.debouncedAddToFiltersList({ type: 'leadId', value: this.state.leadId, label: 'Lead ID' });
                });
            }
        }
    }

    onReset = () => {
        //clear all state vals and prop vals
        //const { filtersList } = this.props;
        //if (filtersList.filter(item => item.value).length > 0) {
        this.setState({
            source: "",
            dateRange: null,
            custId: "",
            mobNo: "",
            url: "",
            leadId: ""
        }, () => this.props.updateFiltersList([]));
        //}
    }

    onDatesSelection = (val) => {
        this.setState({
            dateRange: val
        }, () => {
            /*const { dateRange } = this.state;
            let str = null;
            if (dateRange && dateRange.length === 2) {
                //non-empty dateRange
                const startDate = moment(dateRange[0]).format(dateFormat);
                const endDate = moment(dateRange[1]).format(dateFormat);

                str = `${startDate} - ${endDate}`;
            }
            this.addToFiltersList({ type: 'dateRange', value: str, label: 'Date range', originalDateRange: dateRange });
        */});
    }

    onSubmit = () => {
        const { source, dateRange, custId, mobNo, url, leadId } = this.state;
        const filtersList = [];
        if (source) {
            filtersList.push({ type: 'source', value: source, label: 'Source' });
        }
        if (dateRange) {
            let str = null;
            if (dateRange && dateRange.length === 2) {
                //non-empty dateRange
                const startDate = moment(dateRange[0]).format(dateFormat);
                const endDate = moment(dateRange[1]).format(dateFormat);

                str = `${startDate} - ${endDate}`;
            }
            filtersList.push({ type: 'dateRange', value: str, label: 'Date range', originalDateRange: dateRange });
        }
        if (custId) {
            filtersList.push({ type: 'custId', value: custId, label: 'Customer ID' });
        }
        if (mobNo) {
            filtersList.push({ type: 'mobNo', value: mobNo, label: 'Mobile' });
        }
        if (url) {
            filtersList.push({ type: 'url', value: url, label: 'URL' });
        }
        if (leadId) {
            filtersList.push({ type: 'leadId', value: leadId, label: 'Lead ID' });
        }
        if (filtersList.length > 0) {
            this.props.updateFiltersList(filtersList);
        }
        else {
            //dispatch toast message
            this.toastMessage();
        }
    }

    toastMessage = () => {
        toast.error('No filters selected!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    render() {
        const { source, custId, mobNo, url, leadId, dateRange } = this.state;
        const { sourceList, sourceListLoader, filtersList, location } = this.props;
        // const filterHasValues = filtersList.filter(item => item.value).length > 0;
        let fifteenDaysAgo = new Date();
        fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);
        const isDetails = location && location.pathname === "/details";
        const commonDisabler = sourceListLoader || sourceList.length === 0 || source === "" || isDetails;
        return (
            <>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <div className="filter-wrapper">
                    <div className="filter-wrapper-inner">
                        <div className="brand-title menu-icon-wrapper">
                            <h3>Search filters <img src={filterIcon} alt="" /></h3>
                            <label htmlFor="side-bar-menu-trigger"><img src={menuClose} alt="" /></label>
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
                                                <select value={source} disabled={sourceListLoader || isDetails} onChange={this.onSelectChange}>
                                                    <option disabled hidden value="" key="">Select Source</option>
                                                    {sourceList.map(item => (
                                                        <option value={item} key={item}>{item}</option>
                                                    ))}
                                                </select>
                                                <label>Source Selection</label>
                                            </div>
                                            {!source ? <small className="validation__error__msg">Select logs source</small> : null}
                                        </div>
                                    </li>

                                    <li>
                                        <div className="date-range-picker-wrapper">
                                            <DateRangePicker
                                                onChange={this.onDatesSelection}
                                                minDate={fifteenDaysAgo}
                                                maxDate={new Date()}
                                                value={dateRange}
                                                format={"dd-MM-y"}
                                                disabled={commonDisabler}
                                            />
                                            <label htmlFor="">Date Range</label>
                                        </div>
                                    </li>

                                    <li>
                                        <div className="floating__placeholder mobile__view">
                                            <div className="floating__placeholder__inner">
                                                <input type="text" placeholder=" " onChange={this.onCustIdChange} value={custId} disabled={commonDisabler} />
                                                <label>Customer ID</label>
                                            </div>
                                        </div>
                                    </li>

                                    <li>
                                        <div className="floating__placeholder mobile__view">
                                            <div className="floating__placeholder__inner">
                                                <input type="text" placeholder=" " onChange={this.onMobileNoChange} value={mobNo} disabled={commonDisabler} />
                                                <label>Mobile Number</label>
                                            </div>
                                        </div>
                                    </li>

                                    <li>
                                        <div className="floating__placeholder mobile__view">
                                            <div className="floating__placeholder__inner">
                                                <input type="text" placeholder=" " value={url} onChange={this.onUrlChange} disabled={commonDisabler} />
                                                <label>URL End Point</label>
                                            </div>
                                        </div>
                                    </li>

                                    <li>
                                        <div className="floating__placeholder mobile__view">
                                            <div className="floating__placeholder__inner">
                                                <input type="text" placeholder=" " onChange={this.onLeadIDChange} value={leadId} disabled={commonDisabler} />
                                                <label>Lead ID</label>
                                            </div>
                                        </div>
                                    </li>

                                </ul>

                                <div className="btn-control">
                                    <div className="btn-controls-inner">
                                        <ul className={isDetails ? "" : "two-column"}>
                                            {isDetails ? null : <li><label htmlFor="side-bar-menu-trigger" className="btn btn-primary" onClick={this.onSubmit}>Submit</label></li>}
                                            <li> <button className={`btn btn-primary ${isDetails ? '' : 'btn-primary-outline'}`} onClick={() => {
                                                if (isDetails) {
                                                    this.props.history.goBack();
                                                }
                                                else {
                                                    this.onReset();
                                                }
                                            }}>{isDetails ? "Go Back" : "Reset"}</button></li>
                                        </ul>
                                        {/* {isDetails ? null : <button className="btn btn-primary" onClick={this.onSubmit}>Submit</button>}
                                    <button className="btn btn-primary" onClick={() => {
                                        if (isDetails) {
                                            this.props.history.goBack();
                                        }
                                        else {
                                            this.onReset();
                                        }
                                    }}>{isDetails ? "Go Back" : "Reset"}</button> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => ({
    sourceList: state && state.allReducers && state.allReducers.sourceList && state.allReducers.sourceList.sourceList,
    sourceListLoader: state && state.allReducers && state.allReducers.sourceList && state.allReducers.sourceList.loading,
    filtersList: state && state.allReducers && state.allReducers.filtersList && state.allReducers.filtersList.filtersList,
    allLogs: state && state.allReducers && state.allReducers.allLogs && state.allReducers.allLogs.allLogs && state.allReducers.allLogs.allLogs,
});

const mapDispatchToProps = dispatch => ({
    loadSourceList: () => fetchMasterSource(dispatch),
    updateFiltersList: updateFiltersListInjector(dispatch),
    fetchLogs: fetchLogsListInjector(dispatch),
    clearLogsData: () => clearLogsData(dispatch),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, withRouter)(FilterSection);