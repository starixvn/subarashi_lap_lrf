import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Pager } from '@9softstudio/react-grid';
import GridCaption from '../../../components/GridCaption';
import DataGrid from './DataGrid';
import { ActionCreators } from '../actions';
import GridHelper from "../../../lib/helpers/gridHelper";

export const Content = props => {
    const { pagingOption, playerCount } = props;
    if (!pagingOption.TotalItem) {
        return null;
    }

    const _handlePaging = (pageIndex, pageSize) => {
        const { selectedParams, searchPlayer, pagingOption, setPagingOption } = props;
        const newParams = {
            ...selectedParams, 
            ...{
                pageIndex,
                pageSize
            }
        }
        searchPlayer(newParams, GridHelper.callBackToUpdatePaging({ pagingOption, setPagingOption }));
    }


    return (
        <div className="result-content">
            <GridCaption playerCount={playerCount} />
            <DataGrid />
            <Pager pageOption={pagingOption} onPaging={_handlePaging} />
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    const { searchPlayer, setPagingOption } = ActionCreators;
    return bindActionCreators({ searchPlayer, setPagingOption }, dispatch);
}
function mapStateToProps(state) {
    const { pagingOption, selectedParams, playerList } = state;
    const playerCount = pagingOption.TotalItem || (playerList && playerList.length) || 0;
    return Object.assign({}, { pagingOption, selectedParams, playerCount });
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);