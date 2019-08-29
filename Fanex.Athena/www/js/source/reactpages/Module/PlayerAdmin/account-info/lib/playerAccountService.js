import FactoryCommonService from '../../../lib/factoryCommonService';
import { systemType } from '../../../constants/configInfo';
import { lapAccountProfile, lapBankInfo } from './apiInfo';

const apiInfo = {
    lrfAccountProfile: { action: 'api/PlayerDetailedInfo/GetAccountProfile', type: systemType.lrf },
    custBettingStatus: { action: 'api/PlayerDetailedInfo/GetCustomerBettingStatus', type: systemType.lrf }
}

export default class PlayerAccountService {
    constructor() {
        this.commonService = FactoryCommonService.createInstance();
    }

    getAccountProfile(param) {
        return this.commonService.fetchData(lapAccountProfile.type, lapAccountProfile.action, param)
            .then(response => {
                const { data } = response;

                return data;
            })
            .catch(error => {
                console.log(error.message);
                return null;
            });
    }

    getBankInfo(param) {
        return this.commonService.fetchData(lapBankInfo.type, lapBankInfo.action, param)
            .then(response => {
                const { data } = response;

                return data;
            })
            .catch(error => {
                console.log(error.message);
                return null;
            });
    }

    getCustomerBettingStatus(param) {
        const { custBettingStatus } = apiInfo;
        const params = {...param };

        return this.commonService.fetchData(custBettingStatus.type, custBettingStatus.action, params);
    }
}