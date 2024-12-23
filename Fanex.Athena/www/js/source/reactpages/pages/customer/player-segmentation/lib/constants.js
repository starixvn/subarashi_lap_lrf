import React from 'react';
import LangHelper from '@jsroot/lib/langHelper';
import AppData from '@jsroot/lib/AppData';

export const tabKeys = {
    monitoredPlayer: 'MonitoredPlayer',
    vipPlayerManagement: 'VipPlayerManagement'
}

const newTabs = [];

const dynamicImports = {
    [tabKeys.vipPlayerManagement]: () => import(/* webpackChunkName: "customer/playersegmentation/vipPlayerManagement" */ '../tabs/vip-player-management/index'),
    [tabKeys.monitoredPlayer]: () => import(/* webpackChunkName: "customer/playersegmentation/monitoredPlayer" */ '../tabs/monitored-player/index')
}

export const tabMenuList = AppData.TabKeys.map(_ => ({
    key: _,
    name: LangHelper.getSingleResource(_, AppData.isHideSaba && _ === tabKeys.sabaVirtualSetting),
    component: React.lazy(dynamicImports[_]),
    preLoad: dynamicImports[_],
    isNew: newTabs.some(newTab => newTab === _)
}))

export const preLoadComponents = (lazyComponents) => {
    lazyComponents && setTimeout(() => lazyComponents.forEach(_ => _.preLoad && _.preLoad()), 0)
}

export const SortMapper = {
    sortCol: {
        'systemId': 1,
        'externalId': 2,
        'lastModifiedDate': 3,
        'riskLevel': 4,
        'riskLevelLastMarkDate': 5
    },
    sortType: {
        'asc': 1,
        'desc': 2
    }
}

export const UploadFileOptionValue = {
    byExternalId: 1,
    bySystemId: 2
}
export const UploadFileOptions = [
    { label: LangHelper.getSingleResource("UploadExternalIdList"), value: UploadFileOptionValue.byExternalId },
    { label: LangHelper.getSingleResource("UploadSystemIdList"), value: UploadFileOptionValue.bySystemId }
]

export const UpdateVIPStatusCode = {
    Success: 0,
    InvalidSystemId: 100,
    NoChangeBySystemId: 101,
    Avoid: 102,
    InvalidExternalId: 103,
    NoChangeByExternalId: 104,
    NoChangeByBAStatus: 105
}

export const errorResponse = {
    data: null,
    isSuccess: false
}

export const errorCode = {
    serviceMaintenance: 0,
    serviceError: 500
}

export const successResponse = {
    isSuccess: true
}

export const TabType = {
    MonitoredPlayer: 1,
    VipPlayerManagement: 2
}