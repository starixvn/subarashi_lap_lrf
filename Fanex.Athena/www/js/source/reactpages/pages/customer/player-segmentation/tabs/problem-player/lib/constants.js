import LangHelper from '@jsroot/lib/langHelper';

export const dataGridFullHeaders = [
    { key: 'subsidiary', text: LangHelper.getSingleResource('Subsidiary'), colWidth: 80, show: false },
    { key: 'externalId', text: LangHelper.getSingleResource('ExternalId'), sortBy: 'externalId', colWidth: 100 },
    { key: 'systemId', text: LangHelper.getSingleResource('SystemId'), sortBy: 'systemId', colWidth: 100 },
    { key: 'customerClass', text: LangHelper.getSingleResource('CustomerClass'), colWidth: 80, sortBy: 'customerClass' },
    { key: 'reason', text: LangHelper.getSingleResource('Reason'), colWidth: 100 },
    { key: 'lastModifiedDate', text: LangHelper.getSingleResource('LastModifiedDate'), sortBy: 'lastModifiedDate', colWidth: 100 },
    { key: 'vip', text: LangHelper.getSingleResource('VIP2'), colWidth: 100, show: false }
]

export const Url = {
    exportProblemPlayerList: 'Api/PlayerSegmentation/ExportProblemPlayerList',
    abnormalBetList: 'PlayerSegmentation/BetList'
}
