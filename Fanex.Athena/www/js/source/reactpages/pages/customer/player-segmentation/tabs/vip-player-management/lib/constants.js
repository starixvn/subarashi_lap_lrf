import LangHelper from '@jsroot/lib/langHelper';

export const dataGridHeaders = [
    { key: 'subsidiary', text: LangHelper.getSingleResource('Subsidiary'), colWidth: 100 },
    { key: 'externalId', text: LangHelper.getSingleResource('ExternalId'), sortBy: 'externalId', colWidth: 100 },
    { key: 'systemId', text: LangHelper.getSingleResource('SystemId'), sortBy: 'systemId', colWidth: 100 },
    { key: 'riskLevel', text: LangHelper.getSingleResource('RiskLevel'), sortBy: 'riskLevel', colWidth: 100 },
    { key: 'riskLevelLastMarkDate', text: LangHelper.getSingleResource('RiskLevelLastMarkDate').replace("&apos;","'"), sortBy: 'riskLevelLastMarkDate', colWidth: 100 },
    { key: 'vip', text: LangHelper.getSingleResource('VIP2'), colWidth: 100 }
]

export const Url = {
    vipPlayerListTemplate: 'PlayerSegmentation/DowloadVipListTemplate',
    exportVipPlayerList: 'Api/PlayerSegmentation/ExportVipPlayerList'
}

export const ExcelReaderColumn = {
    SystemId: LangHelper.getSingleResource('SystemId'),
    ExternalId: LangHelper.getSingleResource('ExternalId'),
    RiskLevel: LangHelper.getSingleResource('RiskLevel'),
}

export const ActionType = {
    Closed: 0,
    Actived: 1,
    Deactived: 2
}

export const SearchingDateRangeOptions = {
    AllDate: '1',
    DateRange: '2'
}

export const MaxBatchUpdateVIPPlayer = 2000; 