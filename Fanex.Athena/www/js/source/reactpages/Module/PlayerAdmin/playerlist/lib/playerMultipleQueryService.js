import PlayerListDataHelper from './playerListDataHelper';
import { getCustIdListFromLapData } from './utils';
import { buildLapPlayerList, buildLrfPlayerList } from './playerDataBuilder';
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
                const { DataList: lrfPlayerList, TotalItem: lrfTotalItem } = lrfResponse.data;
                const { PlayerList: lapPlayerList, TotalItem: lapTotalItem } = lapResponse.data;

                const lrfDataObject = PlayerListDataHelper.getDataObject(lrfPlayerList, lapPlayerList);
                const lapDataObject = PlayerListDataHelper.getDataObject(lapPlayerList, lrfPlayerList);

                const playerList = PlayerListDataHelper.mergePlayerList(lrfDataObject.commonList, lapDataObject.commonList);
                const totalItem = Math.max(lrfTotalItem, lapTotalItem);
                const idListNotInLrf = getCustIdListFromLapData(lapDataObject.differenceList);
                if (lrfDataObject.differenceList.length === 0 && idListNotInLrf.length === 0) {
                    return { playerList, totalItem };
                }

                const idListNotInLap = lrfDataObject.differenceList.map(x => x.CustId);

                const lrfParam = {
                    currencyIdList: param.currencyIdList,
                    idList: idListNotInLrf.join(','),
                    specialLevel: param.specialLevel,
                    pageSize: param.pageSize,
                    pageIndex: 1
                }

                const lapParam = {
                    idList: idListNotInLap
                }

                const getFinalResponse = (response) => {
                    const { playerList: nextPlayerList } = response;
                    const additionTotalItem = lrfTotalItem > lapTotalItem ? idListNotInLrf.length : idListNotInLap.length;

                    return {
                        playerList: playerList.concat(nextPlayerList),
                        totalItem: totalItem + additionTotalItem
                    };
                }

                if (idListNotInLrf.length > 0 && idListNotInLap.length > 0) {
                    return this._refetchFormAllSide(lrfParam, lapParam, lrfDataObject, lapDataObject, commonService, apiInfo).then(getFinalResponse);
                } else if (idListNotInLrf.length > 0) {
                    return this._refetchFromLrf(lrfParam, lapDataObject, commonService, apiInfo).then(getFinalResponse);
                } else {
                    return this._refetchFromLap(lapParam, lrfDataObject, commonService, apiInfo).then(getFinalResponse);
                }
            })
            .catch((error) => {
                console.log(error.message);
                return PlayerListDataHelper.createEmptyResult();
            })
    }

    static _refetchFormAllSide(lrfParam, lapParam, lrfDataObject, lapDataObject, commonService, apiInfo) {
        const { lrfDataById, lapDataById } = apiInfo;
        const nextlrfPromise = commonService.fetchData(lrfDataById.type, lrfDataById.action, {...lrfParam });
        const nextlapPromise = commonService.fetchData(lapDataById.type, lapDataById.action, {...lapParam });

        return commonService.fetchMultiple([nextlrfPromise, nextlapPromise], (nextLrfResponse, nextLapResponse) => {
                const { DataList: nextLrfPlayerList } = nextLrfResponse.data;
                const { PlayerList: nextLapPlayerList } = nextLapResponse.data;

                const playerListInLap = PlayerListDataHelper.mergePlayerList(lrfDataObject.differenceList, nextLapPlayerList);
                const playerListInLrf = PlayerListDataHelper.mergePlayerList(nextLrfPlayerList, lapDataObject.differenceList);

                return {
                    playerList: [...playerListInLap, ...playerListInLrf]
                }
            })
            .catch((error) => {
                console.log(error.message);
                window.alert(LangHelper.getSingleResource('HttpError_Default'));
                return PlayerListDataHelper.createEmptyResult();
            });
    }

    static _refetchFromLrf(lrfParam, lapDataObject, commonService, apiInfo) {
        const { lrfDataById } = apiInfo;
        const { differenceList } = lapDataObject;

        return commonService.fetchData(lrfDataById.type, lrfDataById.action, {...lrfParam })
            .then(nextLrfResponse => {
                const { DataList: nextLrfPlayerList } = nextLrfResponse.data;
                if (!nextLrfPlayerList || !nextLrfPlayerList.length) {
                    return {
                        playerList: buildLapPlayerList(differenceList)
                    };
                }

                const playerList = PlayerListDataHelper.mergePlayerList(nextLrfPlayerList, differenceList);

                return { playerList };
            })
            .catch((error) => {
                console.log(error.message);
                window.alert(LangHelper.getSingleResource('HttpError_Default'));
                return {
                    playerList: buildLapPlayerList(differenceList)
                };
            });
    }

    static _refetchFromLap(lapParam, lrfDataObject, commonService, apiInfo) {
        const { lapDataById } = apiInfo;
        const { differenceList } = lrfDataObject;

        return commonService.fetchData(lapDataById.type, lapDataById.action, {...lapParam })
            .then(nextLapResponse => {
                const { PlayerList: lapPlayerList } = nextLapResponse.data;
                if (!lapPlayerList || !lapPlayerList.length) {
                    return {
                        playerList: buildLrfPlayerList(differenceList)
                    };
                }

                const playerList = PlayerListDataHelper.mergePlayerList(differenceList, lapPlayerList);

                return { playerList };
            })
            .catch((error) => {
                console.log(error.message);
                window.alert(LangHelper.getSingleResource('HttpError_Default'));
                return {
                    playerList: buildLrfPlayerList(differenceList)
                };
            });
    }
}