import React from 'react';
import { Row, Cell, HeaderRow, HeaderCell } from '@9softstudio/react-grid';
import { headerText } from './constants';
import NumberFormat from '@jsroot/lib/numberFormat';
import LangHelper from '@jsroot/lib/langHelper';
import { v4 as uuidv4 } from 'uuid';

export const renderHeader = (drilldownLevel, isLicenseeOfferBA) => {
    const gridHeader = [
        <HeaderRow style={{ height: 32 }} key='header1'>
            <HeaderCell colWidth={50} rowSpan="2">#</HeaderCell>
            {drilldownLevel === 0 && <HeaderCell colWidth={100}  rowSpan="2">{headerText.date}</HeaderCell>}
            {drilldownLevel === 1 &&<HeaderCell colWidth={120} rowSpan="2">{headerText.externalId}</HeaderCell>}
            {drilldownLevel === 1 &&<HeaderCell colWidth={120} rowSpan="2">{headerText.systemId}</HeaderCell>}
            <HeaderCell colWidth={70} rowSpan="2">{headerText.currency}</HeaderCell>
            <HeaderCell colWidth={110} rowSpan="2" sortBy="turnover">{headerText.turnover}</HeaderCell>
            <HeaderCell colWidth={90} rowSpan="2" sortBy="totalTransaction">{headerText.totalTransaction}</HeaderCell>
            <HeaderCell colWidth={300} colSpan="3">{headerText.customerWL}</HeaderCell>
            <HeaderCell colWidth={110} rowSpan="2" sortBy="licenseeWL">{headerText.licenseeWL}</HeaderCell>
            {isLicenseeOfferBA && <HeaderCell colWidth={100} rowSpan="2" sortBy="baComm">{headerText.BACommission}</HeaderCell>}
            {isLicenseeOfferBA && <HeaderCell colWidth={110} rowSpan="2" sortBy="amtDueToBA">{headerText.amtDueToBA}</HeaderCell>}
        </HeaderRow>,
        <HeaderRow style={{ height: 32 }}  key='header2' className='row2'>
            <HeaderCell colWidth={100} sortBy="customerWL">{headerText.winLoss}</HeaderCell>
            <HeaderCell colWidth={100} sortBy="customerComm">{headerText.comm}</HeaderCell>
            <HeaderCell colWidth={100} sortBy="customerTotal">{headerText.total}</HeaderCell>
        </HeaderRow>];

    return gridHeader;
}

export const renderDataSection = (dataList, drilldownLevel, isLicenseeOfferBA, handleDrilldown, index = 1) => {
    const dataRows = [];

    for (let i = 0; i < dataList.length; i++) {
        dataRows.push(buildDataRow(dataList[i], drilldownLevel, isLicenseeOfferBA, handleDrilldown, index++));
    }

    return dataRows;
}

export const renderFooter = (data, drilldownLevel, isLicenseeOfferBA) => {
    let totalRows = [];

    const total = data.totalCurrency,
        colSpan = drilldownLevel === 0 ? 2 : 3,
        rowSpan = total.length;

    for (let i = 0; i < rowSpan; i++) {
        const item = total[i];
        const {currencyName} = item;

        totalRows.push(
            <Row key={`tr-{currencyName}-${uuidv4()}`} className='fixed-table-total'>
                {i === 0 && <Cell className='center-align' rowSpan={rowSpan} colSpan={colSpan}>{LangHelper.getSingleResource('Total')}</Cell>}
                <Cell title={currencyName} className='center-align'>{currencyName}</Cell>
                {buildCommonRow(item, isLicenseeOfferBA)}
            </Row>
        );
    }

    const dataSummary = data.totalSummary;
    const summaryColSpan = colSpan + 1;

    totalRows.push(
        <Row key={`tr-grandtotal-${uuidv4()}`} className='fixed-table-grant-total'>
            <Cell title={`Total in ${dataSummary.currencyName}`} className='center-align' colSpan={summaryColSpan}>{`${LangHelper.getSingleResource('Totalin')} ${dataSummary.currencyName}`}</Cell>
            {buildCommonRow(dataSummary, isLicenseeOfferBA)}
        </Row>
    );

    return totalRows;
}

const buildDataRow = (dataItem, drilldownLevel, isLicenseeOfferBA, handleDrilldown, index) => {
    const { date, dateString, externalId, systemId, currency, currencyName } = dataItem;

    return (
        <Row key={`row-${uuidv4()}`}>
            <Cell className="center-align">{index}</Cell>
            {drilldownLevel === 0 && <Cell className="center-align">{dateString}</Cell>}
            {drilldownLevel === 1 && <Cell className="left-align">{externalId}</Cell>}
            {drilldownLevel === 1 && <Cell className="left-align">{systemId}</Cell>}
            {drilldownLevel === 0 && <Cell className="center-align">
                {<a href="#" onClick={(e)=> handleDrilldown(e, currency, currencyName, date)}>
                    {currencyName}  
                </a>}
            </Cell>}
            {drilldownLevel === 1 && <Cell className="center-align">
                {currencyName}
            </Cell>}
            {buildCommonRow(dataItem, isLicenseeOfferBA)}
        </Row>
    )
}

const buildCommonRow = (dataItem, isLicenseeOfferBA) => {
    const {turnover, totalTransaction, customerWL, customerComm, customerTotal, licenseeWL, baComm, amtDueToBA} = dataItem

    return <>
        <Cell className="right-align">{NumberFormat.formatDecimal(turnover)}</Cell>
        <Cell className="right-align">{NumberFormat.format(totalTransaction)}</Cell>
        <Cell className="right-align">{NumberFormat.formatDecimal(customerWL)}</Cell>
        <Cell className="right-align">{NumberFormat.formatDecimal(customerComm)}</Cell>
        <Cell className="right-align">{NumberFormat.formatDecimal(customerTotal)}</Cell>
        <Cell className={`right-align ${licenseeWL < 0 ? "negative" : ""}`}>{NumberFormat.formatDecimal(licenseeWL)}</Cell>
        {isLicenseeOfferBA && <Cell className="right-align">{NumberFormat.formatDecimal(baComm)}</Cell>}
        {isLicenseeOfferBA && <Cell className="right-align">{NumberFormat.formatDecimal(amtDueToBA)}</Cell>}
    </>
}
