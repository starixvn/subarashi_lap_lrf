import React from 'react';
import { Row, Cell, HeaderRow, HeaderCell } from '@9softstudio/react-grid';
import NumberFormat from '@jsroot/lib/numberFormat';
import LangHelper from '@jsroot/lib/langHelper';

export const renderHeader = () => (
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

export const renderDataSection = (dataList, pageIndex, pageSize) => {
    const dataRows = [];
    const beginIndex = (pageIndex - 1) * pageSize;

    for (let i = 0; i < dataList.length; i++) {
        var row = buildDataRow(i + beginIndex + 1, dataList[i]);
        dataRows.push(row);
    }

    return dataRows;
}

export const renderTotalSummaryDataSection = data => (
    <Row key="totalRow" className='fixed-table-grant-total'>
        <Cell className="center-align" colSpan={3}>{LangHelper.getSingleResource("Total")}</Cell>
        {buildCommonRow(data)}
    </Row>
)

const buildDataRow = (index, dataItem) => 
    dataItem.accounts.map((account, accIndex) => {
        const { custId, username, externalId } = account;

        return (<Row key={`row_${index}_${custId}_${JSON.stringify(dataItem)}`}>
            {accIndex == 0 && <Cell className="center-align" rowSpan={dataItem.accounts.length}>{index}</Cell>}
            <Cell className="left-align" title={externalId}>{externalId}</Cell>
            <Cell className="left-align" title={username}>{username}</Cell>
            {accIndex == 0 && buildCommonRow(dataItem, dataItem.accounts.length)}
        </Row>)
    }
)

const buildCommonRow = (dataItem, rowSpan = 1) => {
    const { openingBalance, turnover, outstanding, winLoss, closingBalance, rewardPromotionAmt, exchangeAmt} = dataItem;

    return (
        <>
            <Cell className="right-align" rowSpan={rowSpan}>{NumberFormat.formatDecimal(openingBalance)}</Cell>
            <Cell className="right-align" rowSpan={rowSpan}>{NumberFormat.formatDecimal(rewardPromotionAmt)}</Cell>
            <Cell className="right-align" rowSpan={rowSpan}>{NumberFormat.formatDecimal(exchangeAmt)}</Cell>
            <Cell className="right-align" rowSpan={rowSpan}>{NumberFormat.formatDecimal(turnover)}</Cell>
            <Cell className="right-align" rowSpan={rowSpan}>{NumberFormat.formatDecimal(outstanding)}</Cell>
            <Cell className="right-align" rowSpan={rowSpan}>{NumberFormat.formatDecimal(winLoss)}</Cell>
            <Cell className="right-align" rowSpan={rowSpan}>{NumberFormat.formatDecimal(closingBalance)}</Cell>
        </>
    )
}