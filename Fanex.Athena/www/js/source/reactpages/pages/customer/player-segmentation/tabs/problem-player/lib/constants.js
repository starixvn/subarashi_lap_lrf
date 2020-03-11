import LangHelper from '@jsroot/lib/langHelper'

export const dataGridFullHeaders = [
    { key: 'externalId', text: LangHelper.getSingleResource('ExternalId'), sortBy: 'externalId', colWidth: 100 },
    { key: 'systemId', text: LangHelper.getSingleResource('SystemId'), sortBy: 'systemId', colWidth: 100 },
    { key: 'markDate', text: LangHelper.getSingleResource('MarkDate'), sortBy: 'markDate', colWidth: 100 },
    { key: 'vip', text:LangHelper.getSingleResource('Vip'), colWidth: 100, show: false },
]

export const Url = {
    exportProblemPlayerList: 'Api/PlayerSegmentation/ExportProblemPlayerList'
}