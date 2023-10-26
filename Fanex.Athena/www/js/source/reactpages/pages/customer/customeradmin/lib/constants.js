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
    [tabKeys.PlayerInformation]: () => import(/* webpackChunkName: "customer/customeradmin/playerInformation" */ '../tabs/PlayerInformation'),    
    [tabKeys.BetList]: () => import(/* webpackChunkName: "customer/customeradmin/betList" */ '../tabs/BetList'),
    [tabKeys.DepositHistory]: () => import(/* webpackChunkName: "customer/customeradmin/depositHistory" */ '../tabs/DepositHistory'),
    [tabKeys.WithdrawalHistory]: () => import(/* webpackChunkName: "customer/customeradmin/withdrawalHistory" */ '../tabs/WithdrawalHistory')
}

export const tabMenuList = Object.keys(tabKeys).map(_ => ({
    key: _, name: LangHelper.getSingleResource(_), component: React.lazy(dynamicImports[_]), preLoad: dynamicImports[_], isNew: newTabs.some(newTab => newTab === _)
}))

export const preLoadComponents = (lazyComponents) => {
    lazyComponents && setTimeout(() => lazyComponents.forEach(_ => _.preLoad && _.preLoad()), 0)
}