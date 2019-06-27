import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions/index.js';
import { bindActionCreators } from 'redux';

import { Table } from '@9softstudio/react-grid';
import ContextMenu from './ContextMenu';
import SpecialLevelDropdown from './SpecialLevelDropdown';
import { updateObjectInArray } from '../../../../lib/dataReducer';
import GridHelper from '../lib/gridHelper';
import OddsGroupDropdown from './OddsGroupDropdown.jsx';
import PlayerRow from './grid/PlayerRow.jsx';

const MAX_WIDTH_PAGE = 1920;

export class DataGrid extends PureComponent {
    constructor(props) {
        super(props);

        this.maxWidth = Math.min(document.body.clientWidth, MAX_WIDTH_PAGE);

        this.state = {
            isOpenContextMenu: false,
            contextMenuPosition: null,
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

    _renderDataSection(dataList, displayedColumn) {
        const dataRows = [];
        for (let i = 0; i < dataList.length; i++) {
            const dataItem = dataList[i];
            const isChecked = this.props.selectedPlayerIdList.includes(dataItem.CustId);
            const rowProps = {
                dataItem,
                isChecked,
                displayedColumn,
                handleChangeBaStatus: this.handleChangeBaStatus,
                handleEnterContextMenu: this.handleEnterContextMenu,
                handleLeaveContextMenu: this.handleLeaveContextMenu,
                handleToggleOddsGroup: this.handleToggleOddsGroup,
                handleToggleSpecialLevel: this.handleToggleSpecialLevel
            }
            dataRows.push(<PlayerRow key={dataItem.CustId} {...rowProps} />);
        }

        return dataRows;
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

    _handlerToggleDropdownLabel(event, stateName) {
        const currentPosition = this.state[stateName];
        if (currentPosition) {
            this.setState({ [stateName]: null });
        }
        else {
            var rect = event.target.getBoundingClientRect();
            const position = {
                x: rect.left,
                y: rect.top
            };

            this.setState({ [stateName]: position });
        }
    }

    handleToggleSpecialLevel = (event) => {
        this._handlerToggleDropdownLabel(event, 'specialLevelDropdownPosition');
    }

    handleToggleOddsGroup = (event) => {
        this._handlerToggleDropdownLabel(event, 'oddsGroupDropdownPosition');
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

    handleChangeOddsGroup = (event, value) => {
        event.preventDefault();
        const { currentActivePlayer } = this.props;
        if (currentActivePlayer) {
            this.handleChangeUpdatePlayerItem(currentActivePlayer.custId, value, 'OddsGroup');
            this.handleToggleOddsGroup();
        }
    }

    handleChangeSpecialLevel = (event, value) => {
        event.preventDefault();
        const { currentActivePlayer } = this.props;
        if (currentActivePlayer) {
            this.handleChangeUpdatePlayerItem(currentActivePlayer.custId, value, 'SpecialLevel');
            this.handleToggleSpecialLevel();
        }
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
                    header={GridHelper.renderHeader(displayedColumn)}
                    body={this._renderDataSection(dataList, displayedColumn)}
                    containerPadding={30} />
                <ContextMenu isOpenContextMenu={isOpenContextMenu} position={contextMenuPosition} />
                <SpecialLevelDropdown position={specialLevelDropdownPosition} 
                    onClose={this.handleToggleSpecialLevel} onChange={this.handleChangeSpecialLevel} />
                <OddsGroupDropdown position={oddsGroupDropdownPosition} 
                    onClose={this.handleToggleOddsGroup} onChange={this.handleChangeOddsGroup} />
            </>
        );
    }
}

function mapDispatchToProps(dispatch) {
    const { setSelectedPlayerIdList, setPlayerList, setCurrentActivePlayer } = ActionCreators;
    return bindActionCreators({ setSelectedPlayerIdList, setPlayerList, setCurrentActivePlayer }, dispatch);
}

function mapStateToProps(state) {
    const { playerList, selectedPlayer, selectedPlayerIdList, displayedColumnList, currentActivePlayer } = state;
    return Object.assign({}, { playerList, selectedPlayer, selectedPlayerIdList, displayedColumnList, currentActivePlayer });
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);