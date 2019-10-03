import PlayerListDataHelper from '../helpers/playerListDataHelper';
import { getCustIdListFromLapData, isNonDepositOrArchived } from '../helpers/utils';
import { buildLapPlayerList } from '../helpers/playerDataBuilder';
import LangHelper from '@jsroot/lib/langHelper';

export default class PlayerMultipleQueryService {
    static fetchData(param, commonService, apiInfo) {
        const { lrfSearch, lapSearch } = apiInfo;

        const lrfPromise = commonService.fetchData(lrfSearch.type, lrfSearch.action, {...param })
            .catch(error => {
                console.log(error.message);
                window.alert(LangHelper.getSingleResource('HttpError_Default'));

                return { data: { DataList: [], TotalItem: 0 } };
            });
        const lapPromise = commonService.fetchData(lapSearch.type, lapSearch.action, {...param })
            .catch(error => {
                console.log(error.message);
                window.alert(LangHelper.getSingleResource('HttpError_Default'));

                return { data: { PlayerList: [], TotalItem: 0 } };
            });

        return this._getResult(param, lrfPromise, lapPromise, commonService, apiInfo);
    }

    static _getResult(param, lrfPromise, lapPromise, commonService, apiInfo) {
        return commonService.fetchMultiple([lrfPromise, lapPromise], (lrfResponse, lapResponse) => {
                const { DataList: lrfPlayerList } = lrfResponse.data;
                const { PlayerList: lapPlayerList, TotalItem: lapTotalItem } = lapResponse.data;

                const lrfDataObject = PlayerListDataHelper.getDataObject(lrfPlayerList, lapPlayerList);
                const lapDataObject = PlayerListDataHelper.getDataObject(lapPlayerList, lrfPlayerList);

                const playerList = PlayerListDataHelper.mergePlayerList(lrfDataObject.commonList, lapDataObject.commonList);
                const idListNotInLrf = getCustIdListFromLapData(lapDataObject.differenceList);
                if (idListNotInLrf.length === 0) {
                    const nonDepositPlayerList = buildLapPlayerList(lapDataObject.differenceList);
                    const finalPlayerList = playerList.length > 0 ? playerList.concat(nonDepositPlayerList) : nonDepositPlayerList;
                    return {
                        playerList: finalPlayerList,
                        totalItem: lapTotalItem
                    };
                }

                const lrfParam = {
                    currencyIdList: param.currencyIdList,
                    idList: idListNotInLrf.join(','),
                    specialLevel: param.specialLevel,
                    oddsGroup: param.oddsGroup,
                    baFilter: param.baFilter,
                    pageSize: param.pageSize,
                    pageIndex: 1
                }

                return this._refetchFromLrf(lrfParam, lapDataObject, commonService, apiInfo)
                    .then(response => {
                        const { playerList: nextPlayerList } = response;
                        const filteredItemCount = lapDataObject.differenceList.length - nextPlayerList.length;
                        const totalItem = lapTotalItem - filteredItemCount;

                        return {
                            playerList: playerList.concat(nextPlayerList),
                            totalItem
                        };
                    });
            })
            .catch((error) => {
                console.log(error.message);
                return PlayerListDataHelper.createEmptyResult();
            })
    }

    static _refetchFromLrf(lrfParam, lapDataObject, commonService, apiInfo) {
        const { lrfDataById } = apiInfo;
        const { differenceList } = lapDataObject;

        return commonService.fetchData(lrfDataById.type, lrfDataById.action, {...lrfParam })
            .then(nextLrfResponse => {
                const { DataList: nextLrfPlayerList } = nextLrfResponse.data;
                const filteredLapPlayerList = differenceList.filter(x => isNonDepositOrArchived(x) ||
                    nextLrfPlayerList.findIndex(p => p.IbcCustId === x.IBCCustId) !== -1);

                if (!nextLrfPlayerList || !nextLrfPlayerList.length) {
                    return {
                        playerList: buildLapPlayerList(filteredLapPlayerList)
                    };
                }

                const playerList = PlayerListDataHelper.mergePlayerList(nextLrfPlayerList, filteredLapPlayerList);

                return { playerList };
            })
            .catch((error) => {
                console.log(error.message);
                window.alert(LangHelper.getSingleResource('HttpError_Default'));
                return {
                    playerList: []
                };
            });
    }
}