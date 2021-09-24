import { cloneDeep, debounce, isEqual } from 'lodash';
import React, { Component } from 'react';
import { connect } from "react-redux";
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { fetchLogsListInjector, fetchMasterSource, updateFiltersListInjector, clearLogsData } from '../../service/data/redux/actions';
import { numRegex, dateFormat } from '../utils/constants';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import moment from 'moment';

class FilterSection extends Component {
    constructor(props) {
        super(props);
        const savedState = props && props.location && props.location.state;
        this.state = {
            source: (savedState && savedState.source) || "",
            dateRange: null,
            custId: (savedState && savedState.custId) || "",
            mobNo: (savedState && savedState.mobNo) || "",
            url: (savedState && savedState.url) || "",
            leadId: (savedState && savedState.leadId) || "",
            isDisabled: (savedState && savedState.isDisabled) || false
        };
        this.debouncedAddToFiltersList = debounce(this.debouncedAddToFiltersList.bind(this), 1500);
    }

    componentDidMount() {
        this.props.loadSourceList();
    }

    componentDidUpdate(prevProps, prevState) {
        if (!isEqual(prevProps.filtersList, this.props.filtersList)) {
            const filtersList = this.props.filtersList;
            if (prevProps.filtersList.length > filtersList.length) {
                console.log('cleanup hit');
                //fields cleanup
                const obj = {};
                ['source', 'dateRange', 'custId', 'mobNo', 'url', 'leadId',].filter(item => filtersList.find(el => el.type === item) === undefined).forEach(item => {
                    if (item === "dateRange") {
                        obj[item] = null;
                    }
                    else {
                        obj[item] = "";
                    }
                });
                if (Object.keys(obj).length > 0) {
                    this.setState(obj, () => console.log('state after cleanup -> ', this.state));
                }
            }

            const noEmptyValue = filtersList.filter(item => item.value);
            console.log('nonEmptyValue -> ', noEmptyValue);
            if (noEmptyValue.length > 0) {
                //send fetch logs API
                const reqPayload = noEmptyValue.map(item => ({ type: item.type, value: item.value }));
                console.log('fetch API hit -> ', reqPayload);
                this.props.fetchLogs(reqPayload);
            }
            else {
                //last filter also removed - no data state
                this.props.clearLogsData();
            }
        }
        if (!isEqual(prevProps.location.state, this.props.location.state) && this.props.location.state) {

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
            this.addToFiltersList({ type: 'source', value: this.state.source, label: 'Source' });
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
                    this.debouncedAddToFiltersList({ type: 'custId', value: this.state.custId, label: 'Customer ID' });
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
                    this.debouncedAddToFiltersList({ type: 'mobNo', value: this.state.mobNo, label: 'Mobile' });
                });
            }
        }
    }

    onUrlChange = (e) => {
        const val = e.target.value.slice(0, 200);
        this.setState({
            url: val
        }, () => {
            this.debouncedAddToFiltersList({ type: 'url', value: this.state.url, label: 'URL' });
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
                    this.debouncedAddToFiltersList({ type: 'leadId', value: this.state.leadId, label: 'Lead ID' });
                });
            }
        }
    }

    onReset = () => {
        //clear all state vals and prop vals
        const { filtersList } = this.props;
        if (filtersList.filter(item => item.value).length > 0) {
            this.props.updateFiltersList([]);
        }
    }

    onDatesSelection = (val) => {
        console.log('from date picker -> ', JSON.stringify(val));
        this.setState({
            dateRange: val
        }, () => {
            const { dateRange } = this.state;
            let str = null;
            if (dateRange && dateRange.length === 2) {
                //non-empty dateRange
                const startDate = moment(dateRange[0]).format(dateFormat);
                const endDate = moment(dateRange[1]).format(dateFormat);

                str = `${startDate} - ${endDate}`;
            }
            this.addToFiltersList({ type: 'dateRange', value: str, label: 'Date range', originalDateRange: dateRange });
        });
    }

    render() {
        const { source, custId, mobNo, url, leadId, isDisabled, dateRange } = this.state;
        const { sourceList, sourceListLoader, filtersList } = this.props;
        const filterHasValues = filtersList.filter(item => item.value).length > 0;
        let fifteenDaysAgo = new Date();
        fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);
        const commonDisabler = sourceListLoader || sourceList.length === 0 || source === "";
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
                                            <select value={source} disabled={sourceListLoader || isDisabled} onChange={this.onSelectChange}>
                                                <option disabled hidden value="" key="">Select Source</option>
                                                {sourceList.map(item => (
                                                    <option value={item} key={item}>{item}</option>
                                                ))}
                                                {/* <option value="">option 2</option>
                                                <option value="">option 3</option>
                                                <option value="">option 4</option>
                                                <option value="">option 5</option> */}
                                            </select>
                                            <label>Source Selection</label>
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    {/* <div className="floating__placeholder mobile__view">
                                        <div className="floating__placeholder__inner">
                                            <input type="date" placeholder=" " />
                                            <label>Date Range</label>
                                        </div>
                                    </div> */}
                                    <DateRangePicker
                                        onChange={this.onDatesSelection}
                                        minDate={fifteenDaysAgo}
                                        maxDate={new Date()}
                                        value={dateRange}
                                        format={"dd-MM-y"}
                                        disabled={commonDisabler}
                                    />
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

                            {filterHasValues ? <div className="btn-control">
                                <div className="btn-controls-inner">
                                    <button className="btn btn-primary" onClick={this.onReset}>Reset</button>
                                </div>
                            </div> : null}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    sourceList: state && state.allReducers && state.allReducers.sourceList && state.allReducers.sourceList.sourceList,
    sourceListLoader: state && state.allReducers && state.allReducers.sourceList && state.allReducers.sourceList.loading,
    filtersList: state && state.allReducers && state.allReducers.filtersList && state.allReducers.filtersList.filtersList,
});

const mapDispatchToProps = dispatch => ({
    loadSourceList: () => fetchMasterSource(dispatch),
    updateFiltersList: updateFiltersListInjector(dispatch),
    fetchLogs: fetchLogsListInjector(dispatch),
    clearLogsData: () => clearLogsData(dispatch),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, withRouter)(FilterSection);