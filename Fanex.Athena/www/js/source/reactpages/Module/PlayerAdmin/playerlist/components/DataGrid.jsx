import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';

import { Table } from '@9softstudio/react-grid';
import ContextMenu from './grid/ContextMenu';
import SpecialLevelDropdown from './grid/SpecialLevelDropdown';
import GridHelper from '../lib/gridHelper';
import OddsGroupDropdown from './grid/OddsGroupDropdown';
import PlayerRow from './grid/PlayerRow';
import StatusDropdown from './grid/StatusDropdown';
import { buildDisplayedColumnObject } from '../lib/utils';

const MAX_WIDTH_PAGE = 1920;

export class DataGrid extends PureComponent {
    constructor(props) {
        super(props);

        this.maxWidth = Math.min(document.body.clientWidth, MAX_WIDTH_PAGE);
    }

    _renderDataSection(dataList, displayedColumn) {
        const dataRows = [];
        for (let i = 0; i < dataList.length; i++) {
            const dataItem = dataList[i];
            const rowProps = {
                dataItem,
                displayedColumn
            }
            dataRows.push(<PlayerRow key={dataItem.CustId} {...rowProps} />);
        }

        return dataRows;
    }

    handleSort = (sortBy, sortOrder) => {
        console.log(sortBy, sortOrder);
        const { playerList, setPlayerList } = this.props;
        const sortedPlayerList = GridHelper.sortPlayerList(playerList, sortBy, sortOrder);
        setPlayerList(sortedPlayerList);
    }

    render() {
        const { playerList, selectedPlayer, isFetchingData, displayedColumnList } = this.props;
        if (!playerList) {
            return null;
        }

        const dataList = selectedPlayer ? [playerList.find(item => item.CustId === selectedPlayer.custId)] : playerList;
        const displayedColumn = buildDisplayedColumnObject(displayedColumnList);

        return (
            <>
                <Table minWidth={650}
                    autoWidth={true}
                    maxWidth={this.maxWidth}
                    autoHeight={true}
                    header={GridHelper.renderHeader(displayedColumn)}
                    body={this._renderDataSection(dataList, displayedColumn)}
                    containerPadding={30}
                    shouldResetScrollPosition={isFetchingData}
                    onSort={this.handleSort} />
                <ContextMenu />
                <SpecialLevelDropdown />
                <OddsGroupDropdown />
                <StatusDropdown />
            </>
        );
    }
}

function mapDispatchToProps(dispatch) {
    const { setPlayerList } = ActionCreators;
    return bindActionCreators({ setPlayerList }, dispatch);
}

function mapStateToProps(state) {
    const { playerList, selectedPlayer, displayedColumnList, isFetchingData } = state;
    return Object.assign({}, { playerList, selectedPlayer, displayedColumnList, isFetchingData });
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);