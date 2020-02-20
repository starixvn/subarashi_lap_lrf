import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Table } from '@9softstudio/react-grid';
import PlayerRow from './grid/PlayerRow';
import NoDataTitle from '@jsroot/components/NoDataTitle';
import GridHelper from '../../../lib/helpers/gridHelper';

const dataHeaders = [
    { key: 'externalId', text: 'External Id', sortBy: 'ExternalId', colWidth: 100 },
    { key: 'systemId', text: 'System Id', sortBy: 'SystemId', colWidth: 100 },
    { key: 'markDate', text: 'Mark Date', sortBy: 'MarkDate', colWidth: 100 },
    { key: 'vip', text: 'VIP', sortBy: 'vip', colWidth: 100 },
]

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
                dataItem,
                onClick: () => {
                    alert(dataItem.ExternalId)
                }
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
            </React.Fragment>
        );
    }
}

function mapDispatchToProps(dispatch) {
    const { setPlayerList } = ActionCreators;
    return bindActionCreators({ setPlayerList }, dispatch);
}

function mapStateToProps(state) {
    const { playerList } = state;
    return Object.assign({}, { playerList });
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);