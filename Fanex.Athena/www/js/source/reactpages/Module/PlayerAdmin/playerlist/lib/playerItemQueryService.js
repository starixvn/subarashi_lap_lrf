import { specialLevelListWithColor, defaultPagingOption } from '../lib/constants';
import PlayerListDataHelper from './playerListDataHelper';

export default class PlayerItemQueryService {
    static getPlayerById(custId, commonService, apiInfo) {
        const { lrfDataById, lapDataById } = apiInfo;

        const lrfParam = {
            idList: custId,
            specialLevel: Object.keys(specialLevelListWithColor).map(item => item).join(','),
            pageSize: defaultPagingOption.PageSize,
            pageIndex: 1
        }

        const lapParam = {
            idList: [custId]
        }

        const lrfPromise = commonService.fetchData(lrfDataById.type, lrfDataById.action, lrfParam);
        const lapPromise = commonService.fetchData(lapDataById.type, lapDataById.action, lapParam);

        return this._getResult(lrfPromise, lapPromise);
    }

    static _getResult(lrfPromise, lapPromise, commonService) {
        return commonService.fetchMultiple([lrfPromise, lapPromise], (lrfResponse, lapResponse) => {
                const { DataList: lrfPlayerList } = lrfResponse.data;
                const { PlayerList: lapPlayerList = [] } = lapResponse.data;

                const playerList = PlayerListDataHelper.mergePlayerList(lrfPlayerList, lapPlayerList);

                return playerList.length ? playerList[0] : null;
            })
            .catch((error) => {
                console.log(error.message);
                return null;
            })
    }
}