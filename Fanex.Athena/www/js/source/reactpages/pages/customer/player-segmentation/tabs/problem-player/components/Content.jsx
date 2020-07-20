import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Pager } from '@9softstudio/react-grid';
import Popup from '@jsroot/components/popup';
import GridCaption from '../../../components/GridCaption';
import DataGrid from './DataGrid';
import { ActionCreators } from '../actions';
import GridHelper from "../../../lib/helpers/gridHelper";

export const Content = props => {
    const { pagingOption, playerCount, searchPlayer, selectedParams, selectedTabKey, selectedPlayer, setPagingOption, setSelectedPlayer } = props;

    if (pagingOption.TotalItem == null) {
        return null;
    }

    const _handlePaging = (pageIndex, pageSize) => {
        const sortInfo = GridHelper.getSortInfoFromPagingOption(pagingOption);
        const params = {
            ...selectedParams,
            ...sortInfo,
            ...{
                pageIndex,
                pageSize
            },
        }
        searchPlayer(selectedTabKey, params, GridHelper.callBackToUpdatePaging({ pagingOption, setPagingOption }));
    }

    const _renderBetListPopup = () => {
        return selectedPlayer && <Popup isShow={true}
            iframeUrl={'PlayerSegmentation/BetList?custId=123&baseCurrency=EUR'}
            title={'BetList'}
            width={1100} height={700}
            onClose={() => setSelectedPlayer(null)}>
        </Popup>
    }

    return (
        <div className="result-content">
            <GridCaption playerCount={playerCount} />
            <DataGrid />
            <Pager pageOption={pagingOption} onPaging={_handlePaging} />
            {_renderBetListPopup()}
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    const { searchPlayer, setPagingOption, setSelectedPlayer } = ActionCreators;
    return bindActionCreators({ searchPlayer, setPagingOption, setSelectedPlayer }, dispatch);
}
function mapStateToProps(state) {
    const { pagingOption, selectedParams, playerList, selectedTabKey, selectedPlayer } = state;
    const playerCount = pagingOption.TotalItem || (playerList && playerList.length) || 0;
    return Object.assign({}, { pagingOption, selectedParams, playerCount, selectedTabKey, selectedPlayer });
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);