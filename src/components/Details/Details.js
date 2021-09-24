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

                    <div className="search-results-wrapper success">
                        <div className="search-results-wrapper-inner">

                            <div className="url-block">
                                <ul>
                                    <li><strong>URL:</strong> {selectedItem.url}</li>
                                    <li>({selectedItem.requestType})</li>
                                    <li><p className="card-state">{selectedItem.isSuccess ? "SUCCESS" : "FAILED"}</p></li>
                                </ul>
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