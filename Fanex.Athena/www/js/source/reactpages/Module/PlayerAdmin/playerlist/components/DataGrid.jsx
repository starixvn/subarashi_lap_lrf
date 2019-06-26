import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions/index.js';
import { bindActionCreators } from 'redux';

import { Table, HeaderRow, HeaderCell, Row, Cell } from '@9softstudio/react-grid';
import Switcher from '../../../../components/Switcher';
import { specialLevelListWithColor, oddsGroupListWithStyle } from '../lib/constants';
import ContextMenu from './ContextMenu';
import SpecialLevelDropdown from './SpecialLevelDropdown';
import DropdownLabel from '../../../../components/DropdownLabel';
import { updateObjectInArray } from '../../../../lib/dataReducer';
import OddsGroupDropdown from './OddsGroupDropdown.jsx';

const MAX_WIDTH_PAGE = 1920;

export class DataGrid extends PureComponent {
    constructor(props) {
        super(props);

        this.maxWidth = Math.min(document.body.clientWidth, MAX_WIDTH_PAGE);

        this.state = {
            contextMenuPosition: null,
            isOpenContextMenu: false,
            specialLevelDropdownPosition: null,
            oddsGroupDropdownPosition: null
        }
    }

    _buildDisplayedColumn() {
        const { displayedColumnList } = this.props;

        return displayedColumnList.reduce((accumulator, currentItem) => {
            accumulator[currentItem.key] = currentItem.show;

            return accumulator;
        }, {})
    }

    _renderHeader(displayedColumn) {
        return (
            <HeaderRow style={{ height: 32 }}>
                {/* For Phase 2 */}
                {/* <HeaderCell colWidth={30}><input type="checkbox" /></HeaderCell> */}
                {displayedColumn['Status'] && <HeaderCell colWidth={80}>Status</HeaderCell>}
                {displayedColumn['Username'] && <HeaderCell colWidth={80}>Username</HeaderCell>}
                {displayedColumn['SystemID'] && <HeaderCell colWidth={100}>SystemId</HeaderCell>}
                {displayedColumn['RealName'] && <HeaderCell colWidth={80}>Real Name</HeaderCell>}
                {displayedColumn['Currency'] && <HeaderCell colWidth={60}>Currency</HeaderCell>}
                {displayedColumn['CurrentBalance'] && <HeaderCell colWidth={80}>Current Balance</HeaderCell>}
                {displayedColumn['OutstandingBalance'] && <HeaderCell colWidth={80}>Outstanding Balance</HeaderCell>}
                {displayedColumn['OddsGroup'] && <HeaderCell colWidth={50}>Odds Group</HeaderCell>}
                {displayedColumn['BAStatus'] && <HeaderCell colWidth={50}>BA Status</HeaderCell>}
                {displayedColumn['SpecialLevel'] && <HeaderCell colWidth={50}>Special Level</HeaderCell>}
                {displayedColumn['LastLoginIp'] && <HeaderCell colWidth={60}>Last Login IP</HeaderCell>}
                {displayedColumn['LastTransaction'] && <HeaderCell colWidth={100}>Last Transaction</HeaderCell>}
                {displayedColumn['Email'] && <HeaderCell colWidth={100}>Email</HeaderCell>}
            </HeaderRow>
        )
    }

    _renderDataSection(dataList, displayedColumn) {
        const dataRows = [];
        for (let i = 0; i < dataList.length; i++) {
            const dataItem = dataList[i];
            const isChecked = this.props.selectedPlayerIdList.includes(dataItem.CustId);
            dataRows.push(this._buildDataRow(dataItem, isChecked, displayedColumn));
        }

        return dataRows;
    }

    _handleSelectPlayer = (event, playerInfo) => {
        event.preventDefault();
        const player = {
            custId: playerInfo.CustId,
            userName: playerInfo.UserName,
            currency: playerInfo.Currency
        };

        this.props.setSelectedPlayer(player);
    }

    _handleCheckPlayer = (custId) => {
        const { selectedPlayerIdList } = this.props;
        const newIdList = selectedPlayerIdList.includes(custId) ?
            selectedPlayerIdList.filter(item => item !== custId) : [...selectedPlayerIdList, custId];

        this.props.setSelectedPlayerIdList(newIdList);
    }

    handleEnterContextMenu = (event) => {
        const { isOpenContextMenu } = this.state;
        if (!isOpenContextMenu) {
            var rect = event.target.getBoundingClientRect();
            const position = {
                x: rect.left,
                y: rect.top
            };

            this.setState({
                contextMenuPosition: position,
                isOpenContextMenu: true
            });
        }
    }

    handleLeaveContextMenu = () => {
        window.setTimeout(() => {
            if (this.state.isOpenContextMenu) {
                this.setState({ isOpenContextMenu: false });
            }
        }, 10);
    }

    handleToggleSpecialLevel = () => {
        const { specialLevelDropdownPosition } = this.state;
        if (specialLevelDropdownPosition) {
            this.setState({ specialLevelDropdownPosition: null });
        }
        else {
            var rect = event.target.getBoundingClientRect();
            const position = {
                x: rect.left,
                y: rect.top
            };

            this.setState({ specialLevelDropdownPosition: position });
        }
    }

    handleCloseSpecialLevel = () => {
        this.setState({ specialLevelDropdownPosition: null });
    }

    handleToggleOddsGroup = () => {
        const { oddsGroupDropdownPosition } = this.state;
        if (oddsGroupDropdownPosition) {
            this.setState({ oddsGroupDropdownPosition: null });
        }
        else {
            var rect = event.target.getBoundingClientRect();
            const position = {
                x: rect.left,
                y: rect.top
            };

            this.setState({ oddsGroupDropdownPosition: position });
        }
    }

    handleCloseOddsGroup = () => {
        this.setState({ oddsGroupDropdownPosition: null });
    }

    _buildUserNameCell(dataItem) {
        return (
            <>
                <button className="btn-default btn-link username-link"
                    onClick={(e) => this._handleSelectPlayer(e, dataItem)}>
                    {dataItem.UserName}
                </button>
                <button className="btn-default btn-link btn-icon cell-menu"
                    onMouseEnter={this.handleEnterContextMenu} onMouseLeave={this.handleLeaveContextMenu}>
                    <i className="material-icons">edit</i>
                </button>
            </>
        )
    }

    handleChangeUpdatePlayerItem = (custId, value, fieldName) => {
        const { playerList, setPlayerList } = this.props;
        const itemIndex = playerList.findIndex(x => x.CustId === custId);
        const newPlayerItem = { ...playerList[itemIndex], [fieldName]: value };
        const newPlayerList = updateObjectInArray(playerList, itemIndex, newPlayerItem);

        setPlayerList(newPlayerList);
    }

    handleChangeBaStatus = (custId, value) => {
        this.handleChangeUpdatePlayerItem(custId, value, 'BaStatus');
    }

    handleChangeOddsGroup = (custId, value) => {
        this.handleChangeUpdatePlayerItem(custId, value, 'OddsGroup');
    }

    handleChangeSpecialLevel = (custId, value) => {
        this.handleChangeUpdatePlayerItem(custId, value, 'SpecialLevel');
    }

    _buildOddsGroupCell(dataItem) {
        const value = dataItem.OddsGroup;
        const style = oddsGroupListWithStyle[value];

        return <DropdownLabel text={value} labelStyle={style} onClick={this.handleToggleOddsGroup} />
    }

    _buildSpecialLevelCell(dataItem) {
        const value = dataItem.SpecialLevel;
        const style = { backgroundColor: specialLevelListWithColor[value] };

        return <DropdownLabel text={value === '0' ? 'None' : value} labelStyle={style} onClick={this.handleToggleSpecialLevel} />
    }

    _buildDataRow(dataItem, isChecked, displayedColumn) {
        return (
            <Row key={dataItem.CustId}>
                {/* For Phase 2 */}
                {/* <Cell className="center-align">
                    <input type="checkbox" checked={isChecked} onChange={() => this._handleCheckPlayer(dataItem.CustId)} />
                </Cell> */}
                {displayedColumn['Status'] && <Cell className="center-align">{dataItem.Status}</Cell>}
                {displayedColumn['Username'] && <Cell className="center-align">{this._buildUserNameCell(dataItem)}</Cell>}
                {displayedColumn['SystemID'] && <Cell className="center-align">{dataItem.SystemId}</Cell>}
                {displayedColumn['RealName'] && <Cell className="center-align">{dataItem.RealName}</Cell>}
                {displayedColumn['Currency'] && <Cell className="center-align">{dataItem.Currency}</Cell>}
                {displayedColumn['CurrentBalance'] && <Cell className="center-align">{dataItem.CurrentBalance}</Cell>}
                {displayedColumn['OutstandingBalance'] && <Cell className="center-align">{dataItem.OutstandingBalance}</Cell>}
                {displayedColumn['OddsGroup'] && <Cell className="center-align">{this._buildOddsGroupCell(dataItem)}</Cell>}
                {
                    displayedColumn['BAStatus'] &&
                    <Cell className="center-align">
                        <Switcher checked={dataItem.BaStatus} onChange={(e) => this.handleChangeBaStatus(dataItem.CustId, e.target.checked)} />
                    </Cell>
                }
                {displayedColumn['SpecialLevel'] && <Cell className="center-align">{this._buildSpecialLevelCell(dataItem)}</Cell>}
                {displayedColumn['LastLoginIp'] && <Cell className="center-align">{dataItem.LastLoginIp}</Cell>}
                {displayedColumn['LastTransaction'] && <Cell className="center-align">{dataItem.LastTransaction}</Cell>}
                {displayedColumn['Email'] && <Cell className="center-align">{dataItem.Email}</Cell>}
            </Row>
        )
    }

    render() {
        const { playerList, selectedPlayer } = this.props;
        const { contextMenuPosition, isOpenContextMenu, specialLevelDropdownPosition, oddsGroupDropdownPosition } = this.state;
        const dataList = selectedPlayer ? [playerList.find(item => item.CustId === selectedPlayer.custId)] : playerList;
        const displayedColumn = this._buildDisplayedColumn();

        return (
            <>
                <Table minWidth={650}
                    autoWidth={true}
                    maxWidth={this.maxWidth}
                    autoHeight={false}
                    bodyHeight={300}
                    adjustedHeight={32}
                    header={this._renderHeader(displayedColumn)}
                    body={this._renderDataSection(dataList, displayedColumn)}
                    containerPadding={30} />
                <ContextMenu isOpenContextMenu={isOpenContextMenu} position={contextMenuPosition} />
                <SpecialLevelDropdown position={specialLevelDropdownPosition} onClose={this.handleCloseSpecialLevel} />
                <OddsGroupDropdown position={oddsGroupDropdownPosition} onClose={this.handleCloseOddsGroup} />
            </>
        );
    }
}

function mapDispatchToProps(dispatch) {
    const { setSelectedPlayer, setSelectedPlayerIdList, setPlayerList } = ActionCreators;
    return bindActionCreators({ setSelectedPlayer, setSelectedPlayerIdList, setPlayerList }, dispatch);
}

function mapStateToProps(state) {
    const { playerList, selectedPlayer, selectedPlayerIdList, displayedColumnList, type } = state;
    return Object.assign({}, { playerList, selectedPlayer, selectedPlayerIdList, displayedColumnList, type });
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);