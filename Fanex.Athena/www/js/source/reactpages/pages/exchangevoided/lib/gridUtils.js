import React from 'react';
import { Row, Cell, HeaderRow, HeaderCell } from '@9softstudio/react-grid';
import { ExchangeMode, fields, headerText, VOIDED_STATUS } from './constants';
import LangHelper from '@jsroot/lib/langHelper';
import NumberFormat from '@jsroot/lib/numberFormat';

export const renderHeader = () => {
    return (
        <HeaderRow style={{ height: 32 }}>
            <HeaderCell colWidth={50}>#</HeaderCell>
            <HeaderCell colWidth={100}>{headerText.refNo}</HeaderCell>
            <HeaderCell colWidth={100}>{headerText.eventType}</HeaderCell>
            <HeaderCell colWidth={200}>{headerText.event}</HeaderCell>
            <HeaderCell colWidth={70}>{headerText.status}</HeaderCell>
        </HeaderRow>
    )
}
export const renderRunningHeader = () =>{
    return (
    <HeaderRow style={{ height: 32 }}>
        <HeaderCell colWidth={30}>#</HeaderCell>
        <HeaderCell colWidth={100}>{headerText[fields.externalId]}</HeaderCell>
        <HeaderCell colWidth={100}>{headerText[fields.systemId]}</HeaderCell>
        <HeaderCell colWidth={100}>{headerText[fields.betId]}</HeaderCell>
        <HeaderCell colWidth={100}>{headerText[fields.betPlaced]}</HeaderCell>
        <HeaderCell colWidth={300}>{headerText[fields.market]}</HeaderCell>
        <HeaderCell colWidth={100}>{headerText[fields.selection]}</HeaderCell>
        <HeaderCell colWidth={70}>{headerText[fields.type]}</HeaderCell>
        <HeaderCell colWidth={100}>{headerText[fields.oddsAvg]}</HeaderCell>
        <HeaderCell colWidth={100}>{headerText[fields.stake]}</HeaderCell>
    </HeaderRow>
    )
}

export const renderDataFooter = (sumStake, baseCurrency) =>{
    return(
    <Row className="grant-total-row" key="grantTotal-row">
        <Cell className="right-align" colSpan={9}>{LangHelper.getSingleResource("Totalin")} {baseCurrency}</Cell>
        <Cell className="right-align">{NumberFormat.formatDecimal(sumStake)}</Cell>
    </Row>);
}

export const renderDataSection = (dataList, mode) => {
    const dataRows = [];
    if (mode == ExchangeMode.Running){
        for (let i = 0; i < dataList.length; i++) {
            dataRows.push(buildRunningDataRow(i + 1, dataList[i]));
        } 
    }
    else{
        for (let i = 0; i < dataList.length; i++) {
            dataRows.push(buildDataRow(i + 1, dataList[i]));
        }   
    }

    return dataRows;
}

const buildDataRow = (index, dataItem) => {
    const { refNo, eventType, event } = dataItem;

    return (
        <Row key={index}>
            <Cell className="center-align">{index}</Cell>
            <Cell>{refNo}</Cell>
            <Cell>{eventType}</Cell>
            <Cell>{event}</Cell>
            <Cell className="center-align">{VOIDED_STATUS}</Cell>
        </Row>
    )
}

const buildRunningDataRow = (index, dataItem) => {
    const { nickName, username, userId, betId, betPlacedString, marketName, selectionName, type, oddsAvg, stake } = dataItem;

    return (
        <Row key={index}>
            <Cell className="center-align">{index}</Cell>
            <Cell className="left-align" title={nickName}>{nickName}</Cell>
            <Cell className="left-align" title={username}>{username}</Cell>
            <Cell className="center-align" title={betId}>{betId}</Cell>
            <Cell className="center-align" title={betPlacedString}>{betPlacedString}</Cell>
            <Cell className="right-align" title={marketName}>{marketName}</Cell>
            <Cell className="right-align text-bold" title={selectionName}>{selectionName}</Cell>
            <Cell className="right-align text-bold" title={type}>{type}</Cell>
            <Cell className="right-align text-bold" title={NumberFormat.formatDecimal(oddsAvg)}>{NumberFormat.formatDecimal(oddsAvg)}</Cell>
            <Cell className="right-align text-bold" title={NumberFormat.formatDecimal(stake)}>{NumberFormat.formatDecimal(stake)}</Cell>
        </Row>
    )
}