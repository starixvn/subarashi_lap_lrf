import LangHelper from '@jsroot/lib/langHelper';

export const dataGridFullHeaders = [
    { key: 'subsidiary', text: LangHelper.getSingleResource('Subsidiary'), colWidth: 80, show: ({ showSubsidiary }) => showSubsidiary },
    { key: 'externalId', text: LangHelper.getSingleResource('ExternalId'), sortBy: 1, colWidth: 80 },
    { key: 'systemId', text: LangHelper.getSingleResource('SystemId'), sortBy: 2, colWidth: 80 },
    { key: 'currency', text: LangHelper.getSingleResource('Currency'), colWidth: 50 },
    { key: 'currentWinningThreshold', text: LangHelper.getSingleResource('CurrentWinningThreshold'), sortBy: 4, colWidth: 100 },
    { key: 'noOfReached', text: LangHelper.getSingleResource('NoOfReached'), sortBy: 5, colWidth: 60 },
    { key: 'lastReachedDate', text: LangHelper.getSingleResource('LastReachedDate'), sortBy: 6, colWidth: 100 },
    { key: 'vipPlayer', text: LangHelper.getSingleResource('VIPPlayer'), sortBy: 8, colWidth: 50, show: ({ showVipPlayer }) => showVipPlayer },
    { key: 'action', text: LangHelper.getSingleResource('Action'), colWidth: 50, show: ({ canEdit }) => canEdit  }
]

export const Url = {
    exportMonitoredPlayerList: 'Api/PlayerSegmentation/ExportMonitoredPlayerList',
    monitoredPlayerListTemplate: 'Api/PlayerSegmentation/ExportMonitoredTemplateExcel'
}

export const ExcelReaderColumn = {
    SystemId: LangHelper.getSingleResource('SystemId'),
    ExternalId: LangHelper.getSingleResource('ExternalId'),
    WinningThreshold: LangHelper.getSingleResource('DailyWinningThreshold')
}

export const UpdateMonitoredPlayerCode = {
    Success: 0,
    InvalidParameters: 1000,
    InvalidUsernameInput: 1001,
    InvalidSystemId: 100,
    InvalidExternalId: 101,
    ExistingInList: 102,
    InvalidWinningThreshold: 103,
    InvalidAccount: 104,
    NotExistingInList: 105
}

export const UserActionType = {
    AddNew: 1,
    ViewReachedHistory: 2
}

export const MaxBatchUpdateMonitoredPlayer = 2000; 
