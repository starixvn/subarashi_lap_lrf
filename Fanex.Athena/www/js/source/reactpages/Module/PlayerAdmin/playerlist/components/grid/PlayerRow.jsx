import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';

import { fields } from '../../lib/constants';
import { Row, Cell } from '@9softstudio/react-grid';
import NumberFormat from '@jsroot/lib/numberFormat';

import UserNameCell from './UserNameCell';
import OddsGroupCell from './OddsGroupCell';
import SpecialLevelCell from './SpecialLevelCell';
import StatusCell from './StatusCell';
import BaStatusCell from './BaStatusCell';

export const PlayerRow = (props) => {
    const {
        dataItem,
        displayedColumn
    } = props;

    const { 
        CustId, 
        SystemId, 
        RealName, 
        Currency, 
        CurrentBalance, 
        OutstandingBalance, 
        LastLoginIp, 
        LastTransaction,
        Email, 
        OddsGroup, 
        SpecialLevel, 
        IsDeposit, 
        IsArchived 
    } = dataItem;
    const canShowMainColumn = IsDeposit && !IsArchived;

    return (
        <Row key={CustId}>
            {displayedColumn[fields.Status] && <Cell className="center-align"><StatusCell dataItem={dataItem} /></Cell>}
            {displayedColumn[fields.UserName] && <Cell className="center-align"><UserNameCell dataItem={dataItem} /></Cell>}
            {displayedColumn[fields.SystemId] && <Cell className="center-align">{canShowMainColumn && SystemId}</Cell>}
            {displayedColumn[fields.RealName] && <Cell className="center-align">{RealName}</Cell>}
            {displayedColumn[fields.Currency] && <Cell className="center-align">{Currency}</Cell>}
            {displayedColumn[fields.CurrentBalance] && <Cell className="center-align">{canShowMainColumn && NumberFormat.formatDecimal(CurrentBalance)}</Cell>}
            {displayedColumn[fields.OutstandingBalance] && <Cell className="center-align">{canShowMainColumn && NumberFormat.formatDecimal(OutstandingBalance)}</Cell>}
            {displayedColumn[fields.OddsGroup] && <Cell className="center-align">{canShowMainColumn && OddsGroup !== undefined && <OddsGroupCell dataItem={dataItem} />}</Cell>}
            {displayedColumn[fields.BaStatus] && <BaStatusCell dataItem={dataItem} />}
            {displayedColumn[fields.SpecialLevel] && <Cell className="center-align">{canShowMainColumn && SpecialLevel !== undefined && <SpecialLevelCell dataItem={dataItem} />}</Cell>}
            {displayedColumn[fields.LastLoginIp] && <Cell className="center-align">{LastLoginIp}</Cell>}
            {displayedColumn[fields.LastTransaction] && <Cell className="center-align">{LastTransaction}</Cell>}
            {displayedColumn[fields.Email] && <Cell className="center-align">{Email}</Cell>}
        </Row>
    )
}

function mapDispatchToProps(dispatch) {
    const { setSelectedPlayer } = ActionCreators;
    return bindActionCreators({ setSelectedPlayer }, dispatch);
}

export default connect(null, mapDispatchToProps)(PlayerRow);