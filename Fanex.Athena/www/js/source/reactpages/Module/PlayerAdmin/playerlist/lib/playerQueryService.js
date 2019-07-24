import FactoryCommonService from '../../../lib/factoryCommonService';
import { systemType } from '../../../constants/configInfo';

import ReportExcel from './reportExcel';
import QueryServiceFactory from './queryServiceFactory';
import PlayerItemQueryService from './playerItemQueryService';

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
        const playerListService = QueryServiceFactory.getPlayerListService(param, this.commonService);
        return playerListService.fetchData(param, this.commonService, apiInfo);
    }

    getSinglePlayer(custId) {
        return PlayerItemQueryService.getPlayerById(custId, this.commonService, apiInfo);
    }

    getLink(systemType, action) {
        return this.commonService.getLink(systemType, action);
    }

    exportExcel(playerList, param, displayedColumn, fileName = 'PlayerList') {
        const reportExcel = new ReportExcel(playerList, displayedColumn, fileName);
        reportExcel.export();
    }
}