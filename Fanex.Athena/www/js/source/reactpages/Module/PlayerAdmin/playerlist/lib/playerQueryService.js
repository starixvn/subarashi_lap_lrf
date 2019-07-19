import FactoryCommonService from '../../../lib/factoryCommonService';
import { systemType } from '../../../constants/configInfo';
import { specialLevelListWithColor } from './constants';
import ReportExcel from './reportExcel';
import LapPlayerQueryService from './lapPlayerQueryService';
import PlayerMultipleQueryService from './playerMultipleQueryService';
import LrfPlayerQueryService from './lrfPlayerQueryService';

const apiInfo = {
    lrfSearch: { action: 'api/PlayerList/Search', type: systemType.lrf },
    lrfDataById: { action: 'api/PlayerList/GetPlayerListById', type: systemType.lrf },
    lapSearch: { action: 'PlayerAdminContainer/Search', type: systemType.newAdmin },
    lapDataById: { action: 'PlayerAdminContainer/GetPlayerListById', type: systemType.newAdmin }
}

export default class PlayerQueryService {
    constructor() {
        this.commonService = FactoryCommonService.createInstance();
    }

    getTabList() {
        return this.commonService.getTabList();
    }

    getPlayerList(param) {
        const { bankAccountNumber, email } = param;
        if (bankAccountNumber || email) {
            const lapService = new LapPlayerQueryService(this.commonService, apiInfo);
            return lapService.fetchData(param);
        } else if (this._isChangeAdvancedSearch(param)) {
            const lrfService = new LrfPlayerQueryService(this.commonService, apiInfo);
            return lrfService.fetchData(param);
        }

        const multipleQueryService = new PlayerMultipleQueryService(this.commonService, apiInfo);
        return multipleQueryService.fetchData(param);
    }

    _isChangeAdvancedSearch(param) {
        const { baFilter, currency, oddsGroup, specialLevel } = param;

        return Number(baFilter) !== 0 ||
            currency !== '' ||
            oddsGroup !== '' ||
            Object.keys(specialLevelListWithColor).length !== specialLevel.split(',').length;
    }

    getLink(systemType, action) {
        return this.commonService.getLink(systemType, action);
    }

    exportExcel(playerList, param, displayedColumn, fileName = 'PlayerList') {
        const reportExcel = new ReportExcel(playerList, displayedColumn, fileName);
        reportExcel.export();
    }
}