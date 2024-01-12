import React from 'react';
import { Row, Cell, HeaderRow, HeaderCell } from '@9softstudio/react-grid';
import { headerText } from './constants';
import NumberFormat from '@jsroot/lib/numberFormat';

export const renderHeader = (dataOptions) => {

    const { isShowPayout } = dataOptions;

    return (
        <HeaderRow style={{ height: 32 }}>
            <HeaderCell colWidth={40}>#</HeaderCell>
            <HeaderCell colWidth={100}>{headerText.playerName}</HeaderCell>
            <HeaderCell colWidth={50}>{headerText.currency}</HeaderCell>
            <HeaderCell colWidth={100}>{headerText.refNo}</HeaderCell>
            <HeaderCell colWidth={100}>{headerText.transTime}</HeaderCell>
            <HeaderCell colWidth={80}>{headerText.product}</HeaderCell>
            <HeaderCell colWidth={80}>{headerText.sport}</HeaderCell>
            <HeaderCell colWidth={150}>{headerText.betType}</HeaderCell>
            <HeaderCell colWidth={80} sortBy={'turnover'}>{headerText.turnover}</HeaderCell>
            {isShowPayout && <HeaderCell colWidth={80} sortBy={'payout'}>{headerText.payout}</HeaderCell>}
            <HeaderCell colWidth={80} sortBy={'winLoss'}>{headerText.winloss}</HeaderCell>
            <HeaderCell colWidth={80} sortBy={'turnoverBased'}>{headerText.turnoverBased}</HeaderCell>
            {isShowPayout && <HeaderCell colWidth={80} sortBy={'payoutBased'}>{headerText.payoutBased}</HeaderCell>}
            <HeaderCell colWidth={80} sortBy={'winLossBased'}>{headerText.winlossBased}</HeaderCell>
            <HeaderCell colWidth={50}>{headerText.status}</HeaderCell>
        </HeaderRow>
    )
}

export const renderDataSection = (dataList, isTotalRow, dataOptions) => {
    if (isTotalRow) {
        return buildTotalRow(dataList[0], dataOptions);
    }

    const dataRows = [];
    for (let i = 0; i < dataList.length; i++) {
        dataRows.push(buildDataRow(dataList[i], dataOptions));
    }

    return dataRows;
}

const buildDataRow = (dataItem, dataOptions) => {
    const { index, playerName, currencyName, refNo, transTimeString, productName,
         betType, turnover, winLoss, turnoverBased, winLossBased, status, sportName,
         payout, payoutBased } = dataItem;
    const { isShowPayout } = dataOptions;

    return (
        <Row key={index}>
            <Cell className="center-align">{index}</Cell>
            <Cell>{playerName}</Cell>
            <Cell className="center-align">{currencyName}</Cell>
            <Cell className="center-align">{refNo}</Cell>
            <Cell className="center-align">{transTimeString}</Cell>
            <Cell>{productName}</Cell>
            <Cell>{sportName}</Cell>
            <Cell>{betType}</Cell>
            <Cell className="right-align">{NumberFormat.formatDecimal(turnover)}</Cell>
            {isShowPayout && <Cell className="right-align">{NumberFormat.formatDecimal(payout)}</Cell>}
            <Cell className="right-align">{NumberFormat.formatDecimal(winLoss)}</Cell>
            <Cell className="right-align">{NumberFormat.formatDecimal(turnoverBased)}</Cell>
            {isShowPayout && <Cell className="right-align">{NumberFormat.formatDecimal(payoutBased)}</Cell>}
            <Cell className="right-align">{NumberFormat.formatDecimal(winLossBased)}</Cell>
            <Cell className="center-align">{status}</Cell>
        </Row>
    )
}

const buildTotalRow = (dataItem, dataOptions) => {
    const { turnoverBased, payoutBased, winLossBased } = dataItem;
    const { isShowPayout } = dataOptions;
    return (
        <Row key="totalRowUSD">
            <Cell className="right-align" colSpan="11">Total In USD</Cell>
            <Cell className="right-align">{NumberFormat.formatDecimal(turnoverBased)}</Cell>
            {isShowPayout && <Cell className="right-align">{NumberFormat.formatDecimal(payoutBased)}</Cell>}
            <Cell className="right-align">{NumberFormat.formatDecimal(winLossBased)}</Cell>
            <Cell></Cell>
        </Row>
    )
}