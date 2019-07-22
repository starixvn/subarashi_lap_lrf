import React from 'react';
import { HeaderRow, HeaderCell } from '@9softstudio/react-grid';
import { fields } from './constants';
import LangHelper from '@jsroot/lib/langHelper';

export default class GridHelper {
    static renderHeader(displayedColumn) {
        const { Status, UserName, SystemId, RealName, Currency, CurrentBalance, OutstandingBalance,
            OddsGroup, BaStatus, SpecialLevel, LastLoginIp, LastTransaction, Email } = fields;

        return (
            <HeaderRow style={{ height: 32 }}>
                {/* For Phase 2 */}
                {/* <HeaderCell colWidth={30}><input type="checkbox" /></HeaderCell> */}
                {displayedColumn[Status] && <HeaderCell colWidth={80} sortBy={Status}>{LangHelper.getSingleResource('Status')}</HeaderCell>}
                {displayedColumn[UserName] && <HeaderCell colWidth={80} sortBy={UserName}>{LangHelper.getSingleResource('Username')}</HeaderCell>}
                {displayedColumn[SystemId] && <HeaderCell colWidth={100}>{LangHelper.getSingleResource('SystemId')}</HeaderCell>}
                {displayedColumn[RealName] && <HeaderCell colWidth={80} sortBy={RealName}>{LangHelper.getSingleResource('RealName')}</HeaderCell>}
                {displayedColumn[Currency] && <HeaderCell colWidth={60} sortBy={Currency}>{LangHelper.getSingleResource('Currency')}</HeaderCell>}
                {displayedColumn[CurrentBalance] && <HeaderCell colWidth={80} sortBy={CurrentBalance}>{LangHelper.getSingleResource('CurrentBalance')}</HeaderCell>}
                {displayedColumn[OutstandingBalance] && <HeaderCell colWidth={80} sortBy={OutstandingBalance}>{LangHelper.getSingleResource('OutstandingBalance')}</HeaderCell>}
                {displayedColumn[OddsGroup] && <HeaderCell colWidth={50} sortBy={OddsGroup}>{LangHelper.getSingleResource('OddsGroup')}</HeaderCell>}
                {displayedColumn[BaStatus] && <HeaderCell colWidth={50} sortBy={BaStatus}>{LangHelper.getSingleResource('BAStatus')}</HeaderCell>}
                {displayedColumn[SpecialLevel] && <HeaderCell colWidth={50} sortBy={SpecialLevel}>{LangHelper.getSingleResource('SpecialLevel')}</HeaderCell>}
                {displayedColumn[LastLoginIp] && <HeaderCell colWidth={60}>{LangHelper.getSingleResource('LastLoginIP')}</HeaderCell>}
                {displayedColumn[LastTransaction] && <HeaderCell colWidth={100} sortBy={LastTransaction}>{LangHelper.getSingleResource('LastTransaction')}</HeaderCell>}
                {displayedColumn[Email] && <HeaderCell colWidth={100}>{LangHelper.getSingleResource('Email')}</HeaderCell>}
            </HeaderRow>
        )
    }

    static calculateTopPosition(dropdownHeight, currentTop) {
        const innerHeight = window.innerHeight;
        const expectedHeight = dropdownHeight + currentTop + 20;

        return expectedHeight > innerHeight ? currentTop - dropdownHeight : currentTop;
    }
}