import React from 'react';
import { Row, Cell, HeaderRow, HeaderCell } from '@9softstudio/react-grid';
import NumberFormat from '@jsroot/lib/numberFormat';
import LangHelper from '@jsroot/lib/langHelper';

export const renderHeader = () => {
    return (
        <HeaderRow style={{ height: 32 }}>
            <HeaderCell colWidth={40}>#</HeaderCell>
            <HeaderCell colWidth={180}>{LangHelper.getSingleResource("ExternalId")}</HeaderCell>
            <HeaderCell colWidth={180}>{LangHelper.getSingleResource("SystemId")}</HeaderCell>
            <HeaderCell colWidth={190} sortBy="openingBalance">{LangHelper.getSingleResource("OpeningBalance")}</HeaderCell>
            <HeaderCell colWidth={190} sortBy="rewardPromotionAmt">{LangHelper.getSingleResource("Reward_Promotion")}</HeaderCell>
            <HeaderCell colWidth={190} sortBy="exchangeAmt">{LangHelper.getSingleResource("ExchangeToCash")}</HeaderCell>
            <HeaderCell colWidth={190} sortBy="turnover">{LangHelper.getSingleResource("Turnover")}</HeaderCell>
            <HeaderCell colWidth={190} sortBy="outstanding">{LangHelper.getSingleResource("PendingFunds")}</HeaderCell>
            <HeaderCell colWidth={190} sortBy="winLoss">{LangHelper.getSingleResource("PlayerWL")}</HeaderCell>
            <HeaderCell colWidth={190} sortBy="closingBalance">{LangHelper.getSingleResource("ClosingBalance")}</HeaderCell>
        </HeaderRow>
    )
}

export const renderDataSection = (dataList, pageIndex, pageSize) => {
    const dataRows = [];
    const beginIndex = (pageIndex - 1) * pageSize;

    for (let i = 0; i < dataList.length; i++) {
        dataRows.push(buildDataRow(i + beginIndex + 1, dataList[i]));
    }

    return dataRows;
}

export const renderTotalSummaryDataSection = data => {
    return (
        <Row key="totalRow" className='fixed-table-grant-total'>
            <Cell className="center-align" colSpan={3}>{LangHelper.getSingleResource("Total")}</Cell>
            {buildCommonRow(data)}
        </Row>
    )
}

const buildDataRow = (index, dataItem) => {
    const { custId, username, externalId } = dataItem;
    return (
        <Row key={`row_${index}_${custId}_${JSON.stringify(dataItem)}`}>
            <Cell className="center-align">{index}</Cell>
            <Cell className="left-align" title={externalId}>{externalId}</Cell>
            <Cell className="left-align" title={username}>{username}</Cell>
            {buildCommonRow(dataItem)}
        </Row>
    )
}

const buildCommonRow = dataItem => {
    const { openingBalance, turnover, outstanding, winLoss, closingBalance, rewardPromotionAmt, exchangeAmt} = dataItem;

    return (
        <>
            <Cell className="right-align">{NumberFormat.formatDecimal(openingBalance)}</Cell>
            <Cell className="right-align">{NumberFormat.formatDecimal(rewardPromotionAmt)}</Cell>
            <Cell className="right-align">{NumberFormat.formatDecimal(exchangeAmt)}</Cell>
            <Cell className="right-align">{NumberFormat.formatDecimal(turnover)}</Cell>
            <Cell className="right-align">{NumberFormat.formatDecimal(outstanding)}</Cell>
            <Cell className="right-align">{NumberFormat.formatDecimal(winLoss)}</Cell>
            <Cell className="right-align">{NumberFormat.formatDecimal(closingBalance)}</Cell>
        </>
    )
}