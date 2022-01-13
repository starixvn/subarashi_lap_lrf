import React from 'react';
import { Row, Cell, HeaderRow, HeaderCell } from '@9softstudio/react-grid';
import { headerText } from './constants';
import NumberFormat from '@jsroot/lib/numberFormat';
import LangHelper from '@jsroot/lib/langHelper';
import { v4 as uuidv4 } from 'uuid';

export const renderHeader = (drilldownLevel) => {
    return (
        <HeaderRow style={{ height: 32 }}>
            <HeaderCell colWidth={50}>#</HeaderCell>
            {drilldownLevel === 0 && <HeaderCell colWidth={100}>{headerText.date}</HeaderCell>}
            {drilldownLevel === 1 &&<HeaderCell colWidth={120}>{headerText.externalId}</HeaderCell>}
            {drilldownLevel === 1 &&<HeaderCell colWidth={120}>{headerText.systemId}</HeaderCell>}
            <HeaderCell colWidth={70}>{headerText.currency}</HeaderCell>
            <HeaderCell colWidth={150}>{headerText.product}</HeaderCell>
            {drilldownLevel === 1 &&<HeaderCell colWidth={270}>{headerText.promotionType}</HeaderCell>}
            <HeaderCell colWidth={110}>{headerText.turnover}</HeaderCell>
            <HeaderCell colWidth={100}>{headerText.totalTransaction}</HeaderCell>            
            <HeaderCell colWidth={110}>{headerText.customerAmount}</HeaderCell>
            <HeaderCell colWidth={120}>{headerText.licSharingAmount}</HeaderCell>
        </HeaderRow>
    )
}

export const renderDataSection = (dataList, drilldownLevel, handleDrilldown, handleDrilldownBetlist, index) => {
    const dataRows = [];

    for (let i = 0; i < dataList.length; i++) {
        dataRows.push(buildDataRow(dataList[i], drilldownLevel, handleDrilldown, handleDrilldownBetlist));
    }

    return {bodyData: dataRows, index};
}

export const renderFooter = (data, drilldownLevel) => {
    let totalRows = [];

    const total = data.totalCurrency,
        colSpan = drilldownLevel === 0 ? 2 : 3,
        rowSpan = total.length;

    for (let i = 0; i < rowSpan; i++) {
        const item = total[i];
        const {currencyName, turnover, betCount, amount, sharingAmount} = item;

        totalRows.push(
            <Row key={currencyName} className='fixed-table-total'>
                {i === 0 && <Cell className='center-align' rowSpan={rowSpan} colSpan={colSpan}>{LangHelper.getSingleResource('Total')}</Cell>}
                <Cell title={currencyName} className='center-align'  colSpan={colSpan}>{currencyName}</Cell>
                {buildCommonRow(turnover, betCount, amount, sharingAmount)}
            </Row>
        );
    }

    const dataSummary = data.totalSummary;
    const summaryColSpan = colSpan*2;

    totalRows.push(
        <Row key={`tr-grandtotal`} className='fixed-table-grant-total'>
            <Cell title={`Total in ${dataSummary.currencyName}`} className='center-align' colSpan={summaryColSpan}>{`${LangHelper.getSingleResource('Totalin')} ${dataSummary.currencyName}`}</Cell>
            {buildCommonRow(dataSummary.turnover, dataSummary.betCount, dataSummary.amount, dataSummary.sharingAmount)}
        </Row>
    );

    return totalRows;
}

const buildDataRow = (dataItem, drilldownLevel, handleDrilldown, handleDrilldownBetlist) => {
    const { index, indexRowSpan, curencyRowSpan, productRowSpan, date, dateString, productName, betCount, turnover, amount, sharingAmount, custId, username, nickname, 
        promotionName, currency, currencyName} = dataItem;

    return (
        <Row key={`row-${uuidv4()}`}>
            {indexRowSpan > 0  && <Cell className="center-align" rowSpan={indexRowSpan}>{index}</Cell>}       
            {indexRowSpan > 0 && drilldownLevel === 0 && <Cell className="center-align" rowSpan={indexRowSpan}>{dateString}</Cell>}
            {indexRowSpan > 0  && drilldownLevel === 1 && <Cell className="center-align" rowSpan={indexRowSpan}>
                <a href="#" onClick={(e)=> handleDrilldownBetlist(e, custId, nickname, username)}>
                    {nickname}
                </a>
            </Cell>}
            {indexRowSpan > 0  && drilldownLevel === 1 && <Cell className="center-align" rowSpan={indexRowSpan}>
                <a href="#" onClick={(e)=> handleDrilldownBetlist(e, custId, nickname, username)}>
                    {username}
                </a>                
            </Cell>}
            {curencyRowSpan > 0  && drilldownLevel === 0 && <Cell className="center-align" rowSpan={curencyRowSpan}>
                <a href="#" onClick={(e)=> handleDrilldown(e, currency, currencyName, date)}>
                    {currencyName}  
                </a>
            </Cell>}
            {curencyRowSpan > 0  && drilldownLevel === 1 && <Cell className="center-align" rowSpan={curencyRowSpan}>{currencyName}</Cell>}        
            {productRowSpan > 0 && <Cell className="left-align" rowSpan={productRowSpan}>{productName}</Cell>}
            {drilldownLevel === 1 && <Cell className="left-align">{promotionName}</Cell>}
            {buildCommonRow(turnover, betCount, amount, sharingAmount)}
        </Row>
    )
}

const buildCommonRow = (turnover, betCount, amount, sharingAmount) => {
    return <>
        <Cell className="right-align">{NumberFormat.formatDecimal(turnover)}</Cell>  
        <Cell className="right-align">{NumberFormat.format(betCount)}</Cell>              
        <Cell className={`right-align ${amount < 0 ? "negative" : ""}`}>{NumberFormat.formatDecimal(amount)}</Cell>
        <Cell className={`right-align ${sharingAmount < 0 ? "negative" : ""}`}>{NumberFormat.formatDecimal(sharingAmount)}</Cell>
    </>
}

export const renderDetailHeader = () => {
    return (
        <HeaderRow style={{ height: 32 }}>
            <HeaderCell colWidth={60}>#</HeaderCell>
            <HeaderCell colWidth={150}>{headerText.date}</HeaderCell>
            <HeaderCell colWidth={180}>{headerText.refno}</HeaderCell>
            <HeaderCell colWidth={220}>{headerText.product}</HeaderCell>
            <HeaderCell colWidth={300}>{headerText.promotionType}</HeaderCell>
            <HeaderCell colWidth={180}>{headerText.turnover}</HeaderCell>
            <HeaderCell colWidth={200}>{headerText.customerAmount}</HeaderCell>
            <HeaderCell colWidth={260}>{headerText.licSharingAmount}</HeaderCell>
        </HeaderRow>
    )
}

export const renderDetailDataSection = (dataList, drilldownLevel, handleDrilldown, handleDrilldownBetlist) => {
    const dataRows = [];
    for (let i = 0; i < dataList.length; i++) {
        dataRows.push(buildDetailDataRow(dataList[i], i));
    }

    return dataRows;
}

const buildDetailDataRow = (dataItem, index) => {
    const { dateString, productName, turnover, amount, sharingAmount, refno, promotionName} = dataItem;

    return (
        <Row key={`row-${uuidv4()}`}>
            <Cell className="center-align">{++index}</Cell>            
            <Cell className="center-align">{dateString}</Cell>
            <Cell className="center-align">{refno}</Cell>
            <Cell className="left-align">{productName}</Cell>
            <Cell className="left-align">{promotionName}</Cell>
            <Cell className="right-align">{NumberFormat.formatDecimal(turnover)}</Cell>        
            <Cell className={`right-align ${amount < 0 ? "negative" : ""}`}>{NumberFormat.formatDecimal(amount)}</Cell>
            <Cell className={`right-align ${sharingAmount < 0 ? "negative" : ""}`}>{NumberFormat.formatDecimal(sharingAmount)}</Cell>
        </Row>
    )
}

export const renderDetailFooter = (data) => {
    const dataSummary = data.totalSummary;
    const summaryColSpan = 5;

    return (
        <Row key={`tr-grandtotal`} className='fixed-table-total'>
            <Cell className='center-align' colSpan={summaryColSpan}>{LangHelper.getSingleResource('Total')}</Cell>
            <Cell className="right-align">{NumberFormat.formatDecimal(dataSummary.turnover)}</Cell>        
            <Cell className={`right-align ${dataSummary.amount < 0 ? "negative" : ""}`}>{NumberFormat.formatDecimal(dataSummary.amount)}</Cell>
            <Cell className={`right-align ${dataSummary.sharingAmount < 0 ? "negative" : ""}`}>{NumberFormat.formatDecimal(dataSummary.sharingAmount)}</Cell>
        </Row>
    )
}
