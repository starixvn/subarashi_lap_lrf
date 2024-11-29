import LangHelper from '@jsroot/lib/langHelper';

export const dataGridFullHeaders = [
    { key: 'subsidiary', text: LangHelper.getSingleResource('Subsidiary'), colWidth: 60, show: ({ showSubsidiary }) => showSubsidiary },
    { key: 'currency', text: LangHelper.getSingleResource('Currency'), colWidth: 60 },
    { key: 'oddsGroup', text: LangHelper.getSingleResource('OddsGroup'), colWidth: 60 },
    { key: 'Status', text: LangHelper.getSingleResource('Status'), colWidth: 70 }
]

export const Url = {
    getOddsGroupLicenseeSetting: 'Api/OddsGroupLicenseeSetting/GetCustomerOddsGroup',
    updateOddsGroupLicenseeSetting: 'Api/OddsGroupLicenseeSetting/UpdateCustomerOddsGroup',
    checkAllowedDownlines: 'Api/OddsGroupLicenseeSetting/CheckAllowedDownlines'
}

export const Code = {
    Success: 0,
    Change: 1,
    Waiting: 9,
    LimitDownlines: 100,
    Error: 500
}

export const CodeMsg = {
    [Code.Success] : LangHelper.getSingleResource("OddsGroupSettingSuccessfullyMsg"),
    [Code.Change] : LangHelper.getSingleResource("OddsGroupSettingChangeValueMsg"),
    [Code.Waiting] : LangHelper.getSingleResource("OddsGroupSettingUpdatingMsg"),
    [Code.LimitDownlines] : LangHelper.getSingleResource("OddsGroupSettingLimitDownlinesMsg"),
    [Code.Error] : LangHelper.getSingleResource("OddsGroupSettingErrorMsg")
}

export const CodeCss = {
    [Code.Change] : {
        icon: '',
        textColor: 'change'},
    [Code.Success] : {
        icon: 'icon-checkmark',
        textColor: 'success'},
    [Code.Waiting] : {
        icon: 'icon-async',
        textColor: 'wait'},
    [Code.LimitDownlines] : {
        icon: 'icon-warning',
        textColor: 'error'},
    [Code.Error] : {
        icon: 'icon-warning',
        textColor: 'error'}
}