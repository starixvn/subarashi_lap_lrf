import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions/index.js';
import { bindActionCreators } from 'redux';

import { Table, HeaderRow, HeaderCell, Row, Cell } from '@9softstudio/react-grid';
import Switcher from '../../../../components/Switcher';
import { specialLevelListWithColor, oddsGroupListWithStyle } from '../lib/constants';
import ContextMenu from './ContextMenu';

const MAX_WIDTH_PAGE = 1920;

export class DataGrid extends PureComponent {
    constructor(props) {
        super(props);

        this.maxWidth = Math.min(document.body.clientWidth, MAX_WIDTH_PAGE);

        this.state = {
            contextMenuPosition: null,
            isOpenContextMenu: false
        }

        this.specialLevelList = Object.keys(specialLevelListWithColor).map(item => {
            return {
                value: item,
                label: item === '0' ? 'None' : item
            }
        })
    }

    _buildDisplayedColumn(){
        const {displayedColumnList} = this.props;

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
                {displayedColumn['Currency'] && <HeaderCell colWidth={60}>Currency</HeaderCell>}
                {displayedColumn['CurrentBalance'] && <HeaderCell colWidth={80}>Current Balance</HeaderCell>}
                {displayedColumn['OutstandingBalance'] && <HeaderCell colWidth={80}>Outstanding Balance</HeaderCell>}
                {displayedColumn['OddsGroup'] && <HeaderCell colWidth={50}>Odds Group</HeaderCell>}
                {displayedColumn['BAStatus'] && <HeaderCell colWidth={50}>BA Status</HeaderCell>}
                {displayedColumn['SpecialLevel'] && <HeaderCell colWidth={50}>Special Level</HeaderCell>}
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

    _handleChangeBaStatus = (e) => {
        console.log(e.target)
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

    _buildOddsGroupCell(selectedOddsGroup) {
        return (
            <select className="select-default select-oddsgroup" value={selectedOddsGroup} onChange={(e) => console.log(e)}>
                {
                    Object.keys(oddsGroupListWithStyle).map(item => {
                        return (<option key={item} style={oddsGroupListWithStyle[item]}>{item}</option>)
                    })
                }
            </select>
        )
    }

    _buildSpecialLevelCell(selectedSpecialLevel) {
        return (
            <select className="select-default select-special-level" value={selectedSpecialLevel} onChange={(e) => console.log(e)}>
                {this.specialLevelList.map(item => {
                    const style = { backgroundColor: specialLevelListWithColor[item.value] };

                    return (<option key={item.value} style={style}>{item.label}</option>)
                })}
            </select>
        )
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
                {displayedColumn['Currency'] && <Cell className="center-align">{dataItem.Currency}</Cell>}
                {displayedColumn['CurrentBalance'] && <Cell className="center-align">{dataItem.CurrentBalance}</Cell>}
                {displayedColumn['OutstandingBalance'] && <Cell className="center-align">{dataItem.OutstandingBalance}</Cell>}
                {displayedColumn['OddsGroup'] && <Cell className="center-align">{this._buildOddsGroupCell(dataItem.OddsGroup)}</Cell>}
                {displayedColumn['BAStatus'] && <Cell className="center-align"><Switcher defaultChecked={dataItem.BaStatus} onChange={this._handleChangeBaStatus} /></Cell>}
                {displayedColumn['SpecialLevel'] && <Cell className="center-align">{this._buildSpecialLevelCell(dataItem.SpecialLevel)}</Cell>}
                {displayedColumn['LastTransaction'] && <Cell className="center-align">{dataItem.LastTransaction}</Cell>}
                {displayedColumn['Email'] && <Cell className="center-align">{dataItem.Email}</Cell>}
            </Row>
        )
    }

    render() {
        const { playerList, selectedPlayer } = this.props;
        const { contextMenuPosition, isOpenContextMenu } = this.state;
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
            </>
        );
    }
}

function mapDispatchToProps(dispatch) {
    const { setSelectedPlayer, setSelectedPlayerIdList } = ActionCreators;
    return bindActionCreators({ setSelectedPlayer, setSelectedPlayerIdList }, dispatch);
}

function mapStateToProps(state) {
    const { playerList, selectedPlayer, selectedPlayerIdList, displayedColumnList } = state;
    return Object.assign({}, { playerList, selectedPlayer, selectedPlayerIdList, displayedColumnList });
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);