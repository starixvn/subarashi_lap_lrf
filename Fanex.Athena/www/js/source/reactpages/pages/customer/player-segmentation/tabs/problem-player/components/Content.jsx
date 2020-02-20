import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Pager } from '@9softstudio/react-grid';
import GridCaption from '../../../components/GridCaption';
import DataGrid from './DataGrid';
import { ActionCreators } from '../actions';

export const Content = props => {
    const { pagingOption, playerCount } = props;

    if (pagingOption.TotalItem === null) {
        return null;
    }

    const _handlePaging = (pageIndex, pageSize) => {
        const { selectedParams, searchPlayer } = props;
        const newParams = {
            ...selectedParams,
            pageIndex,
            pageSize
        }
        searchPlayer(newParams);
    }

    return (
        <div className="result-content">
            <GridCaption playerCount={playerCount}/>
            <DataGrid />
            <Pager pageOption={pagingOption} onPaging={_handlePaging} />
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    const { searchPlayer } = ActionCreators;
    return bindActionCreators({ searchPlayer }, dispatch);
}
function mapStateToProps(state) {
    const { pagingOption, selectedParams, playerList } = state;
    const playerCount = pagingOption.TotalItem || (playerList && playerList.length) || 0;
    return Object.assign({}, { pagingOption, selectedParams, playerCount });
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);