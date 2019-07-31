import { systemType } from '../../../constants/configInfo';
import LangHelper from '@jsroot/lib/langHelper';

export const specialLevelListWithColor = {
    0: '#fcfcfc',
    1: '#00ff00',
    2: '#008000',
    3: '#8b4513',
    4: '#daa520',
    5: '#006699',
    6: '#666633',
    7: '#a52a2a',
    8: '#0099ff',
    9: '#cc6600',
    10: '#ff0000'
}

export const oddsGroupListWithStyle = {
    A: { backgroundColor: '#006400', color: '#fff' },
    B: { backgroundColor: '#0099ff', color: '#fff' },
    C: null,
    D: null,
    E: null,
    F: null
}

export const licenseeType = {
    api: 0,
    nonApi: 1
}

export const fields = {
    Status: 'Status',
    UserName: 'UserName',
    SystemId: 'SystemId',
    RealName: 'RealName',
    Currency: 'Currency',
    CurrentBalance: 'CurrentBalance',
    OutstandingBalance: 'OutstandingBalance',
    OddsGroup: 'OddsGroup',
    BaStatus: 'BaStatus',
    SpecialLevel: 'SpecialLevel',
    LastLoginIp: 'LastLoginIp',
    LastTransaction: 'LastTransaction',
    Email: 'Email'
}

export const columnList = [
    { key: fields.Status, value: 'Status', show: true },
    { key: fields.UserName, value: 'Username', show: true },
    { key: fields.SystemId, value: 'SystemId', show: true },
    { key: fields.RealName, value: 'Real Name', show: true },
    { key: fields.Currency, value: 'Currency', show: true },
    { key: fields.CurrentBalance, value: 'Current Balance', show: true },
    { key: fields.OutstandingBalance, value: 'Outstanding Balance', show: true },
    { key: fields.OddsGroup, value: 'Odds Group', show: true },
    { key: fields.BaStatus, value: 'BA Status', show: true },
    { key: fields.SpecialLevel, value: 'Special Level', show: true },
    { key: fields.LastLoginIp, value: 'Last Login IP', show: true },
    { key: fields.LastTransaction, value: 'Last Transaction', show: true },
    { key: fields.Email, value: 'Email', show: true }
];

export const contextMenuList = [
    { key: 'note', name: LangHelper.getSingleResource('Note'), tabName: 'Note' },
    { key: 'password', name: LangHelper.getSingleResource('Password'), tabName: 'Setting' },
    { key: 'fundtransferLimit', name: LangHelper.getSingleResource('FundtransferLimit'), tabName: 'Setting' },
    { key: 'betLimit', name: LangHelper.getSingleResource('BetLimit'), tabName: 'BetLimit' },
    { key: 'statement', name: LangHelper.getSingleResource('Statement'), tabName: 'Statement' },
    { key: 'personalMessage', name: LangHelper.getSingleResource('PersonalMessage'), tabName: 'Message' }
]

export const heightSlicing = {
    default: 300,
    withAdvancedSearch: 357,
    whenCollapsing: 235
}

export const searchOptions = {
    matchPrefix: '1',
    matchCase: '2',
    matchWholeWord: '3'
}

export const defaultPagingOption = {
    PageIndex: 1,
    PageSize: 50,
    PageList: [50],
    TotalItem: null
}

export const playerStatus = {
    '0': LangHelper.getSingleResource('Active'),
    '1': LangHelper.getSingleResource('Locked'),
    '2': LangHelper.getSingleResource('Closed'),
    '3': LangHelper.getSingleResource('Archived')
}

export const playerStatusByName = {
    'Active': 0,
    'Locked': 1,
    'Closed': 2,
    'Archived': 3
}

export const displayedPlayerStatusList = {
    [playerStatusByName.Active]: [playerStatusByName.Closed, playerStatusByName.Locked],
    [playerStatusByName.Locked]: [playerStatusByName.Active, playerStatusByName.Closed]
}

export const messageUpdateState = {
    [playerStatusByName.Locked]: LangHelper.getSingleResource('UpdateToLockedConfirmMsg'),
    [playerStatusByName.Closed]: LangHelper.getSingleResource('UpdateToClosedConfirmMsg'),
    [playerStatusByName.Active]: LangHelper.getSingleResource('UpdateToActiveConfirmMsg')
}

export const baStatusList = {
    'All': 0,
    'On': 1,
    'Off': 2
}

export const headerText = {
    Status: LangHelper.getSingleResource('Status'),
    UserName: LangHelper.getSingleResource('Username'),
    SystemId: LangHelper.getSingleResource('SystemId'),
    RealName: LangHelper.getSingleResource('RealName'),
    Currency: LangHelper.getSingleResource('Currency'),
    CurrentBalance: LangHelper.getSingleResource('CurrentBalance'),
    OutstandingBalance: LangHelper.getSingleResource('OutstandingBalance'),
    OddsGroup: LangHelper.getSingleResource('OddsGroup'),
    BaStatus: LangHelper.getSingleResource('BAStatus'),
    SpecialLevel: LangHelper.getSingleResource('SpecialLevel'),
    LastLoginIp: LangHelper.getSingleResource('LastLoginIP'),
    LastTransaction: LangHelper.getSingleResource('LastTransaction'),
    Email: LangHelper.getSingleResource('Email')
}

export const gridItemDropdownHeight = {
    'specialLevelDropdown': 231,
    'oddsGroupDropdown': 126,
    'statusDropdown': 112
}

export const stringTypeFields = [fields.UserName, fields.RealName, fields.Currency, fields.OddsGroup];

export const apiInfo = {
    lrfSearch: { action: 'api/PlayerList/Search', type: systemType.lrf },
    lrfDataById: { action: 'api/PlayerList/GetPlayerListById', type: systemType.lrf },
    lapSearch: { action: 'PlayerAdminContainer/Search', type: systemType.newAdmin },
    lapDataById: { action: 'PlayerAdminContainer/GetPlayerListById', type: systemType.newAdmin }
}