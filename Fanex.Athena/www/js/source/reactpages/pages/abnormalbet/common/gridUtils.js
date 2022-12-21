import React from 'react';
import { Row, Cell, HeaderRow, HeaderCell } from '@9softstudio/react-grid';
import { headerText, ViewInLevel } from './constants';
import NumberFormat from '../../../lib/numberFormat';
import { v4 as uuidv4 } from 'uuid';

export const renderHeader = (viewIn) => {
    switch(viewIn) {
        case ViewInLevel.SUMMARY:
            return summaryHeader;
        case ViewInLevel.IPSUMMARY:
            return iPSummaryHeader;
        default:
            return detailHeader;
    }
}


const summaryHeader = 
    <HeaderRow style={{ height: 32 }}>
        <HeaderCell colWidth={70}>{headerText.date}</HeaderCell>
        <HeaderCell colWidth={120}>{headerText.sport}</HeaderCell>
        <HeaderCell colWidth={190}>{headerText.league}</HeaderCell>
        <HeaderCell colWidth={170}>{headerText.match}</HeaderCell>
        <HeaderCell colWidth={110}>{headerText.KOTime}</HeaderCell>
        <HeaderCell colWidth={80}>{headerText.live}</HeaderCell>
        <HeaderCell colWidth={80}>{headerText.totalTransaction}</HeaderCell>
        <HeaderCell colWidth={120}>{headerText.betType}</HeaderCell>
        <HeaderCell colWidth={75}>{headerText.choice}</HeaderCell>
        <HeaderCell colWidth={80}>{headerText.reason}</HeaderCell>
        <HeaderCell colWidth={55}>{headerText.finalScore}</HeaderCell>
    </HeaderRow>

const iPSummaryHeader  = [
        <HeaderRow style={{ height: 32 }} key='header1'>
            <HeaderCell colWidth={30} rowSpan={2}>#</HeaderCell>
            <HeaderCell colWidth={110} rowSpan={2}>{headerText.externalID}</HeaderCell>
            <HeaderCell colWidth={110} rowSpan={2}>{headerText.systemID}</HeaderCell>    
            <HeaderCell colWidth={240} colSpan={2}>{headerText.lastLogin}</HeaderCell>
            <HeaderCell colWidth={480} colSpan={2}>{headerText.ticket}</HeaderCell>
        </HeaderRow>,
        <HeaderRow style={{ height: 32 }} key='header2' className='row2'>
            <HeaderCell colWidth={120}>{headerText.IP}</HeaderCell>
            <HeaderCell colWidth={120}>{headerText.location}</HeaderCell>
            <HeaderCell colWidth={240}>{headerText.IP}</HeaderCell>
            <HeaderCell colWidth={240}>{headerText.location}</HeaderCell>
        </HeaderRow>
    ]

const detailHeader = [
    <HeaderRow style={{ height: 32 }}>
        <HeaderCell colWidth={50} style={{left:"0"}} className="col-frozen">#</HeaderCell>
        <HeaderCell colWidth={80} style={{left:"50.2px"}} className="col-frozen">{headerText.date}</HeaderCell>
        <HeaderCell colWidth={120} style={{left:"130.6px"}} className="col-frozen">{headerText.externalID}</HeaderCell>
        <HeaderCell colWidth={120} style={{left:"251.2px"}} className="col-frozen">{headerText.systemID}</HeaderCell>
        <HeaderCell colWidth={60} style={{left:"372px"}} className="col-frozen">{headerText.currency}</HeaderCell>
        <HeaderCell colWidth={180} style={{left:"432.3px"}} className="col-frozen">{headerText.refNo}</HeaderCell>
        <HeaderCell colWidth={80}>{headerText.odds}</HeaderCell>
        <HeaderCell colWidth={80} sortBy={"Stake"}>{headerText.stake}</HeaderCell>
        <HeaderCell colWidth={80}>{headerText.HDP}</HeaderCell>
        <HeaderCell colWidth={120} colSpan={2}>{headerText.score}</HeaderCell>
        <HeaderCell colWidth={140}>{headerText.sport}</HeaderCell>
        <HeaderCell colWidth={190}>{headerText.betType}</HeaderCell>
        <HeaderCell colWidth={120}>{headerText.choice}</HeaderCell>
        <HeaderCell colWidth={150}>{headerText.transTime}</HeaderCell>
        <HeaderCell colWidth={240}>{headerText.league}</HeaderCell>
        <HeaderCell colWidth={220}>{headerText.match}</HeaderCell>
        <HeaderCell colWidth={150}>{headerText.KOTime}</HeaderCell>
        <HeaderCell colWidth={120}>{headerText.live}</HeaderCell>
        <HeaderCell colWidth={80}>{headerText.finalScore}</HeaderCell>
        <HeaderCell colWidth={120}>{headerText.IP}</HeaderCell>
        <HeaderCell colWidth={220}>{headerText.location}</HeaderCell>
        <HeaderCell colWidth={110}>{headerText.reason}</HeaderCell>
    </HeaderRow>,
    <HeaderRow style={{ height: 32, display: 'none'}} key='header2' className='row2'>
    <HeaderCell colWidth={60}>{headerText.score}</HeaderCell>
    <HeaderCell colWidth={60}>{headerText.score}</HeaderCell>
</HeaderRow>
]

export const renderDataSection = (dataList, ViewIn) => {
    switch(ViewIn) {
        case ViewInLevel.SUMMARY:
            return renderSummaryData(dataList);
        case ViewInLevel.IPSUMMARY:
            return renderIPSummaryData(dataList);
        default:
            return renderDetailData(dataList);
    }
}

export const renderSummaryData = (dataList) => {
    const dataRows = [];

    for (let i = 0; i < dataList.length; i++) {
        dataRows.push(buildSummaryDataRow(dataList[i]));
    }

    return dataRows;
}


const buildSummaryDataRow = (dataItem) => {
    return (
        <Row key={`row-summary-${uuidv4()}`}>
            <Cell className="center-align">{dataItem.date}</Cell>
            <Cell className="left-align">{dataItem.sport}</Cell>
            <Cell className="left-align">{dataItem.league}</Cell>
            <Cell className="left-align">{dataItem.match}</Cell>
            <Cell className="center-align">{dataItem.koTime}</Cell>
            <Cell className="left-align">{dataItem.live}</Cell>
            <Cell className="right-align">{NumberFormat.format(dataItem.totalTransaction, 0)}</Cell>
            <Cell className="left-align">{dataItem.betType}</Cell>
            <Cell className="left-align">{dataItem.choice}</Cell>
            <Cell className="left-align">{dataItem.reason}</Cell>
            <Cell className="center-align">{dataItem.finalScore}</Cell>
        </Row>
    )
}

export const renderDetailData = (dataList) => {
    const dataRows = [];
    let index = 1;

    for (let i = 0; i < dataList.length; i++) {
        dataRows.push(buildDetailDataRow(dataList[i], index++));
    }

    return dataRows;
}

const buildDetailDataRow = (dataItem, index) => {
    return (
        <Row key={`row-detail-${uuidv4()}`}>
            <Cell className="center-align col-frozen" style={{left:"0"}}>{index}</Cell>
            <Cell className="center-align col-frozen" style={{left:"50.2px"}}>{dataItem.date}</Cell>
            <Cell className="left-align col-frozen" style={{left:"130.6px"}}>{dataItem.externalId}</Cell>
            <Cell className="left-align col-frozen" style={{left:"251.2px"}}>{dataItem.systemID}</Cell>
            <Cell className="center-align col-frozen" style={{left:"372px"}}>{dataItem.currency}</Cell>
            <Cell title={dataItem.refNo} className="center-align col-frozen" style={{left:"432.3px"}}>{dataItem.refNo}</Cell>
            <Cell className="right-align">{NumberFormat.format(dataItem.odds, 4)}</Cell>
            <Cell className="right-align">{NumberFormat.format(dataItem.stake, 2)}</Cell>
            <Cell className="right-align">{NumberFormat.format(dataItem.hdp, 4)}</Cell>
            <Cell className="center-align">{dataItem.liveHomeScore}</Cell>
            <Cell className="center-align">{dataItem.liveAwayScore}</Cell>
            <Cell className="left-align">{dataItem.sport}</Cell>
            <Cell className="left-align">{dataItem.betType}</Cell>
            <Cell className="left-align">{dataItem.choice}</Cell>
            <Cell className="center-align">{dataItem.transTime}</Cell>
            <Cell className="left-align">{dataItem.league}</Cell>
            <Cell className="left-align">{dataItem.match}</Cell>
            <Cell className="center-align">{dataItem.koTime}</Cell>
            <Cell className="left-align">{dataItem.live}</Cell>
            <Cell className="center-align">{dataItem.finalScore}</Cell>
            <Cell className="left-align">{dataItem.ip}</Cell>
            <Cell className="left-align">{dataItem.location}</Cell>
            <Cell className="left-align">{dataItem.reason}</Cell>
        </Row>
    )
}

export const renderIPSummaryData = (dataList) => {
    const dataRows = [];
    let index = 1;

    for (let i = 0; i < dataList.length; i++) {
        dataRows.push(buildIPSummaryDataRow(dataList[i], index++));
    }

    return dataRows;
}

const buildIPSummaryDataRow = (dataItem, index) => {
    return (
        <Row key={`row-ipsummary-${uuidv4()}`}>
            <Cell className="center-align">{index}</Cell>
            <Cell className="left-align">{dataItem.externalId}</Cell>
            <Cell className="left-align">{dataItem.systemID}</Cell>
            <Cell className="left-align">{dataItem.lastLoginIP}</Cell>
            <Cell className="left-align">{dataItem.lastLoginLocation}</Cell>
            <Cell className="left-align">{dataItem.ticketIP}</Cell>
            <Cell className="left-align">{dataItem.ticketLocation}</Cell>
        </Row>
    )
}

export const renderFooter = (viewIn) => {
    
    var summaryColSpan;

    switch(viewIn) {
        case ViewInLevel.SUMMARY:
            summaryColSpan = 12;
        case ViewInLevel.IPSUMMARY:
            summaryColSpan = 7;
        default:
            summaryColSpan = 23;
    }

    return(
        <Row key={`tr-grandtotal`} className='fixed-table-grant-total' style={{ height: 27 }}>
            <Cell className='center-align' colSpan={summaryColSpan}></Cell>
        </Row>
    )
}