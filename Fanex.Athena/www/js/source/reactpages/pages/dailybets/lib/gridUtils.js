import { Row, Cell } from '@9softstudio/react-grid';
import {headerText} from './constants';

export const renderHeader = () => {
    return (
        <HeaderRow style={{ height: 32 }}>
            <HeaderCell colWidth={40}>#</HeaderCell>
            <HeaderCell colWidth={130}>{headerText.systemId}</HeaderCell>
            <HeaderCell colWidth={60}>{headerText.currency}</HeaderCell>
            <HeaderCell colWidth={120}>{headerText.refNo}</HeaderCell>
            <HeaderCell colWidth={100}>{headerText.transTime}</HeaderCell>
            <HeaderCell colWidth={80}>{headerText.product}</HeaderCell>
            <HeaderCell colWidth={80}>{headerText.betType}</HeaderCell>
            <HeaderCell colWidth={100} sortBy={turnover}>{headerText.turnover}</HeaderCell>
            <HeaderCell colWidth={100} sortBy={winLoss}>{headerText.winloss}</HeaderCell>
            <HeaderCell colWidth={50}>{headerText.status}</HeaderCell>
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
    const {index, playerName, currencyName, refNo, transTime, productCode, betType, turnover, winLoss, status} = dataItem;

    return (
        <Row key={index}>
            <Cell className="center-align">{index}</Cell>
            <Cell>{playerName}</Cell>
            <Cell className="center-align">{currencyName}</Cell>
            <Cell className="center-align">{refNo}</Cell>
            <Cell className="center-align">{transTime}</Cell>
            <Cell>{productCode}</Cell>
            <Cell>{betType}</Cell>
            <Cell className="right-align">{turnover}</Cell>
            <Cell className="right-align">{winLoss}</Cell>
            <Cell className="center-align">{status}</Cell>
        </Row>
    )
}