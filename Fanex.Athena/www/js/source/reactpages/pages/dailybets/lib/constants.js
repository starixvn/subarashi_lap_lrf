import LangHelper from '@jsroot/lib/langHelper';

export const headerText = {
    playerName: LangHelper.getSingleResource('PlayerName'),
    currency: LangHelper.getSingleResource('Currency'),
    refNo: LangHelper.getSingleResource('RefNo'),
    transTime: LangHelper.getSingleResource('TransTime'),
    product: LangHelper.getSingleResource('Product'),
    betType: LangHelper.getSingleResource('BetType'),
    turnover: LangHelper.getSingleResource('Turnover'),
    payout: LangHelper.getSingleResource('Payout'),
    winloss: LangHelper.getSingleResource('WinLoss'),
    turnoverBased: `${LangHelper.getSingleResource('Turnover')} (USD)`,
    payoutBased: `${LangHelper.getSingleResource('Payout')} (USD)`,
    winlossBased: `${LangHelper.getSingleResource('WinLoss')} (USD)`,
    status: LangHelper.getSingleResource('Status'),
    sport: LangHelper.getSingleResource('Sport')
}