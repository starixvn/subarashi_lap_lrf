import React from 'react';
import { Row, Cell, HeaderRow, HeaderCell } from '@9softstudio/react-grid';
import { headerText } from './constants';
import NumberFormat from '@jsroot/lib/numberFormat';

export const renderHeader = () => {
    return (
        <HeaderRow style={{ height: 32 }}>           
            <HeaderCell colWidth={150}>{headerText.settlement_date}</HeaderCell>
            <HeaderCell colWidth={150}>{headerText.brand_url}</HeaderCell>
            <HeaderCell colWidth={100}>{headerText.game_type}</HeaderCell>
            <HeaderCell colWidth={100}>{headerText.currency_code}</HeaderCell>
            <HeaderCell colWidth={150}>{headerText.bet_amount}</HeaderCell>
            <HeaderCell colWidth={150}>{headerText.credit_amount}</HeaderCell>
            <HeaderCell colWidth={150}>{headerText.net_amount}</HeaderCell>
            <HeaderCell colWidth={150}>{headerText.ref_no}</HeaderCell>
            <HeaderCell colWidth={40}>#</HeaderCell>
        </HeaderRow>
    )
}

export const renderDataSection = (dataList) => {
    const dataRows = [];
    for (let i = 0; i < dataList.length; i++) {
        dataRows.push(buildDataRow(dataList[i]));
    }

    return dataRows;
}

const buildDataRow = (dataItem) => {
    const { rIdx, settlementDateString, brandUrl, gameType, betAmount, creditAmount, netAmount, refNo, currencyName } = dataItem;

    return (
        <Row key={rIdx}>
            <Cell className="center-align">{settlementDateString}</Cell>
            <Cell className="center-align link">{brandUrl}</Cell>
            <Cell className="center-align">{gameType}</Cell>
            <Cell className="center-align">{currencyName}</Cell>
            <Cell className="right-align">{NumberFormat.formatDecimal(betAmount)}</Cell>
            <Cell className="right-align">{NumberFormat.formatDecimal(creditAmount)}</Cell>
            <Cell className="right-align">{NumberFormat.formatDecimal(netAmount)}</Cell>
            <Cell className="center-align">{refNo}</Cell>
            <Cell className="center-align">{rIdx}</Cell>
        </Row>
    )
}