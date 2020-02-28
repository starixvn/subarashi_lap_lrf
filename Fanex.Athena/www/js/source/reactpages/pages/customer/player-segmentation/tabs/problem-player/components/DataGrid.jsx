import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table } from '@9softstudio/react-grid';
import { ActionCreators } from '../actions';
import PlayerRow from './grid/PlayerRow';
import NoDataTitle from '@jsroot/components/NoDataTitle';
import GridHelper from '../../../lib/helpers/gridHelper';
import { dataGridHeaders } from '../lib/constants';

const MAX_WIDTH_PAGE = 1920;

export const DataGrid = (props) => {
    const MAX_WIDTH = Math.min(document.body.clientWidth, MAX_WIDTH_PAGE);
    const { playerList, pagingOption, selectedParams, selectedTabKey, setPagingOption, searchPlayer } = props;

    if (playerList == null) {
        return null;
    }
    if (!playerList.length) {
        return <NoDataTitle />;
    }

    const _renderDataSection = dataList => dataList.map((dataItem, index) => {
        return <PlayerRow {...{ dataItem, index }} />
    })

    const _handleSort = (orderCol, sortType) => {
        const sortInfo = GridHelper.getSortInfo(orderCol, sortType);
        const _pagingOption = {
            ...pagingOption,
            ...sortInfo
        }
        const params = {
            ...selectedParams,
            ..._pagingOption
        }
        searchPlayer(selectedTabKey, params, GridHelper.callBackToUpdatePaging({ pagingOption, setPagingOption }));
    }


    return (
        <React.Fragment>
            <Table minWidth={650}
                autoWidth={true}
                maxWidth={MAX_WIDTH}
                autoHeight={true}
                header={GridHelper.renderHeader(dataGridHeaders)}
                body={_renderDataSection(playerList)}
                containerPadding={30}
                shouldResetScrollPosition={false}
                onSort={_handleSort} />
        </React.Fragment>
    );
}

function mapDispatchToProps(dispatch) {
    const { searchPlayer, setPagingOption } = ActionCreators;
    return bindActionCreators({ setPagingOption, searchPlayer }, dispatch);
}

function mapStateToProps(state) {
    const { playerList, selectedParams, selectedTabKey, pagingOption } = state;
    return Object.assign({}, { playerList, pagingOption, selectedParams, selectedTabKey });
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(DataGrid));


