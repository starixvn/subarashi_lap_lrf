import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Table } from '@9softstudio/react-grid';
import CheckBox from '@jsroot/components/CheckBox'
import PlayerRow from './grid/PlayerRow';
import NoDataTitle from '@jsroot/components/NoDataTitle';
import GridHelper from '../../../lib/helpers/gridHelper';

const MAX_WIDTH_PAGE = 1920;

export class DataGrid extends PureComponent {
    constructor(props) {
        super(props);
        this.maxWidth = Math.min(document.body.clientWidth, MAX_WIDTH_PAGE);
    }

    _getDataHeaders() {
        const { isCheckAll, playerList, setPlayerList } = this.props;
        return [
            { key: 'externalId1', text: 'External Id1', colWidth: 100, childComponent: <CheckBox id="IsCheckAll"
            checked={isCheckAll}
            onChange={(checked) => {
                    playerList.forEach(_ => {
                        _.isSelected = checked;
                    });
                    setPlayerList([...playerList]);
            }} />
         },
            { key: 'externalId', text: 'External Id', sortBy: 'ExternalId', colWidth: 100 },
            { key: 'systemId', text: 'System Id', sortBy: 'SystemId', colWidth: 100 },
            { key: 'vip', text: 'VIP', colWidth: 100 },
        ]
    }

    _renderDataSection(dataList) {
        return dataList.map(dataItem => {
            const rowProps = {
                dataItem,
                onClick: () => {
                    alert(dataItem.ExternalId)
                }
            }
            return <PlayerRow key={`player_row_${dataItem.ExternalId}_${dataItem.SystemId}`} {...rowProps} />
        })
    }

    _handleSort = (sortBy, sortOrder) => {
        const { playerList, setPlayerList } = this.props;
        //const sortedPlayerList = GridInteractionService.sortPlayerList(playerList, sortBy, sortOrder);
        const sortedPlayerList = playerList
        setPlayerList(sortedPlayerList);
    }

    render() {
        const { playerList } = this.props;
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
                    header={GridHelper.renderHeader(this._getDataHeaders())}
                    body={this._renderDataSection(playerList)}
                    containerPadding={30}
                    shouldResetScrollPosition={false}
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
    const isCheckAll = !playerList.some(_ => !_.isSelected);
    return Object.assign({}, { playerList, isCheckAll });
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);