import React from 'react';
import LangHelper from '@jsroot/lib/langHelper';
import AppData from '@jsroot/lib/AppData';

export const tabKeys = {
    problemPlayer: 'ProblemPlayer',
    vipPlayerManagement: 'VipPlayerManagement'
}

const dynamicImports = {
    [tabKeys.problemPlayer]: () => import(/* webpackChunkName: "playersegmentation/problemPlayer" */ '../tabs/problem-player/index'),
    [tabKeys.vipPlayerManagement]: () => import(/* webpackChunkName: "playersegmentation/vipPlayerManagement" */ '../tabs/vip-player-management/index')
}

export const tabMenuList = AppData.TabKeys.map(_ => {
    return {
        key: _, name: LangHelper.getSingleResource(_), component: React.lazy(dynamicImports[_]), preLoad: dynamicImports[_]
    }
})

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
