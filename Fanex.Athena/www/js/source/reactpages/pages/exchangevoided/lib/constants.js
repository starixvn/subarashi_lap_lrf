import LangHelper from '@jsroot/lib/langHelper';

export const fields = {
    index: 'index',
    refNo: 'refNo',
    eventType: 'eventType',
    event: 'event',
    status: 'status',
    externalId: 'externalId',
    systemId: 'systemId',
    betId: 'betId',
    betPlaced: 'betPlaced',
    market: 'market',
    selection: 'selection',
    type: 'type',
    oddsAvg: 'oddsAvg',
    stake: 'stake'
}

export const headerText = {
    [fields.refNo]: LangHelper.getSingleResource('RefNo'),
    [fields.eventType]: LangHelper.getSingleResource('EventType'),
    [fields.event]: LangHelper.getSingleResource('Event'),
    [fields.status]: LangHelper.getSingleResource('Status'),
    [fields.externalId]: LangHelper.getSingleResource("ExternalId"),
    [fields.systemId]: LangHelper.getSingleResource('SystemId'),
    [fields.betId]: LangHelper.getSingleResource('BetId'),
    [fields.betPlaced]: LangHelper.getSingleResource('BetPlaced'),
    [fields.market]: LangHelper.getSingleResource('Market'),
    [fields.selection]: LangHelper.getSingleResource('Selection'),
    [fields.type]: LangHelper.getSingleResource('Type'),
    [fields.oddsAvg]: LangHelper.getSingleResource('OddsAvg'),
    [fields.stake]: LangHelper.getSingleResource('Stake')
}

export const VOIDED_STATUS = "Void";

export const ExchangeMode = {
    Running: 0,
    Void: 1
}

export const ExchangeViewModeOptions = [
    {label: LangHelper.getSingleResource('Running'), value: ExchangeMode.Running},
    {label: LangHelper.getSingleResource('Void'), value: ExchangeMode.Void},
]

export const DefaultPagingOption = {
    PageIndex: 1,
    PageSize: 50,
    TotalItem: 0,
    PageList: [50, 100, 200, 300, 400, 500, 1000, 2000]
}

export const SortOrder = {
    ASC: 1,
    DESC: 2
}

export const SortBy = {
    BetPlaced: 4,
    Stake: 1
}