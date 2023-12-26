import React from 'react';
import LangHelper from '../../../../lib/langHelper';

export const defaultPagingOption = {
    PageIndex: 1,
    PageSize: 20,
    PageList: [20, 50, 100, 200, 500, 1000, 2000],
    TotalItem: null
}

export const tabKeys = {
    Profile: 'Profile',
    DepositAndWithdrawal: 'DepositAndWithdrawal',
    BetList: 'BetList'
}

const newTabs = [];

const dynamicImports = {
    [tabKeys.Profile]: () => import(/* webpackChunkName: "customer/customeradmin/profile" */ '../tabs/Profile'),
    [tabKeys.DepositAndWithdrawal]: () => import(/* webpackChunkName: "customer/customeradmin/depositWithdrawal" */ '../tabs/DepositAndWithdrawal'),   
    [tabKeys.BetList]: () => import(/* webpackChunkName: "customer/customeradmin/betList" */ '../tabs/BetList')
}

export const tabMenuList = Object.keys(tabKeys).map(_ => ({
    key: _,
    name: LangHelper.getSingleResource(_).replace(/&amp;/g, '&'), 
    component: React.lazy(dynamicImports[_]), 
    preLoad: dynamicImports[_], 
    isNew: newTabs.some(newTab => newTab === _),
    isShowOption: _ === tabKeys.DepositAndWithdrawal
}))

export const preLoadComponents = (lazyComponents) => {
    lazyComponents && setTimeout(() => lazyComponents.forEach(_ => _.preLoad && _.preLoad()), 0)
}

export const historyMode = {
    Deposit: 1,
    Withdrawal: 2
}

export const depositAndWithdrawalUrl = {
    [historyMode.Deposit]: "api/CustomerAdministration/GetDepositHistoryByCustId",
    [historyMode.Withdrawal]: "api/CustomerAdministration/GetWithdrawHistoryByCustId"
}