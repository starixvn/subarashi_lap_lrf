import { specialLevelListWithColor } from '../constants';

import LapPlayerQueryService from './lapPlayerQueryService';
import PlayerMultipleQueryService from './playerMultipleQueryService';
import LrfPlayerQueryService from './lrfPlayerQueryService';

export default class QueryServiceFactory {
    static getPlayerListService(param) {
        const { bankAccountNumber, email } = param;
        if (bankAccountNumber || email) {
            return LapPlayerQueryService;
        } else if (this._isChangeAdvancedSearch(param)) {
            return LrfPlayerQueryService;
        } else {
            return PlayerMultipleQueryService;
        }
    }

    static _isChangeAdvancedSearch(param) {
        const { baFilter, currencyIdList, oddsGroup, specialLevel } = param;

        return Number(baFilter) !== 0 ||
            currencyIdList !== '' ||
            oddsGroup !== '' ||
            Object.keys(specialLevelListWithColor).length !== specialLevel.split(',').length;
    }
}