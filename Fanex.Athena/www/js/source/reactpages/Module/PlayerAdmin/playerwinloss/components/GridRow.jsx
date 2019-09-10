import React from 'react';
import { Row, Cell } from '@9softstudio/react-grid';
import NumberFormat from '@jsroot/lib/numberFormat';

export const GridRow = (props) => {
    const { dataRow, index, hasCustomerComm, isAllowedBA } = props;
    const { Turnover, TotalTransaction, WinLoss, Comm, Total, BetEffective, LicenseeWL, BAComm, AmtDueToBA } = dataRow || {};

    return (
        <Row>
            <Cell className="center-align">{index}</Cell>
            <Cell className="right-align">{NumberFormat.formatDecimal(Turnover)}</Cell>
            <Cell className="right-align">{NumberFormat.format(TotalTransaction)}</Cell>
            <Cell className="right-align">{NumberFormat.formatDecimal(WinLoss)}</Cell>
            {hasCustomerComm && <Cell className="right-align">{NumberFormat.formatDecimal(Comm)}</Cell>}
            {hasCustomerComm && <Cell className="right-align">{NumberFormat.formatDecimal(Total)}</Cell>}
            <Cell className="right-align">{NumberFormat.formatDecimal(BetEffective)}</Cell>
            <Cell className="right-align">{NumberFormat.formatDecimal(LicenseeWL)}</Cell>
            {isAllowedBA && <Cell className="right-align">{NumberFormat.formatDecimal(BAComm)}</Cell>}
            {isAllowedBA && <Cell className="right-align">{NumberFormat.formatDecimal(AmtDueToBA)}</Cell>}
        </Row>
    )
}

export default GridRow;