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

export const columnList = (licType) => [
    { key: fields.Status, value: 'Status', show: true },
    { key: fields.UserName, value: 'Username', show: true },
    { key: fields.SystemId, value: 'SystemId', show: true },
    licType === licenseeType.nonApi ? { key: fields.RealName, value: 'Real Name', show: true } : null,
    { key: fields.Currency, value: 'Currency', show: true },
    { key: fields.CurrentBalance, value: 'Current Balance', show: true },
    { key: fields.OutstandingBalance, value: 'Outstanding Balance', show: true },
    { key: fields.OddsGroup, value: 'Odds Group', show: true },
    { key: fields.BaStatus, value: 'BA Status', show: true },
    { key: fields.SpecialLevel, value: 'Special Level', show: true },
    licType === licenseeType.nonApi ? { key: fields.LastLoginIp, value: 'Last Login IP', show: true } : null,
    { key: fields.LastTransaction, value: 'Last Transaction', show: true },
    licType === licenseeType.nonApi ? { key: fields.Email, value: 'Email', show: true } : null
].filter(x => !!x);

export const contextMenuList = [
    { key: 'note', name: 'Note', tabName: 'Note' },
    { key: 'password', name: 'Password', tabName: 'Setting' },
    { key: 'fundtransferLimit', name: 'Fundtransfer Limit', tabName: 'Setting' },
    { key: 'betLimit', name: 'Bet Limit', tabName: 'BetLimit' },
    { key: 'statement', name: 'Statement', tabName: 'Statement' },
    { key: 'personalMessage', name: 'Personal Message', tabName: 'Message' }
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
    '0': 'Active',
    '1': 'Locked',
    '2': 'Closed',
    '3': 'Archived'
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
    [playerStatusByName.Locked]: 'Are you sure you want to change the status of this player to LOCKED?\nWarning, this player cannot be restored forever!',
    [playerStatusByName.Closed]: 'Are you sure you want to change the status of this player to CLOSED?\nWarning, Warning, this player cannot login!',
    [playerStatusByName.Active]: 'Are you sure you want to change the status of this player to ACTIVE?\nWarning, this player will be able to log in and bet.'
}

export const baStatusList = {
    'All': 0,
    'On': 1,
    'Off': 2
}

export const headerText = {
    Status: 'Status',
    UserName: 'Username',
    SystemId: 'SystemId',
    RealName: 'Real Name',
    Currency: 'Currency',
    CurrentBalance: 'Current Balance',
    OutstandingBalance: 'Outstanding Balance',
    OddsGroup: 'Odds Group',
    BaStatus: 'BA Status',
    SpecialLevel: 'Special Level',
    LastLoginIp: 'Last Login IP',
    LastTransaction: 'LastTransaction',
    Email: 'Email'
}

export const gridItemDropdownHeight = {
    'specialLevelDropdown': 231,
    'oddsGroupDropdown': 126,
    'statusDropdown': 112
}

export const stringTypeFields = [fields.UserName, fields.RealName, fields.Currency, fields.OddsGroup];