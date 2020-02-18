import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Table } from '@9softstudio/react-grid';
import PlayerRow from './grid/PlayerRow';
import NoDataTitle from '@jsroot/components/NoDataTitle';
import SweetAlert from '@jsroot/components/sweet-alert';

import { HeaderRow, HeaderCell } from '@9softstudio/react-grid';

const dataHeaders = [
    { key: 'externalId', text: 'External Id', sortBy: 'ExternalId', colWidth: 100 },
    { key: 'systemId', text: 'System Id', sortBy: 'SystemId', colWidth: 100 },
    { key: 'markDate', text: 'Mark Date', sortBy: 'MarkDate', colWidth: 100 },
    { key: 'vip', text: 'VIP', sortBy: 'vip', colWidth: 100 },
]

class GridHelper {
    static renderHeader(dataHeaders) {
        return (
            <HeaderRow style={{ height: 32 }}>
                {dataHeaders && dataHeaders.length > 0 &&
                 dataHeaders.map(_ => 
                 <HeaderCell colWidth={_.colWidth} sortBy={_.sortBy}>
                     {_.childComponent ? _.childComponent : _.text}
                 </HeaderCell>)}
            </HeaderRow>
        )
    }

    static calculateTopPosition(dropdownHeight = 0, currentTop) {
        const innerHeight = window.innerHeight;
        const expectedHeight = dropdownHeight + currentTop + 20;
        return expectedHeight > innerHeight ? currentTop - dropdownHeight : currentTop;
    }
}




const MAX_WIDTH_PAGE = 1920;

export class DataGrid extends PureComponent {
    constructor(props) {
        super(props);
        this.maxWidth = Math.min(document.body.clientWidth, MAX_WIDTH_PAGE);
    }

    _renderDataSection(dataList) {
        const dataRows = [];
        for (let i = 0; i < dataList.length; i++) {
            const dataItem = dataList[i];
            const rowProps = {
                dataItem
            }
            dataRows.push(<PlayerRow key={`player_row_${dataItem.ExternalId}_${dataItem.SystemId}`} {...rowProps} />);
        }

        return dataRows;
    }

    _handleSort = (sortBy, sortOrder) => {
        const { playerList, setPlayerList } = this.props;
        //const sortedPlayerList = GridInteractionService.sortPlayerList(playerList, sortBy, sortOrder);
        const sortedPlayerList = playerList
        setPlayerList(sortedPlayerList);
    }

    render() {
        const { playerList, sweetAlertOption } = this.props;
        if (!playerList) {
            return null;
        }

        if (!playerList.length) {
            return <NoDataTitle />;
        }

        return (
            <React.Fragment>
                <Table minWidth={650}
                    autoWidth={true}
                    maxWidth={this.maxWidth}
                    autoHeight={true}
                    header={GridHelper.renderHeader(dataHeaders)}
                    body={this._renderDataSection(playerList)}
                    containerPadding={30}
                    shouldResetScrollPosition={true}
                    onSort={this._handleSort} />
                {sweetAlertOption && <SweetAlert {...sweetAlertOption} />}
            </React.Fragment>
        );
    }
}

function mapDispatchToProps(dispatch) {
    const { setPlayerList } = ActionCreators;
    return bindActionCreators({ setPlayerList }, dispatch);
}

function mapStateToProps(state) {
    const { playerList, sweetAlertOption } = state;
    return Object.assign({}, { playerList, sweetAlertOption });
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);