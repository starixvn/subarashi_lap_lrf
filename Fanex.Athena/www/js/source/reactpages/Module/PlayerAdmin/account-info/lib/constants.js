import ClientResourceManager from '@jsroot/lib/clientResourceManager';

export const tabKeys = {
    playerProfile: 'playerProfile',
    bankInformation: 'bankInformation',
    activityRecord: 'activityRecord'
}
export const tabList = [
    { name: tabKeys.playerProfile, text: ClientResourceManager.getText('PlayerProfile') },
    { name: tabKeys.bankInformation, text: ClientResourceManager.getText('BankInformation') },
    { name: tabKeys.activityRecord, text: ClientResourceManager.getText('ActivityRecord') }
]

export const licenseeType = {
    api: 0,
    nonApi: 1
}