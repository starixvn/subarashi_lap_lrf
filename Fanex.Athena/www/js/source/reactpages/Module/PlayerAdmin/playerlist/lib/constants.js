export const specialLevelListWithColor = {
    0: '#fcfcfc',
    1: '#98b516',
    2: '#007d00',
    3: '#b87856',
    4: '#fcc50f',
    5: '#418a86',
    6: '#969036',
    7: '#944937',
    8: '#3297fc',
    9: '#c98402',
    10: '#fc0000'
}

export const oddsGroupListWithStyle = {
    A: { backgroundColor: '#007C00', color: '#fff' },
    B: { backgroundColor: '#3298FD', color: '#fff' },
    C: null,
    D: null,
    E: null,
    F: null
}

export const licenseeType = {
    api: 0,
    nonApi: 1
}

export const columnList = (licType) => [
    { key: 'Status', value: 'Status', show: true },
    { key: 'Username', value: 'Username', show: true },
    { key: 'SystemID', value: 'SystemID', show: true },
    licType === licenseeType.nonApi ? { key: 'RealName', value: 'Real Name', show: true } : null,
    { key: 'Currency', value: 'Currency', show: true },
    { key: 'CurrentBalance', value: 'Current Balance', show: true },
    { key: 'OutstandingBalance', value: 'Outstanding Balance', show: true },
    { key: 'OddsGroup', value: 'Odds Group', show: true },
    { key: 'BAStatus', value: 'BA Status', show: true },
    { key: 'SpecialLevel', value: 'Special Level', show: true },
    licType === licenseeType.nonApi ? { key: 'LastLoginIp', value: 'Last Login IP', show: true } : null,
    { key: 'LastTransaction', value: 'Last Transaction', show: true },
    licType === licenseeType.nonApi ? { key: 'Email', value: 'Email', show: true } : null
].filter(x => !!x);

export const heightSlicing = {
    default: 300,
    withAdvancedSearch: 357,
    whenCollapsing: 235
}