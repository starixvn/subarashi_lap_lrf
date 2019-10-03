import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';

import { Table } from '@9softstudio/react-grid';
import ContextMenu from './grid/ContextMenu';
import SpecialLevelDropdown from './grid/SpecialLevelDropdown';
import GridHelper from '../lib/helpers/gridHelper';
import GridInteractionService from '../lib/services/gridInteractionService';
import OddsGroupDropdown from './grid/OddsGroupDropdown';
import PlayerRow from './grid/PlayerRow';
import StatusDropdown from './grid/StatusDropdown';
import { buildDisplayedColumnObject } from '../lib/helpers/utils';
import NoDataTitle from '@jsroot/components/NoDataTitle';
import SweetAlert from '../../../../components/sweet-alert';

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
            dataRows.push(<PlayerRow key={dataItem.LicenseeCustId} {...rowProps} />);
        }

        return dataRows;
    }

    handleSort = (sortBy, sortOrder) => {
        const { playerList, setPlayerList } = this.props;
        const sortedPlayerList = GridInteractionService.sortPlayerList(playerList, sortBy, sortOrder);
        setPlayerList(sortedPlayerList);
    }

    render() {
        const { playerList, selectedPlayer, isFetchingData, displayedColumnList, sweetAlertOption } = this.props;
        if (!playerList) {
            return null;
        }

        if (!playerList.length) {
            return <NoDataTitle />;
        }

        const dataList = selectedPlayer ? [playerList.find(item => item.LicenseeCustId === selectedPlayer.licenseeCustId)] : playerList;
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
                { sweetAlertOption && <SweetAlert {...sweetAlertOption} />}
            </>
        );
    }
}

function mapDispatchToProps(dispatch) {
    const { setPlayerList } = ActionCreators;
    return bindActionCreators({ setPlayerList }, dispatch);
}

function mapStateToProps(state) {
    const { playerList, selectedPlayer, displayedColumnList, isFetchingData, sweetAlertOption } = state;
    return Object.assign({}, { playerList, selectedPlayer, displayedColumnList, isFetchingData, sweetAlertOption });
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);