import React, { useEffect, useRef, useState } from 'react';
import { Row, Cell } from '@9softstudio/react-grid';
import NumberFormat from '@jsroot/lib/numberFormat';

export const TreeViewGridRowNode = (props) => {
    const [isBreakdown, setIsBreakDown] = useState(false);

    useEffect(() => {
    }, []);

    const { data } = props;
    if (!data) {
        return null;
    }

    const parentData = data.Item;
    const children = data.Children;
    return (
        <>
            <Row className="" key={`row-${parentData.RowIndex}-${parentData.GroupBy}`}>
                <Cell className="center">parentData.RowIndex</Cell>
                <Cell className="left-align">parentData.GroupBy</Cell>
                <Cell className="right-align">{NumberFormat.format(parentData.BetCount)}</Cell>
                <Cell className="right-align">{NumberFormat.formatDecimal(parentData.TurnOver)}</Cell>
                <Cell className="right-align">{NumberFormat.formatDecimal(parentData.NetTurnOver)}</Cell>
                <Cell className="right-align">{NumberFormat.formatDecimal(parentData.MemWinloss)}</Cell>
                <Cell className="right-align">{NumberFormat.formatDecimal(parentData.MemComm)}</Cell>
                <Cell className={`right-align ${parentData.LicWinloss < 0 ? "negative" : ""}`}>{NumberFormat.formatDecimal(parentData.LicWinloss)}</Cell>
                <Cell className="right-align">{NumberFormat.formatDecimal(parentData.LicComm)}</Cell>
                <Cell className="right-align">{NumberFormat.formatDecimal(parentData.AmtDueToBA)}</Cell>
                <Cell className="right-align">{NumberFormat.format(parentData.Margin)}</Cell>
            </Row>
            {isBreakdown && children && children.map(item => (
                <Row className="break-down-row" key={`row-${item.RowIndex}-${item.GroupBy}-${item.BreakBy}`}>
                    <Cell colSpan={2}>data.GroupBy</Cell>
                    <Cell className="left-align">{NumberFormat.format(item.BetCount)}</Cell>
                    <Cell className="right-align">{NumberFormat.formatDecimal(item.TurnOver)}</Cell>
                    <Cell className="right-align">{NumberFormat.formatDecimal(item.NetTurnOver)}</Cell>
                    <Cell className="right-align">{NumberFormat.formatDecimal(item.MemWinloss)}</Cell>
                    <Cell className="right-align">{NumberFormat.formatDecimal(item.MemComm)}</Cell>
                    <Cell className={`right-align ${item.LicWinloss < 0 ? "negative" : ""}`}>{NumberFormat.formatDecimal(item.LicWinloss)}</Cell>
                    <Cell className="right-align">{NumberFormat.formatDecimal(item.LicComm)}</Cell>
                    <Cell className="right-align">{NumberFormat.formatDecimal(item.AmtDueToBA)}</Cell>
                    <Cell className="right-align">{NumberFormat.formatDecimal(item.Margin)}</Cell>
                </Row>
            ))}
        </>
    );
}

export default TreeViewGridRowNode;

