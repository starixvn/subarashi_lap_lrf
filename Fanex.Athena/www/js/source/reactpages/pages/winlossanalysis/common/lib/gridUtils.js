import React from 'react';
import { Row, Cell, HeaderRow, HeaderCell } from '@9softstudio/react-grid';
import { HeaderText, GroupByMode } from './constants';
import NumberFormat from '@jsroot/lib/numberFormat';
// import LangHelper from '@jsroot/lib/langHelper';
// import TreeViewGridRowNode from '../../components/grid/TreeViewGridRowNode'
// import TotalCell from '../components/grid/TotalCell';
// import AppData from '@jsroot/lib/AppData';
// import { v4 as uuidv4 } from 'uuid';

export const renderHeader = (requestParam) => {
    const isGroupByPlayerMode = requestParam.GroupMode == GroupByMode.Player;

    const _renderDefaultHeader = () =>{
        const prefixKey = 'hearder-default';
        let headerCells = [
            <HeaderCell key={`${prefixKey}-#`} colWidth={20}>#</HeaderCell>,
            <HeaderCell key={`${prefixKey}-${HeaderText.GroupBy}`} colWidth={200}>{HeaderText.GroupBy}</HeaderCell>,
            ...getCommonHeaderCells(1, prefixKey)
        ]
        return(
            <HeaderRow style={{ height: 32 }}>
                {headerCells.map(elem => elem)}
            </HeaderRow>
        )
    }

    const _renderGroupByPlayerModeHeaderCell = () => {
        const prefixKey = 'hearder-player';
        let headerCells = [
            <HeaderCell key={`${prefixKey}-#`} rowSpan={2} colWidth={20}>#</HeaderCell>,
            <HeaderCell key={`${prefixKey}-${HeaderText.GroupBy}`}  rowSpan={1} colSpan={2} colWidth={200}>{HeaderText.GroupBy}</HeaderCell>,
            ...getCommonHeaderCells(2)
        ]
        return[
                <HeaderRow key={'header-row-1'} style={{ height: 32 }}>
                    {headerCells.map(elem => elem)}
                </HeaderRow>,
                <HeaderRow key={'header-row-2'}>
                    <HeaderCell key={`${prefixKey}-${HeaderText.ExternalId}`}  colWidth={100}>{HeaderText.ExternalId}</HeaderCell>
                    <HeaderCell key={`${prefixKey}-${HeaderText.SystemId}`}  colWidth={100}>{HeaderText.SystemId}</HeaderCell>
                </HeaderRow>
        ]       

    }

    const getCommonHeaderCells = (rowSpan, prefixKey) => {
        let firstGroup = [
                <HeaderCell key={`${prefixKey}-${HeaderText.BetCount}`} rowSpan={rowSpan} colWidth={80}>{HeaderText.BetCount}</HeaderCell>,
                <HeaderCell key={`${prefixKey}-${HeaderText.TurnOver}`} rowSpan={rowSpan} colWidth={110}>{HeaderText.TurnOver}</HeaderCell>,
                <HeaderCell key={`${prefixKey}-${HeaderText.NetTurnOver}`} rowSpan={rowSpan} colWidth={110}>{HeaderText.NetTurnOver}</HeaderCell>,
                <HeaderCell key={`${prefixKey}-${HeaderText.PlayerWL}`} rowSpan={rowSpan} colWidth={110}>{HeaderText.PlayerWL}</HeaderCell>,
        ]
        let secondGroup = [
                <HeaderCell key={`${prefixKey}-${HeaderText.PlayerComm}`} rowSpan={rowSpan} colWidth={110}>{HeaderText.PlayerComm}</HeaderCell>,
                <HeaderCell key={`${prefixKey}-${HeaderText.LicenseeWL}`} rowSpan={rowSpan} colWidth={110}>{HeaderText.LicenseeWL}</HeaderCell>,
                <HeaderCell key={`${prefixKey}-${HeaderText.LicenseeComm}`} rowSpan={rowSpan} colWidth={110}>{HeaderText.LicenseeComm}</HeaderCell>,
                <HeaderCell key={`${prefixKey}-${HeaderText.AmountDueToBA}`} rowSpan={rowSpan} colWidth={110}>{HeaderText.AmountDueToBA}</HeaderCell>,
                <HeaderCell key={`${prefixKey}-${HeaderText.Margin}`} rowSpan={rowSpan} colWidth={110}>{HeaderText.Margin}</HeaderCell>
        ]
        let effectiveBetCell = <HeaderCell key={`${prefixKey}-${HeaderText.EffectiveBettingValue}`} rowSpan={rowSpan} colWidth={110}>{HeaderText.EffectiveBettingValue}</HeaderCell>;
        return isGroupByPlayerMode ? [...firstGroup, effectiveBetCell, ...secondGroup] : [...firstGroup, ...secondGroup];               
    }

    return isGroupByPlayerMode ? _renderGroupByPlayerModeHeaderCell() : _renderDefaultHeader();
}

export const renderDataSection = (dataList, groupByMode) => {
    // if (isTotalRow) {
    //     return buildTotalRow(dataList[0], showBA);
    // }

     const dataRows = [];
    // const directToCurrencyData = dataList.filter(item => item.isDirectToCurrency);
    // const breakDownData = dataList.filter(item => !item.isDirectToCurrency);

    // for (let i = 0; i < breakDownData.length; i++) {
    //     const detailData = breakDownData[i].detail;
    //     dataRows.push(buildDataRow(breakDownData[i], drilldownLevel, showBA));

    //     detailData && breakDownData[i].isBreakdown && detailData.map((item, index) => {
    //         dataRows.push(buildDetailDataRow(item, index, drilldownLevel, showBA));
    //         const  {detail, isBreakdown}= item;

    //         detail && isBreakdown && detail.data.map((item) => {
    //             dataRows.push(buildCurrencyDataRow(item, drilldownLevel, showBA));
    //         })  
    //     })
    // }

    // for (let i = 0; i < directToCurrencyData.length; i++) {
    //     const detailData = directToCurrencyData[i].detail;
    //     dataRows.push(buildDataRow(directToCurrencyData[i], drilldownLevel, showBA));

    //     detailData && directToCurrencyData[i].isBreakdown && detailData.map((item) => {
    //         dataRows.push(buildCurrencyDataRow(item, drilldownLevel, showBA));
    //     })
    // }

    return dataRows;
}

// const buildDataRow = (dataItem, drilldownLevel, showBA) => {
//     const { index, betCount, turnOver, licenseeWL, customerWL, baComm, isDirectToCurrency } = dataItem;

//     return (
//         <Row className="total-row" key={`total-row-${index}-${drilldownLevel}`}>
//             {isDirectToCurrency && <GroupCell rowData={dataItem} level={drilldownLevel} isDirectToCurrency={isDirectToCurrency}/> 
//                 || <TotalCell rowData={dataItem} level={drilldownLevel}/>}
//             <Cell className="right-align">{NumberFormat.format(betCount)}</Cell>
//             <Cell className="right-align">{NumberFormat.formatDecimal(turnOver)}</Cell>
//             <Cell className="right-align">{NumberFormat.formatDecimal(customerWL)}</Cell>
//             <Cell className={`right-align ${licenseeWL < 0 ? "negative" : ""}`}>{NumberFormat.formatDecimal(licenseeWL)}</Cell>
//             {showBA && <Cell className="right-align">{NumberFormat.formatDecimal(baComm)}</Cell>}
//         </Row>
//     )
// }

// const buildDetailDataRow = (dataItem, index, drilldownLevel, showBA) => {
//     const {leagueId, matchId, betTypeId, betCount, turnOver, licenseeWL, customerWL, baComm } = dataItem;

//     return (
//         <Row key={`detail-row-${leagueId}-${matchId}-${betTypeId}-${drilldownLevel}`}>
//             <Cell className="center-align">{++index}</Cell>
//             <GroupCell rowData={dataItem} level={drilldownLevel}/>
//             <Cell className="right-align">{NumberFormat.format(betCount)}</Cell>
//             <Cell className="right-align">{NumberFormat.formatDecimal(turnOver)}</Cell>
//             <Cell className="right-align">{NumberFormat.formatDecimal(customerWL)}</Cell>
//             <Cell className={`right-align ${licenseeWL < 0 ? "negative" : ""}`}>{NumberFormat.formatDecimal(licenseeWL)}</Cell>
//             {showBA && <Cell className="right-align">{NumberFormat.formatDecimal(baComm)}</Cell>}
//         </Row>
//     )
// }

// const buildCurrencyDataRow = (dataItem, drilldownLevel, showBA) => {
//     const {currency, betCount, turnOver, licenseeWL, customerWL, baComm } = dataItem;
//     const currencyName = AppData.currencyList.find(x => x.Id === currency).Value;

//     return (
//         <Row className="currency-row" key={`currency-row-${currency}-${uuidv4()}-${drilldownLevel}`}>
//             <Cell className="center-align"></Cell>
//             <Cell className="left-align">{currencyName}</Cell>
//             <Cell className="right-align">{NumberFormat.format(betCount)}</Cell>
//             <Cell className="right-align">{NumberFormat.formatDecimal(turnOver)}</Cell>
//             <Cell className="right-align">{NumberFormat.formatDecimal(customerWL)}</Cell>
//             <Cell className={`right-align ${licenseeWL < 0 ? "negative" : ""}`}>{NumberFormat.formatDecimal(licenseeWL)}</Cell>
//             {showBA && <Cell className="right-align">{NumberFormat.formatDecimal(baComm)}</Cell>}
//         </Row>
//     )
// }

export const renderFooter = (dataItem, requestParam) => {
    const isGroupByPlayerMode = requestParam.GroupMode == GroupByMode.Player;
    const {  betCount, turnover, netTurnover, memWinloss, memComm, betEffective, licWinloss, licComm, amtDueToBA, margin } = dataItem;
    const totalCellColSpan = isGroupByPlayerMode ? 3 : 2;
    return (
        <Row className="grant-total-row" key="grantTotal-row">
            <Cell className="center-align" colSpan={totalCellColSpan}>Total</Cell>
            <Cell className="right-align">{NumberFormat.format(betCount)}</Cell>
            <Cell className="right-align">{NumberFormat.formatDecimal(turnover)}</Cell>
            <Cell className="right-align">{NumberFormat.formatDecimal(netTurnover)}</Cell>
            <Cell className="right-align">{NumberFormat.formatDecimal(memWinloss)}</Cell>
            { isGroupByPlayerMode && <Cell className="right-align">{NumberFormat.formatDecimal(betEffective)}</Cell> }
            <Cell className="right-align">{NumberFormat.formatDecimal(memComm)}</Cell>
            <Cell className={`right-align ${licWinloss < 0 ? "negative" : ""}`}>{NumberFormat.formatDecimal(licWinloss)}</Cell>
            <Cell className="right-align">{NumberFormat.formatDecimal(licComm)}</Cell>
            <Cell className="right-align">{NumberFormat.formatDecimal(amtDueToBA)}</Cell>
            <Cell className="right-align">{NumberFormat.formatDecimal(margin) * 100}%</Cell>
        </Row>
    )
}