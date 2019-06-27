import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';

import { Row, Cell } from '@9softstudio/react-grid';
import Switcher from '../../../../../components/Switcher';

import UserNameCell from './UserNameCell';
import OddsGroupCell from './OddsGroupCell';
import SpecialLevelCell from './SpecialLevelCell';

const PlayerRow = (props) => {
    const { 
        dataItem, 
        isChecked, 
        displayedColumn, 
        handleChangeBaStatus, 
        handleEnterContextMenu, 
        handleLeaveContextMenu,
        handleToggleOddsGroup,
        handleToggleSpecialLevel,
        setCurrentActivePlayer
    } = props;

    const userNameProps = {
        dataItem: dataItem,
        handleEnterContextMenu,
        handleLeaveContextMenu
    }

    const oddsGroupProps = {
        value: dataItem.OddsGroup,
        handleToggleOddsGroup: (e) => {
            handleToggleOddsGroup(e);
            setCurrentActivePlayer({custId: dataItem.CustId});
        }
    }

    const specialProps = {
        value: dataItem.SpecialLevel,
        handleToggleSpecialLevel: (e) => {
            handleToggleSpecialLevel(e);
            setCurrentActivePlayer({custId: dataItem.CustId});
        }
    }

    // handleCheckPlayer = (custId) => {
    //     const { selectedPlayerIdList } = this.props;
    //     const newIdList = selectedPlayerIdList.includes(custId) ?
    //         selectedPlayerIdList.filter(item => item !== custId) : [...selectedPlayerIdList, custId];

    //     this.props.setSelectedPlayerIdList(newIdList);
    // }

    return (
        <Row key={dataItem.CustId}>
            {/* For Phase 2 */}
            {/* <Cell className="center-align">
                    <input type="checkbox" checked={isChecked} onChange={() => handleCheckPlayer(dataItem.CustId)} />
                </Cell> */}
            {displayedColumn['Status'] && <Cell className="center-align">{dataItem.Status}</Cell>}
            {displayedColumn['Username'] && <Cell className="center-align"><UserNameCell {...userNameProps} /></Cell>}
            {displayedColumn['SystemID'] && <Cell className="center-align">{dataItem.SystemId}</Cell>}
            {displayedColumn['RealName'] && <Cell className="center-align">{dataItem.RealName}</Cell>}
            {displayedColumn['Currency'] && <Cell className="center-align">{dataItem.Currency}</Cell>}
            {displayedColumn['CurrentBalance'] && <Cell className="center-align">{dataItem.CurrentBalance}</Cell>}
            {displayedColumn['OutstandingBalance'] && <Cell className="center-align">{dataItem.OutstandingBalance}</Cell>}
            {displayedColumn['OddsGroup'] && <Cell className="center-align"><OddsGroupCell {...oddsGroupProps} /></Cell>}
            {
                displayedColumn['BAStatus'] &&
                <Cell className="center-align">
                    <Switcher checked={dataItem.BaStatus} onChange={(e) => handleChangeBaStatus(dataItem.CustId, e.target.checked)} />
                </Cell>
            }
            {displayedColumn['SpecialLevel'] && <Cell className="center-align"><SpecialLevelCell {...specialProps} /></Cell>}
            {displayedColumn['LastLoginIp'] && <Cell className="center-align">{dataItem.LastLoginIp}</Cell>}
            {displayedColumn['LastTransaction'] && <Cell className="center-align">{dataItem.LastTransaction}</Cell>}
            {displayedColumn['Email'] && <Cell className="center-align">{dataItem.Email}</Cell>}
        </Row>
    )
}

function mapDispatchToProps(dispatch) {
    const { setSelectedPlayer, setCurrentActivePlayer } = ActionCreators;
    return bindActionCreators({ setSelectedPlayer, setCurrentActivePlayer }, dispatch);
}

export default connect(null, mapDispatchToProps)(React.memo(PlayerRow));