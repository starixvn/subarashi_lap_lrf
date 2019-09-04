import FactoryCommonService from '../../../lib/factoryCommonService';
import { systemType } from '../../../constants/configInfo';
import { lapAccountProfile, lapBankInfo, lrfActivityRecord, custBettingStatus } from './apiInfo';

export default class PlayerAccountService {
    constructor() {
        this.commonService = FactoryCommonService.createInstance();
    }

    getAccountProfile(param) {
        return this._getData(lapAccountProfile.type, lapAccountProfile.action, param);
    }

    getBankInfo(param) {
        return this._getData(lapBankInfo.type, lapBankInfo.action, param);
    }

    getActivityRecord(param) {
        return this._getData(lrfActivityRecord.type, lrfActivityRecord.action, param);
    }

    _getData(licType, action, param) {
        return this.commonService.fetchData(licType, action, param)
            .then(response => {
                const { data } = response;
                console.log(action, data);

                return data;
            })
            .catch(error => {
                console.log(error.message);
                return null;
            });
    }

    getCustomerBettingStatus(param) {
        const params = {...param };

        return this.commonService.fetchData(custBettingStatus.type, custBettingStatus.action, params);
    }
}