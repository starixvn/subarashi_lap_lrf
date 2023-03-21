import LangHelper from '@jsroot/lib/langHelper';

export const ApiUrl = {
    GET_DATA_URL: 'api/WinlossAnalysis/GetData',
}

export const HeaderText = {
    Index: "#",
    Platform: LangHelper.getSingleResource("Platform"),
    ExternalId: LangHelper.getSingleResource("ExternalId"),
    BetCount: LangHelper.getSingleResource("BetCount"),
    TurnOver: LangHelper.getSingleResource("TurnOver"),
    NetTurnOver: LangHelper.getSingleResource("NetTurnOver"),
    PlayerWL: LangHelper.getSingleResource("PlayerWL"),
    EffectiveBettingValue: LangHelper.getSingleResource("EffectiveBettingValue"),
    PlayerComm: LangHelper.getSingleResource("PlayerComm"),
    LicenseeComm: LangHelper.getSingleResource("LicenseeComm"),
    AmountDueToBA: LangHelper.getSingleResource("AmountDueToBA"),
    Margin: LangHelper.getSingleResource("Margin"),
    SystemId: LangHelper.getSingleResource("SystemId"),
    LicenseeWL: LangHelper.getSingleResource("LicenseeWL"),
    GroupBy: LangHelper.getSingleResource("GroupBy")
}

export const DefaultPageSize = 50;
export const OneTwoBetLicenseeName = '12Bet';

export const GroupByMode = {
    Date: 1,
    Month: 2,
    Product: 3,
    Sport: 4,
    BetType: 5,
    Currency: 6,
    Platform: 7,
    Player: 8
}

export const BreakdownByMode = {
    Currency: 1,
    Product: 2,
    Agent: 3
}