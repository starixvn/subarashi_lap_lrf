import React from 'react';
import LangHelper from '@jsroot/lib/langHelper';

export const defaultPagingOption = {
    PageIndex: 1,
    PageSize: 500,
    PageList: [500],
    TotalItem: null
}

export const tabKeys = {
    PlayerInformation: 'PlayerInformation',
    BetList: 'BetList',
    DepositHistory: 'DepositHistory',
    WithdrawalHistory: 'WithdrawalHistory'
}

const newTabs = [];

const dynamicImports = {
    [tabKeys.PlayerInformation]: () => import('../tabs/PlayerInformation'),    
    [tabKeys.BetList]: () => import('../tabs/BetList'),
    [tabKeys.DepositHistory]: () => import('../tabs/DepositHistory'),
    [tabKeys.WithdrawalHistory]: () => import('../tabs/WithdrawalHistory')
}

export const tabMenuList = Object.keys(tabKeys).map(_ => ({
    key: _, name: LangHelper.getSingleResource(_), component: React.lazy(dynamicImports[_]), preLoad: dynamicImports[_], isNew: newTabs.some(newTab => newTab === _)
}))

export const preLoadComponents = (lazyComponents) => {
    lazyComponents && setTimeout(() => lazyComponents.forEach(_ => _.preLoad && _.preLoad()), 0)
}