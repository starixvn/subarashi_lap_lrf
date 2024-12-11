import React from 'react';
import LangHelper from '@jsroot/lib/langHelper';

export const tabKeys = {
    oddsGroupSetting: 'OddsGroupSetting',
    viewLog: 'ViewLog'
}

const newTabs = [];

const dynamicImports = {
    [tabKeys.oddsGroupSetting]: () => import(/* webpackChunkName: "customer/oddsgrouplicenseesetting/oddsGroupSetting" */ '../tabs/odds-group-setting/index'),
    [tabKeys.viewLog]: () => import(/* webpackChunkName: "customer/oddsgrouplicenseesetting/viewLog" */ '../tabs/view-log/index')
}

export const tabMenuList = Object.values(tabKeys).map(_ => ({
    key: _,
    name: LangHelper.getSingleResource(_),
    component: React.lazy(dynamicImports[_]),
    preLoad: dynamicImports[_],
    isNew: newTabs.some(newTab => newTab === _)
}))

export const preLoadComponents = (lazyComponents) => {
    lazyComponents && setTimeout(() => lazyComponents.forEach(_ => _.preLoad && _.preLoad()), 0)
}

export const TabType = {
    OddsGroupSetting: 1,
    ViewLog: 2
}