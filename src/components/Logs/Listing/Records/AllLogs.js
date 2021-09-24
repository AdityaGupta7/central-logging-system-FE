import React, { Component } from 'react';
import Loader from '../../../utils/Loader';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import popupClose from '../../../../images/close.png';

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
        return (
            <>
                <div className="logs-listing">
                    <div className="logs-listing-inner">
                        <div className="total-api-count">
                            <h6 className="container-heading">Search Results <label htmlFor="popup-trigger">(View Breakdown)</label></h6>
                            {allLogs && allLogs.length > 0 ? <p className="total-api"><label>Total API's</label><span>{allLogs.length}</span></p> : null}
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
                                <h4>Breakdown</h4>
                                <label htmlFor="popup-trigger"><img src={popupClose} alt="" /></label>
                            </div>
                        </div>
                        <div className="popup-body">
                            <div className="popup-body-inner">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti id modi laborum saepe quaerat dolorem eligendi voluptate! Nesciunt doloremque maiores rerum totam voluptatem consectetur natus architecto reprehenderit accusantium deleniti earum amet aliquam, id, nam expedita ullam harum qui animi nemo sapiente. Quis ut repellat nisi voluptas recusandae. Nostrum, magni ipsam! Laboriosam eius unde repudiandae id earum maxime sequi consequatur repellat! Itaque est quaerat neque autem repellat sequi consectetur illo iusto nemo fuga consequatur laboriosam doloremque porro optio, unde quae necessitatibus sapiente beatae quibusdam explicabo, alias tenetur at deleniti nobis? Praesentium aperiam quisquam, iure vitae nisi veritatis alias molestiae. Architecto accusamus enim in id ad quia placeat, quis ipsa quibusdam corporis animi fugit amet dolorum harum est sunt impedit. Soluta, numquam? At distinctio sit quaerat modi veritatis praesentium ea odio perspiciatis sequi tempore, delectus nulla voluptate ducimus exercitationem ex blanditiis, veniam et iure unde soluta illo dolorem autem! Quia recusandae quam cum quod amet repellat consequuntur nesciunt, ullam ratione, corporis dolorum blanditiis? Corporis facere deserunt modi delectus, repellendus qui esse veritatis doloribus aliquam maxime, placeat nulla. Qui, fuga? Quidem excepturi eligendi commodi maiores neque ratione quia accusamus saepe atque voluptates, eos repellendus amet, laboriosam nostrum dignissimos tenetur omnis quo vel, exercitationem veritatis consequatur. Earum quibusdam expedita cum inventore numquam aut corporis laborum explicabo fuga. Culpa repudiandae placeat natus temporibus eos incidunt sed inventore similique, voluptatum itaque? Aliquam deserunt delectus officiis pariatur at, magnam accusamus. Suscipit consequuntur sit nostrum eius ipsa voluptas porro aspernatur, itaque soluta accusamus dicta autem, minus vitae iure deserunt reprehenderit fuga dolore in neque cumque. Repellat saepe sapiente ducimus ex eos, iste, alias soluta atque ab aliquid provident praesentium architecto quo beatae repellendus iusto accusamus rem, voluptate in expedita fugiat. Labore voluptatum numquam neque amet harum totam earum non voluptate, quasi, culpa rerum hic, odit eos suscipit architecto corrupti iusto. Ex optio porro explicabo vel error alias voluptatibus nobis cupiditate natus sapiente cumque, non repellat facere est omnis, quos quod accusamus qui laudantium! Sequi vitae fugit sit, veniam possimus atque provident maiores vel ex accusamus ipsum quas corporis quisquam voluptatibus et similique ad harum reprehenderit laudantium sunt blanditiis culpa. Earum aliquid vero beatae voluptas quos labore maxime consequatur sapiente amet repudiandae quis aspernatur dignissimos, sed nesciunt nostrum nobis distinctio impedit quo! Esse beatae perspiciatis libero quaerat voluptatibus qui. Ipsa incidunt nulla magnam nesciunt debitis accusamus assumenda, expedita repellat ipsam earum atque doloribus dolorem facere optio quod, alias mollitia hic quibusdam. Aliquam minus aliquid natus iste nam magnam possimus corporis ut laboriosam cupiditate iusto odit excepturi illum, ducimus provident quidem obcaecati deleniti? Corrupti nihil repellat harum qui numquam illum nostrum veniam, iusto a, omnis ipsa fugit fugiat exercitationem nemo doloribus consectetur cumque magni, dolorem dicta quas molestias! Veritatis distinctio odio exercitationem explicabo quasi ad quod officia alias rerum animi cupiditate ipsa voluptas rem sed minima quos quam necessitatibus ut omnis, magni illum dolore veniam! Vitae tempora, laborum aperiam ab dicta temporibus dolor, soluta molestias aspernatur sit ipsam iste enim labore sequi dolorem id harum saepe, quis adipisci eum voluptate?</p>
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