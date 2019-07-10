import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions/index.js';
import { bindActionCreators } from 'redux';

import LangHelper from '@jsroot/lib/langHelper';
import { gridItemDropdownHeight } from '../lib/constants';
import { Table } from '@9softstudio/react-grid';
import ContextMenu from './grid/ContextMenu';
import SpecialLevelDropdown from './grid/SpecialLevelDropdown';
import { updateObjectInArray } from '@jsroot/lib/dataReducer';
import GridHelper from '../lib/gridHelper';
import OddsGroupDropdown from './grid/OddsGroupDropdown.jsx';
import PlayerRow from './grid/PlayerRow.jsx';
import StatusDropdown from './grid/StatusDropdown';

const MAX_WIDTH_PAGE = 1920;

export class DataGrid extends PureComponent {
    constructor(props) {
        super(props);

        this.maxWidth = Math.min(document.body.clientWidth, MAX_WIDTH_PAGE);

        this.state = {
            isOpenContextMenu: false,
            contextMenuPosition: null,
            specialLevelDropdownPosition: null,
            oddsGroupDropdownPosition: null,
            statusDropdownPosition: null,
            shouldResetScrollPosition: false
        }
    }

    componentDidUpdate(prevProp) {
        if (prevProp.playerList !== this.props.playerList) {
            this.setState({ shouldResetScrollPosition: true });
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
                handleToggleSpecialLevel: this.handleToggleSpecialLevel,
                handleToggleStatus: this.handleToggleStatus
            }
            dataRows.push(<PlayerRow key={dataItem.CustId} {...rowProps} />);
        }

        return dataRows;
    }

    handleEnterContextMenu = (event) => {
        const { isOpenContextMenu } = this.state;
        if (!isOpenContextMenu) {
            const contextMenuHeight = 140;
            const rect = event.target.getBoundingClientRect();
            const position = {
                x: rect.left,
                y: GridHelper.calculateTopPosition(contextMenuHeight, rect.top)
            };

            this.setState({
                contextMenuPosition: position,
                isOpenContextMenu: true,
                shouldResetScrollPosition: false
            });
        }
    }

    handleLeaveContextMenu = () => {
        window.setTimeout(() => {
            if (this.state.isOpenContextMenu) {
                this.setState({
                    isOpenContextMenu: false,
                    shouldResetScrollPosition: false
                });
            }
        }, 10);
    }

    _handlerToggleDropdownLabel(event, stateName) {
        const currentPosition = this.state[stateName];
        if (currentPosition) {
            this.setState({
                [stateName]: null,
                shouldResetScrollPosition: false
            });
        }
        else {
            const dropdownItemName = stateName.replace('Position', '');
            const dropdownHeight = gridItemDropdownHeight[dropdownItemName];
            const rect = event.target.getBoundingClientRect();
            const position = {
                x: rect.left,
                y: GridHelper.calculateTopPosition(dropdownHeight, rect.top + 20)
            };

            this.setState({
                [stateName]: position,
                shouldResetScrollPosition: false
            });
        }
    }

    handleToggleSpecialLevel = (event) => {
        this._handlerToggleDropdownLabel(event, 'specialLevelDropdownPosition');
    }

    handleToggleOddsGroup = (event) => {
        this._handlerToggleDropdownLabel(event, 'oddsGroupDropdownPosition');
    }

    handleToggleStatus = (event) => {
        this._handlerToggleDropdownLabel(event, 'statusDropdownPosition');
    }

    handleChangeUpdatePlayerItem = (custId, value, fieldName) => {
        const { playerList, setPlayerList } = this.props;
        const itemIndex = playerList.findIndex(x => x.CustId === custId);
        const newPlayerItem = { ...playerList[itemIndex], [fieldName]: value };
        const newPlayerList = updateObjectInArray(playerList, itemIndex, newPlayerItem);

        setPlayerList(newPlayerList);
    }

    handleChangeBaStatus = (custId, checked) => {
        const resourceName = checked ? 'AlertTurnOnBAMsg' : 'AlertTurnOffBAMsg';
        const confirmMessage = LangHelper.getSingleResource(resourceName);
        if (!window.confirm(confirmMessage)) {
            return;
        }

        const param = {
            custId,
            isBa: checked
        }
        this.props.updateBaStatus(param).then(response => {
            const result = response.data;
            if (result.Success) {
                this.handleChangeUpdatePlayerItem(custId, checked, 'BaStatus');
            }
            else {
                window.alert(result.Message);
            }
        })
    }

    _handleChangeDropdownValue = (event, value, fieldName, onChangeSuccess) => {
        event.preventDefault();
        const { currentActivePlayer } = this.props;
        this.handleChangeUpdatePlayerItem(currentActivePlayer.custId, value, fieldName);
        onChangeSuccess();
    }

    handleChangeOddsGroup = (event, value) => {
        const confirmMessage = LangHelper.getSingleResource('AlertSetOddsGroupForCustomerMsg').replace('{0}', value);
        if (!window.confirm(confirmMessage)) {
            return;
        }

        const { currentActivePlayer } = this.props;
        if (currentActivePlayer) {
            const param = {
                custId: currentActivePlayer.custId,
                oddsGroup: value
            }

            this.props.updateOddsGroup(param).then(response => {
                const result = response.data;
                if (result.Success) {
                    this._handleChangeDropdownValue(event, value, 'OddsGroup', this.handleToggleOddsGroup);
                }
                else {
                    window.alert(result.ErrorMessage);
                }
            })
        }
    }

    handleChangeSpecialLevel = (event, value) => {
        const resourceName = Number(value) === 0 ? 'AlertRemoveSpecialLevelForCustomerMsg' : 'AlertSetSpecialLevelForCustomerMsg';
        const confirmMessage = LangHelper.getSingleResource(resourceName);
        if (!window.confirm(confirmMessage)) {
            return;
        }

        const { currentActivePlayer } = this.props;
        if (currentActivePlayer) {
            const param = {
                custId: currentActivePlayer.custId,
                specialLevel: value
            }

            this.props.updateSpecialLevel(param).then(response => {
                const result = response.data;
                if (result.Success) {
                    this._handleChangeDropdownValue(event, value, 'SpecialLevel', this.handleToggleSpecialLevel);
                }
                else {
                    window.alert(result.ErrorMessage);
                }
            })
        }
    }

    handleChangeStatus = (event, value) => {
        this._handleChangeDropdownValue(event, value, 'Status', this.handleToggleStatus);
    }

    handleGridItem = () => {
        this.setState({ shouldResetScrollPosition: false });
    }

    render() {
        const { playerList, selectedPlayer } = this.props;
        const {
            contextMenuPosition,
            isOpenContextMenu,
            specialLevelDropdownPosition,
            oddsGroupDropdownPosition,
            statusDropdownPosition,
            shouldResetScrollPosition
        } = this.state;
        const dataList = selectedPlayer ? [playerList.find(item => item.CustId === selectedPlayer.custId)] : playerList;
        const displayedColumn = this._buildDisplayedColumn();

        return (
            <>
                <Table minWidth={650}
                    autoWidth={true}
                    maxWidth={this.maxWidth}
                    autoHeight={true}
                    header={GridHelper.renderHeader(displayedColumn)}
                    body={this._renderDataSection(dataList, displayedColumn)}
                    containerPadding={30}
                    shouldResetScrollPosition={shouldResetScrollPosition} />
                <ContextMenu isOpenContextMenu={isOpenContextMenu} position={contextMenuPosition} onToggle={this.handleGridItem} />
                <SpecialLevelDropdown position={specialLevelDropdownPosition}
                    onClose={this.handleToggleSpecialLevel} onChange={this.handleChangeSpecialLevel} />
                <OddsGroupDropdown position={oddsGroupDropdownPosition}
                    onClose={this.handleToggleOddsGroup} onChange={this.handleChangeOddsGroup} />
                <StatusDropdown position={statusDropdownPosition}
                    onClose={this.handleToggleStatus} onChange={this.handleChangeStatus} />
            </>
        );
    }
}

function mapDispatchToProps(dispatch) {
    const { setSelectedPlayerIdList, setPlayerList, updateBaStatus, updateOddsGroup, updateSpecialLevel } = ActionCreators;
    return bindActionCreators({
        setSelectedPlayerIdList,
        setPlayerList,
        updateBaStatus,
        updateOddsGroup,
        updateSpecialLevel
    }, dispatch);
}

function mapStateToProps(state) {
    const { playerList, selectedPlayer, selectedPlayerIdList, displayedColumnList, currentActivePlayer } = state;
    return Object.assign({}, { playerList, selectedPlayer, selectedPlayerIdList, displayedColumnList, currentActivePlayer });
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);