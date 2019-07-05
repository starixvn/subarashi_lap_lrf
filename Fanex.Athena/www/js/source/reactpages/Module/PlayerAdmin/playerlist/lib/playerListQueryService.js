import FactoryCommonService from '../../../lib/factoryCommonService';
import { systemType } from '../../../constants/configInfo';
import ReportExcel from './reportExcel';

const apiInfo = {
    lrfPlayerList: { action: 'api/PlayerListQuery/Search', type: systemType.lrf },
    lapPlayerList: { action: 'PlayerAdminContainer/Search', type: systemType.newAdmin }
}

export default class PlayerListQueryService {
    constructor() {
        this.commonService = FactoryCommonService.createInstance();
    }

    getTabList() {
        return this.commonService.getTabList();
    }

    _mergePlayerList(lrfList, lapList) {
        const result = [];

        for (let i = 0; i < lrfList.length; i++) {
            const lrfItem = lrfList[i];
            const lapItem = lapList.find(x => x.CustId === lrfItem.CustId) || {};

            if (lrfItem && lapItem) {
                const { CustId, UserName, SystemId, Currency, CurrentBalance, OutstandingBalance, OddsGroup, BaStatus, SpecialLevel } = lrfItem;
                const { Status, RealName, IP, email, isOnline } = lapItem;

                result.push({
                    CustId: CustId || lapItem.CustId,
                    UserName: UserName || lapItem.UserName,
                    SystemId,
                    Currency,
                    CurrentBalance,
                    OutstandingBalance,
                    OddsGroup,
                    BaStatus,
                    SpecialLevel,
                    Status,
                    RealName,
                    LastLoginIp: IP,
                    Email: email,
                    IsOnline: isOnline
                });
            }
        }

        return result;
    }

    getPlayerList(param) {
        const { lrfPlayerList, lapPlayerList } = apiInfo;

        const lrfPromise = this.commonService.fetchData(lrfPlayerList.type, lrfPlayerList.action, {...param });
        const lapPromise = this.commonService.fetchData(lapPlayerList.type, lapPlayerList.action, {...param });

        return this.commonService.fetchMultiple([lrfPromise, lapPromise], (lrfResponse, lapResponse) => {
            const { MainData: lrfPlayerList, TotalItem: lrfTotalItem } = lrfResponse.data;
            const lapResponseData = lapResponse.data;

            const playerList = this._mergePlayerList(lrfPlayerList, lapResponseData.PlayerList);

            return {
                playerList,
                totalItem: 1000
            };
        })
    }

    getLink(systemType, action) {
        return this.commonService.getLink(systemType, action);
    }

    exportExcel(licType, param) {
        const postParam = {...param, isExportExcel: true };
        this.getPlayerList(postParam).then((response) => {
            const { playerList } = response;
            const reportExcel = new ReportExcel(licType, playerList, 'Player List');
            reportExcel.export();
        });
    }
}