import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';

import { Row, Cell } from '@9softstudio/react-grid';
import Switcher from '@jsroot/components/Switcher';
import NumberFormat from '@jsroot/lib/numberFormat';

import UserNameCell from './UserNameCell';
import OddsGroupCell from './OddsGroupCell';
import SpecialLevelCell from './SpecialLevelCell';
import StatusCell from './StatusCell';

export const PlayerRow = (props) => {
    const {
        dataItem,
        isChecked,
        displayedColumn,
        handleChangeBaStatus,
        handleEnterContextMenu,
        handleLeaveContextMenu,
    } = props;

    const userNameProps = {
        dataItem: dataItem,
        handleEnterContextMenu,
        handleLeaveContextMenu
    }

    // handleCheckPlayer = (custId) => {
    //     const { selectedPlayerIdList } = this.props;
    //     const newIdList = selectedPlayerIdList.includes(custId) ?
    //         selectedPlayerIdList.filter(item => item !== custId) : [...selectedPlayerIdList, custId];

    //     this.props.setSelectedPlayerIdList(newIdList);
    // }

    const { CustId, SystemId, RealName, Currency, CurrentBalance, OutstandingBalance, BaStatus, LastLoginIp, LastTransaction, Email } = dataItem;
    return (
        <Row key={CustId}>
            {/* For Phase 2 */}
            {/* <Cell className="center-align">
                    <input type="checkbox" checked={isChecked} onChange={() => handleCheckPlayer(CustId)} />
                </Cell> */}
            {displayedColumn['Status'] && <Cell className="center-align"><StatusCell dataItem={dataItem} /></Cell>}
            {displayedColumn['Username'] && <Cell className="center-align"><UserNameCell {...userNameProps} /></Cell>}
            {displayedColumn['SystemID'] && <Cell className="center-align">{SystemId}</Cell>}
            {displayedColumn['RealName'] && <Cell className="center-align">{RealName}</Cell>}
            {displayedColumn['Currency'] && <Cell className="center-align">{Currency}</Cell>}
            {displayedColumn['CurrentBalance'] && <Cell className="center-align">{NumberFormat.formatDecimal(CurrentBalance)}</Cell>}
            {displayedColumn['OutstandingBalance'] && <Cell className="center-align">{NumberFormat.formatDecimal(OutstandingBalance)}</Cell>}
            {displayedColumn['OddsGroup'] && <Cell className="center-align"><OddsGroupCell dataItem={dataItem} /></Cell>}
            {
                displayedColumn['BAStatus'] &&
                <Cell className="center-align">
                    <Switcher checked={BaStatus} onChange={(e) => handleChangeBaStatus(CustId, e.target.checked)} />
                </Cell>
            }
            {displayedColumn['SpecialLevel'] && <Cell className="center-align"><SpecialLevelCell dataItem={dataItem} /></Cell>}
            {displayedColumn['LastLoginIp'] && <Cell className="center-align">{LastLoginIp}</Cell>}
            {displayedColumn['LastTransaction'] && <Cell className="center-align">{LastTransaction}</Cell>}
            {displayedColumn['Email'] && <Cell className="center-align">{Email}</Cell>}
        </Row>
    )
}

function mapDispatchToProps(dispatch) {
    const { setSelectedPlayer } = ActionCreators;
    return bindActionCreators({ setSelectedPlayer }, dispatch);
}

export default connect(null, mapDispatchToProps)(React.memo(PlayerRow));