import React from 'react';
import { HeaderRow, HeaderCell } from '@9softstudio/react-grid';
import { headerText } from '../lib/constants'

export const buildHeader = () => {
    const gridHeader = [
        <HeaderRow key="thead1" style={{ height: 32 }}>
            <HeaderCell rowSpan={1} colWidth={50}>{headerText.TransactionID}</HeaderCell>
            <HeaderCell rowSpan={1} colWidth={100}>{headerText.TransactionTime}</HeaderCell>
            <HeaderCell rowSpan={1} colWidth={80}>{headerText.TransactionType}</HeaderCell>
            <HeaderCell rowSpan={1} colWidth={80}>{headerText.BalanceChange}</HeaderCell>
            <HeaderCell rowSpan={1} colWidth={80}>{headerText.AfterBalance}</HeaderCell>
            <HeaderCell rowSpan={1} colWidth={80}>{headerText.Remark}</HeaderCell>
        </HeaderRow>
    ]

    return gridHeader;
}