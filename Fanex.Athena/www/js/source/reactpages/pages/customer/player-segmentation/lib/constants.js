import React from 'react';
import LangHelper from '@jsroot/lib/langHelper';

export const tabKeys = {
    problemPlayer: 'problemPlayer',
    vipPlayerManagement: 'vipPlayerManagement'
}

const dynamicImports = {
    [tabKeys.problemPlayer]: () => import(/* webpackChunkName: "playersegmentation/problemPlayer" */ '../tabs/problem-player/index'),
    [tabKeys.vipPlayerManagement]: () => import(/* webpackChunkName: "playersegmentation/vipPlayerManagement" */ '../tabs/vip-player-management/index')
}

export const tabMenuList = [
    { key: tabKeys.problemPlayer, name: 'Problem Player', component: React.lazy(dynamicImports[tabKeys.problemPlayer]), preLoad: dynamicImports[tabKeys.problemPlayer] },
    { key: tabKeys.vipPlayerManagement, name: 'Vip Player Management', component: React.lazy(dynamicImports[tabKeys.vipPlayerManagement]), preLoad: dynamicImports[tabKeys.vipPlayerManagement] }
]

export const preLoadComponents = (lazyComponents) => {
    lazyComponents && setTimeout(() => lazyComponents.forEach(_ => _.preLoad && _.preLoad()), 0)
}

export const SortMapper = {
    sortCol: {
        'systemId': 1,
        'externalId': 2,
        'markDate': 3
    },
    sortType: {
        'asc': 1,
        'desc': 2
    }
}

export const errorResponse = {
    data: null,
    isSuccess: false
}

export const successResponse = {
    isSuccess: true
}
