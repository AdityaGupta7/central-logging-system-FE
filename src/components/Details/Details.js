import React, { Component } from 'react';

class Details extends Component {
    render() {
        return (
            <div className="details-container">
                <div className="details-container-inner">
                    <h6 className="container-heading">Search Results</h6>

                    <div className="search-results-wrapper success">
                        <div className="search-results-wrapper-inner">
                            <div className="url-block">
                                <ul>
                                    <li><strong>URL:</strong> https://www.flaticon.com/free-icon/close_1828666?term=cross&page=1&position=7&page=1&position=7&related_id=1828666&origin=search</li>
                                    <li>(Post)</li>
                                    <li><p className="card-state">Success</p></li>
                                </ul>
                            </div>

                            <h6 className="container-heading">Request Payload</h6>
                            <div className="result-wrapper payload">
                                <pre></pre>
                            </div>

                            <h6 className="container-heading">Response</h6>
                            <div className="result-wrapper response">
                                <pre></pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Details;