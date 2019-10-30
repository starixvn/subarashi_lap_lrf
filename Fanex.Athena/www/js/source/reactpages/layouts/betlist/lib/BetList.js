import QueryString from '@jsroot/lib/QueryString'
import DataService from '@jsroot/lib/DataService'

const BETTYPE_CASHOUT = 911;
const BETTYPE_MIXPARLAY = 9, BETTYPE_SYSTEMPARLAY = 29, BETTYPE_MIXPARLAY_BETRADAR = 2799;
const MIN_BETTYPE_FASTMARKET = 221;
const MAX_BETTYPE_FASTMARKET = 227;
const SPORT_RNG_GAME = 208;
const SPORT_RNG_MINIGAME = 209;
const SPORT_RNG_MOBILE = 210;
const SPORT_ALLBET = 211;
const SPORT_VOIDBRIDGE = 212;
const SPORT_PP = 248;
const SPORT_GLOBALGAMING = 219;
const SPORT_CARDCLUB = 165;

class BetList {

    _isFastMarket(bettype) {
        return bettype >= MIN_BETTYPE_FASTMARKET && bettype <= MAX_BETTYPE_FASTMARKET;
    }

    _getRngCasinoResultUrl(rootUrl, refno) {
        let url = rootUrl + 'ResultReport/ShowRngCasinoSingleWalletResult';
        url = QueryString.setParam(url, 'refno', refno);

        return url;
    }

    _getVoidbridgeResultUrl(rootUrl, custid, gamePlayID) {
        let url = rootUrl + 'ResultReport/VoidbridgeResult';
        url = QueryString.setParam(url, 'custid', custid);
        url = QueryString.setParam(url, 'gamePlayID', gamePlayID);

        return url;
    }

    _getPPResultUrl(rootUrl, custid, gamePlayId) {
        let url = rootUrl + 'PPResultPopup/Index';
        url = QueryString.setParam(url, 'custid', custid);
        url = QueryString.setParam(url, 'gamePlayId', gamePlayId);

        return url;
    }

    _getCardClubResultUrl(rootUrl, custid, gameTypeId, transId3rd) {
        let url = rootUrl + 'CardClubResultPopup/Index';
        url = QueryString.setParam(url, 'custid', custid);
        url = QueryString.setParam(url, 'gameTypeId', gameTypeId);
        url = QueryString.setParam(url, 'transId3rd', transId3rd);

        return url;
    }

    _getAllBetResultUrl(rootUrl, transdesc, betcheck, bettype) {
        let url = rootUrl + 'ResultReport/AllBetResult';
        url = QueryString.setParam(url, 'transdesc', encodeURIComponent(transdesc));
        url = QueryString.setParam(url, 'betcheck', betcheck);
        url = QueryString.setParam(url, 'bettype', bettype);

        return url;

    }

    _getGlobalGamingResultUrl(rootUrl, custid, gameId) {
        let url = rootUrl + 'ResultReport/GlobalGamingResult';
        url = QueryString.setParam(url, 'custid', custid);
        url = QueryString.setParam(url, 'gameId', gameId);

        return url;
    }

    _getMixParlayResultUrl(rootUrl, refno, winlostdate, bettype) {
        let url = rootUrl + 'ResultReport/ResultPopup';
        url = QueryString.setParam(url, 'refno', refno);
        url = QueryString.setParam(url, 'winlossdate', winlostdate);
        url = QueryString.setParam(url, 'bettype', bettype);
        url = QueryString.setParam(url, 'matchid', 1);

        return url;
    }

    _getSportBookResultUrl(rootUrl, matchid, bettype, raceNo, sporttype, league, isOutright, extension1, extension2) {
        let url = rootUrl + 'ResultReport/ResultPopup';
        url = QueryString.setParam(url, 'matchid', matchid);
        url = QueryString.setParam(url, 'bettype', bettype);
        url = QueryString.setParam(url, 'raceno', raceNo);
        url = QueryString.setParam(url, 'sporttype', sporttype);
        url = QueryString.setParam(url, 'isoutright', isOutright);

        if (this._isFastMarket(bettype)) {
            url = QueryString.setParam(url, 'handicap1', extension1);
            url = QueryString.setParam(url, 'handicap2', extension2);
        } else {
            url = QueryString.setParam(url, 'betid', extension1);
        }

        return url;
    }

    _getRealUrl(url) {
        DataService.getData(url)
            .then((result) => {
                return result;
            }).catch(function (error) {
                console.log(error);
            });
    }

    getResultUrl(rootUrl, matchid, raceNo, bettype, sporttype, refno,
        username, winlostdate, refnoMixParlay, league, isOutright, extension1, extension2, custid, transdecs) {
        bettype = Number(bettype);

        if (sporttype === SPORT_RNG_GAME || sporttype === SPORT_RNG_MINIGAME || sporttype === SPORT_RNG_MOBILE) {
            let url = this._getRngCasinoResultUrl(rootUrl, refno);
            DataService.postData(url)
                .then((response) => {
                    const result = response.Result;
                    if (response.Success) {
                        if (result === '') {
                            return;
                        }

                        return result;;
                    }
                    else {
                        alert(this._getResource("ErrorProcessingMsg"));
                    }
                }).catch(function (error) {
                    console.log(error);
                });

            return url;
        }
        else if (sporttype === SPORT_VOIDBRIDGE) {
            let url = this._getVoidbridgeResultUrl(rootUrl, custid, extension2);

            return this._getRealUrl(url);
        }
        else if (sporttype === SPORT_PP) {
            let url = this._getPPResultUrl(rootUrl, custid, extension2);

            return this._getRealUrl(url);
        }
        else if (sporttype === SPORT_CARDCLUB) {
            let url = this._getCardClubResultUrl(rootUrl, custid, bettype, extension2);

            return this._getRealUrl(url);
        }
        else if (sporttype === SPORT_ALLBET) {
            let url = this._getAllBetResultUrl(rootUrl, transdecs, extension2, bettype);

            return url;
        }
        else if (sporttype === SPORT_GLOBALGAMING) {
            let url = this._getGlobalGamingResultUrl(rootUrl, custid, extension2);

            return this._getRealUrl(url);
        }
        else {
            let isParlay = bettype === BETTYPE_MIXPARLAY || bettype === BETTYPE_SYSTEMPARLAY || bettype === BETTYPE_MIXPARLAY_BETRADAR;
            let url = isParlay
                ? this._getMixParlayResultUrl(rootUrl, refnoMixParlay, winlostdate, bettype)
                : this._getSportBookResultUrl(rootUrl, matchid, bettype, raceNo, sporttype, league, isOutright, extension1, extension2, custid);

            return url;
        }
    }

    getChoiceParlayDetailUrl(rootUrl, transId, refNo, handicap1, handicap2, betcheck, betteam, custId){
        var url = rootUrl + 'api/MixParlayBetList/NewParlayDetail';
        url = QueryString.setParam(url, 'transId', transId);
        url = QueryString.setParam(url, 'refNo', refNo);
        url = QueryString.setParam(url, 'handicap1', handicap1);
        url = QueryString.setParam(url, 'handicap2', handicap2);
        url = QueryString.setParam(url, 'betcheck', betcheck);
        url = QueryString.setParam(url, 'betteam', betteam);
        url = QueryString.setParam(url, 'custId', custId);

        return url;
    }

    buildChoiceParlayDetail(response){
        let choice = '';
        let length = response.Data === null ? 0 : response.Data.length;
        if (length > 0) {
            for(let i = 0; i < response.Texts.length; i++){
                choice += response.Texts[i];
            }

            choice += '<div class="line"></div>';

            for(let i = 0;i < response.Data.length; i++){
                let item = response.Data[i];
                choice += item;
                if (i < length - 1) {
                    choice += '<div class="line"></div>';
                }
            }
        }

        return choice;
    }

    getParlayDetailUrl(rootUrl, transId, refNo, betId, custId, betTeam, baseCurrency) {
        if (Number(transId) === 0) { return; }

        var url = rootUrl + 'SystemParlayBetList/Detail';
        url = QueryString.setParam(url, 'refno', refNo);
        url = QueryString.setParam(url, 'betteam', betTeam);
        url = QueryString.setParam(url, 'basecurrency', baseCurrency);

        return url;
    }

    getCashOutHistoryPopupSetting(rootUrl, baseCurrency, transId, refNo, betType, betdaqId) {
        var isCashOut = betdaqId < 1 || betType === BETTYPE_CASHOUT;
        var url = rootUrl + 'CashOutBetList/Detail';
        url = QueryString.setParam(url, 'transId', transId);
        url = QueryString.setParam(url, 'refNo', refNo);
        url = QueryString.setParam(url, 'betType', betType);
        url = QueryString.setParam(url, 'betdaqId', betdaqId);
        url = QueryString.setParam(url, 'BaseCurrency', baseCurrency);
        url = QueryString.setParam(url, 'isCashout', isCashOut);
        return {
            url: url,
            isCashOut : isCashOut
        };
    }

    getBonusDetailUrl(rootUrl, refCode, transId, baseCurrency) {
        let url = rootUrl + 'BonusBetList/Detail';
        url = QueryString.setParam(url, 'RefCode', refCode);
        url = QueryString.setParam(url, 'TransId', transId);
        url = QueryString.setParam(url, 'BaseCurrency', baseCurrency);

        return url;
    }

    getAGCasinoDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType) {
        let url = rootUrl + 'AGCasinoBetList/Detail';
        url = QueryString.setParam(url, 'transid', transId);
        url = QueryString.setParam(url, 'date', winlostDate);
        url = QueryString.setParam(url, 'custid', custId);
        url = QueryString.setParam(url, 'transType', transType);
        url = QueryString.setParam(url, 'BaseCurrency', baseCurrency);

        return url;
    }

    getRnGCasinoDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType) {
        let url = rootUrl + 'RnGCasinoBetList/Detail';
        url = QueryString.setParam(url, 'transId', transId);
        url = QueryString.setParam(url, 'date', winlostDate);
        url = QueryString.setParam(url, 'custId', custId);
        url = QueryString.setParam(url, 'transType', transType);
        url = QueryString.setParam(url, 'BaseCurrency', baseCurrency);

        return url;
    }

    getVoidBridgeDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType) {
        let url = rootUrl + 'VoidbridgeBetList/Detail';
        url = QueryString.setParam(url, 'transId', transId);
        url = QueryString.setParam(url, 'date', winlostDate);
        url = QueryString.setParam(url, 'custId', custId);
        url = QueryString.setParam(url, 'transType', transType);
        url = QueryString.setParam(url, 'BaseCurrency', baseCurrency);

        return url;
    }

    getAllBetDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType) {
        let url = rootUrl + 'AllBetBetList/Detail';
        url = QueryString.setParam(url, 'transid', transId);
        url = QueryString.setParam(url, 'custid', custId);
        url = QueryString.setParam(url, 'transType', transType);
        url = QueryString.setParam(url, 'date', winlostDate);
        url = QueryString.setParam(url, 'BaseCurrency', baseCurrency);

        return url;
    }

    getColossusBetsDetailUrl(rootUrl, baseCurrency, refNo, winlostDate, transId, custId, betCheck) {
        let url = rootUrl + 'ColossusBetBetList/Detail';
        url = QueryString.setParam(url, 'refNo', refNo);
        url = QueryString.setParam(url, 'date', winlostDate);
        url = QueryString.setParam(url, 'transid', transId);
        url = QueryString.setParam(url, 'custid', custId);
        url = QueryString.setParam(url, 'betCheck', betCheck);
        url = QueryString.setParam(url, 'BaseCurrency', baseCurrency);

        return url;
    }

    getGlobalGamingDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType) {
        let url = rootUrl + 'GlobalGamingBetList/Detail';
        url = QueryString.setParam(url, 'transId', transId);
        url = QueryString.setParam(url, 'date', winlostDate);
        url = QueryString.setParam(url, 'custId', custId);
        url = QueryString.setParam(url, 'transType', transType);
        url = QueryString.setParam(url, 'BaseCurrency', baseCurrency);

        return url;
    }

    getPPDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType) {
        let url = rootUrl + 'PragmaticPlayBetList/Detail';
        url = QueryString.setParam(url, 'transId', transId);
        url = QueryString.setParam(url, 'date', winlostDate);
        url = QueryString.setParam(url, 'custId', custId);
        url = QueryString.setParam(url, 'transType', transType);
        url = QueryString.setParam(url, 'BaseCurrency', baseCurrency);

        return url;
    }

    getVideoPokerGameDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType) {
        let url = rootUrl + 'CardClubBetList/Detail';
        url = QueryString.setParam(url, 'transId', transId);
        url = QueryString.setParam(url, 'date', winlostDate);
        url = QueryString.setParam(url, 'custId', custId);
        url = QueryString.setParam(url, 'transType', transType);
        url = QueryString.setParam(url, 'BaseCurrency', baseCurrency);

        return url;
    }
}

export default new BetList();