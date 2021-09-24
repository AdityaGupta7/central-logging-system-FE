import React, { Component } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import ReactJson from 'react-json-view';

class Details extends Component {
    render() {
        const { location: { state: { selectedItem } } } = this.props;
        console.log('selectedItem -> ', selectedItem);
        return (
            <div className="details-container">
                <div className="details-container-inner">
                    <h6 className="container-heading">Search Results</h6>

                    <div className={`search-results-wrapper ${selectedItem.isSuccess ? "success" : "failure"}`}>
                        <div className="search-results-wrapper-inner">

                            <div className="url-block">
                                <div className="d-flex">
                                    <ul>
                                        <li><strong>URL:</strong> {selectedItem.url}</li>
                                    </ul>
                                    <ul>
                                        <li><label>Type:</label> ({selectedItem.requestType})</li>
                                        <li><label>Status Code:</label>{selectedItem.statusCode}</li>
                                        <li><label>Time:</label>{selectedItem.responseTime} ms</li>
                                        <li><label>Log Status:</label><p className="card-state">{selectedItem.isSuccess ? "SUCCESS" : "FAILED"}</p></li>
                                    </ul>
                                </div>
                            </div>

                            <h6 className="container-heading">Request Payload</h6>
                            <div className="result-wrapper payload">
                                {/* <pre></pre> */}
                                <ReactJson src={selectedItem.requestPayload} name={null} theme="summerfruit:inverted" />
                            </div>

                            <h6 className="container-heading">Response</h6>
                            <div className="result-wrapper response">
                                {/* <pre></pre> */}
                                <ReactJson src={selectedItem.response} name={null} theme="summerfruit:inverted" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default compose(withRouter)(Details);