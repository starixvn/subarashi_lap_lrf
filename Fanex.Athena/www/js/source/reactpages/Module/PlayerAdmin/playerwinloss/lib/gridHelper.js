import React from 'react';
import { HeaderRow, HeaderCell } from '@9softstudio/react-grid';
import LangHelper from '@jsroot/lib/langHelper';

export const buildHeader = (hasCustomerComm, isAllowedBA) => {
    const winLossText = `${LangHelper.getSingleResource('Win')}/${LangHelper.getSingleResource('Loss')}`;
    const customerWinLossText = hasCustomerComm ? LangHelper.getSingleResource('CustomerW_L') : winLossText;
    const rowSpan = hasCustomerComm ? 2 : 1;
    const colSpan = hasCustomerComm ? 3 : 1;

    const gridHeader = [
        <HeaderRow key="thead1" style={{ height: 32 }}>
            <HeaderCell rowSpan={rowSpan} colWidth={30}>#</HeaderCell>
            <HeaderCell rowSpan={rowSpan} colWidth={150}>{LangHelper.getSingleResource('Turnover')}</HeaderCell>
            <HeaderCell rowSpan={rowSpan} colWidth={80}>{LangHelper.getSingleResource('TotalTransaction')}</HeaderCell>
            <HeaderCell colSpan={colSpan}>{customerWinLossText}</HeaderCell>
            <HeaderCell rowSpan={rowSpan} colWidth={80}>{LangHelper.getSingleResource('EffectiveBettingValue')}</HeaderCell>
            <HeaderCell rowSpan={rowSpan} colWidth={80}>{LangHelper.getSingleResource('LicenseeW_L')}</HeaderCell>
            {isAllowedBA && <HeaderCell rowSpan={rowSpan} colWidth={80}>{LangHelper.getSingleResource('BACommission')}</HeaderCell>}
            {isAllowedBA && <HeaderCell rowSpan={rowSpan} colWidth={80}>{LangHelper.getSingleResource('AmtDueToBA')}</HeaderCell>}
        </HeaderRow>
    ]

    if (hasCustomerComm) {
        gridHeader.push(
            <HeaderRow key="thead2" style={{ height: 32 }}>
                <HeaderCell colWidth={80}>{winLossText}</HeaderCell>
                <HeaderCell colWidth={80}>{LangHelper.getSingleResource('Comm')}</HeaderCell>
                <HeaderCell colWidth={80}>{LangHelper.getSingleResource('Total')}</HeaderCell>
            </HeaderRow>
        );
    }

    return gridHeader;
}