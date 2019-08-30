import { systemType } from '../../../constants/configInfo';

export const lrfAccountProfile = { action: 'api/PlayerDetailedInfo/GetAccountProfile', type: systemType.lrf };

export const custBettingStatus = { action: 'api/PlayerDetailedInfo/GetCustomerBettingStatus', type: systemType.lrf };

export const lapAccountProfile = { action: 'PlayerAccountInfo/GetAccountProfile', type: systemType.newAdmin };

export const lapBankInfo = { action: 'PlayerAccountInfo/GetBankInfo', type: systemType.newAdmin };

export const lrfActivityRecord = { action: 'api/PlayerActivityRecord/Index', type: systemType.lrf };