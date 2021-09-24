import React, { Component } from 'react';
import closeIcon from '../../../images/close.png';
import { connect } from 'react-redux';
import { updateFiltersListInjector } from '../../../service/data/redux/actions';
import { cloneDeep } from 'lodash';

class Filters extends Component {
    onOptionRemove = (item) => {
        const { filtersList } = this.props;
        if (item.type === "source") {
            this.props.updateFiltersList([]);
        }
        else {
            let clonedList = cloneDeep(filtersList).filter(el => el.value);
            const index = clonedList.findIndex(el => el.type === item.type);
            if (index >= 0) {
                clonedList.splice(index, 1);
                this.props.updateFiltersList(clonedList);
            }
        }
    }

    render() {
        const { filtersList } = this.props;
        const filteredItems = filtersList.filter(item => item.value);
        return (
            <>
                {filteredItems.length > 0 ? <div className="data-filters">
                    <div className="data-filters-inner">
                        <h6 className="container-heading">Data Filters</h6>

                        <ul>
                            {filteredItems.map(item => (
                                <li key={item.type}><label>{item.label}: </label><span>{item.value}</span> <img src={closeIcon} alt="" onClick={() => this.onOptionRemove(item)} /></li>
                            ))}
                            {/* <li><label>Date Range:</label><span>12.10.2010 - 12.11.2011</span> <img src={closeIcon} alt="" /></li>
                            <li><label>Mobile Num:</label><span>9999262722</span> <img src={closeIcon} alt="" /></li>
                            <li><label>Cust ID:</label><span>857576633</span> <img src={closeIcon} alt="" /></li> */}
                        </ul>
                    </div>
                </div> : null}
            </>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    updateFiltersList: updateFiltersListInjector(dispatch),
});

const mapStateToProps = state => ({
    filtersList: state && state.allReducers && state.allReducers.filtersList && state.allReducers.filtersList.filtersList,
})

export default connect(mapStateToProps, mapDispatchToProps)(Filters);