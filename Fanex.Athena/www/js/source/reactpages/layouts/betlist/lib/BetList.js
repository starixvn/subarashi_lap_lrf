import QueryString from '@jsroot/lib/QueryString'
import { BetType } from './constants'

class BetList {
    _isFastMarket(bettype) {
        return bettype >= BetType.MIN_FASTMARKET && bettype <= BetType.MAX_FASTMARKET;
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
            url = QueryString.setParam(url, 'transdesc', extension2);
        }

        return url;
    }

    getResultUrl(rootUrl, matchid, raceNo, bettype, sporttype, winlostdate, refnoMixParlay, league, isOutright, extension1, extension2, custid) {
        bettype = Number(bettype);

        let isParlay = bettype === BetType.MIXPARLAY || bettype === BetType.SYSTEMPARLAY || bettype === BetType.MIXPARLAY_BETRADAR;
        let url = isParlay
            ? this._getMixParlayResultUrl(rootUrl, refnoMixParlay, winlostdate, bettype)
            : this._getSportBookResultUrl(rootUrl, matchid, bettype, raceNo, sporttype, league, isOutright, extension1, extension2, custid);

        return url;
    }

    getChoiceParlayDetailUrl(rootUrl, transId, refNo, handicap1, handicap2, betcheck, betteam, custId) {
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

    buildChoiceParlayDetail(response) {
        let choice = '';
        let length = response.Data === null ? 0 : response.Data.length;
        if (length > 0) {
            for (let i = 0; i < response.Texts.length; i++) {
                choice += response.Texts[i];
            }

            choice += '<div class="line"></div>';

            for (let i = 0; i < response.Data.length; i++) {
                let item = response.Data[i];
                choice += item;
                if (i < length - 1) {
                    choice += '<div class="line"></div>';
                }
            }
        }

        return choice;
    }

    buildSingleMatchParlayDetail(data) {
        let selection = '';
        let length = data === null ? 0 : data.length;
        if (length > 0) {
            selection = '<div class="single-match-parlay-detail">';
            for (let i = 0; i < data.length; i++) {
                selection += data[i];
            }
            selection += '</div>';
        }

        return selection;
    }

    getParlayDetailUrl(rootUrl, transId, refNo, betId, custId, betTeam, baseCurrency) {
        if (Number(transId) === 0) { return; }

        var url = rootUrl + 'SystemParlayBetList/Detail';
        url = QueryString.setParam(url, 'refno', refNo);
        url = QueryString.setParam(url, 'betteam', betTeam);
        url = QueryString.setParam(url, 'basecurrency', baseCurrency);

        return url;
    }

    getSingleMatchParlayDetailUrl(rootUrl, transId, custId, status) {
        if (Number(transId) === 0) { return; }

        var url = rootUrl + 'api/SingleMatchParlayBetList/Detail';
        url = QueryString.setParam(url, 'transId', transId);
        url = QueryString.setParam(url, 'custId', custId);
        url = QueryString.setParam(url, "status", status);

        return url;
    }

    getCashOutHistoryPopupSetting(rootUrl, baseCurrency, transId, refNo, betType, betdaqId) {
        var isCashOut = betdaqId < 1 || betType === BetType.CASHOUT;
        var url = rootUrl + 'CashOutBetList/Detail';
        url = QueryString.setParam(url, 'transId', transId);
        url = QueryString.setParam(url, 'refNo', refNo);
        url = QueryString.setParam(url, 'betType', betType);
        url = QueryString.setParam(url, 'betdaqId', betdaqId);
        url = QueryString.setParam(url, 'BaseCurrency', baseCurrency);
        url = QueryString.setParam(url, 'isCashout', isCashOut);
        return {
            url: url,
            isCashOut: isCashOut
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

    getPPJackpotWonDetailUrl(rootUrl, baseCurrency, transId, custId, betTypeId) {
        let url = rootUrl + 'JackpotWonBetList/Detail';
        url = QueryString.setParam(url, 'transId', transId);
        url = QueryString.setParam(url, 'custId', custId);
        url = QueryString.setParam(url, 'bettype', betTypeId);
        url = QueryString.setParam(url, 'BaseCurrency', baseCurrency);

        return url;
    }

    getSabaClubJackpotWonDetailUrl(rootUrl, baseCurrency, transId, custId, betTypeId) {
        let url = rootUrl + 'SabaClubJackpotWonBetList/Detail';
        url = QueryString.setParam(url, 'transId', transId);
        url = QueryString.setParam(url, 'custId', custId);
        url = QueryString.setParam(url, 'bettype', betTypeId);
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

    getSGDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType) {
        let url = rootUrl + 'SGBetList/Detail';
        url = QueryString.setParam(url, 'transId', transId);
        url = QueryString.setParam(url, 'date', winlostDate);
        url = QueryString.setParam(url, 'custId', custId);
        url = QueryString.setParam(url, 'transType', transType);
        url = QueryString.setParam(url, 'BaseCurrency', baseCurrency);

        return url;
    }

    getJokerDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType) {
        let url = rootUrl + 'JokerBetList/Detail';
        url = QueryString.setParam(url, 'transId', transId);
        url = QueryString.setParam(url, 'date', winlostDate);
        url = QueryString.setParam(url, 'custId', custId);
        url = QueryString.setParam(url, 'transType', transType);
        url = QueryString.setParam(url, 'BaseCurrency', baseCurrency);

        return url;
    }

    getSexyGamingDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType) {
        let url = rootUrl + 'SexyGamingBetList/Detail';
        url = QueryString.setParam(url, 'transId', transId);
        url = QueryString.setParam(url, 'date', winlostDate);
        url = QueryString.setParam(url, 'custId', custId);
        url = QueryString.setParam(url, 'transType', transType);
        url = QueryString.setParam(url, 'BaseCurrency', baseCurrency);

        return url;
    }

    getSAGamingDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType) {
        let url = rootUrl + 'SAGamingBetList/Detail';
        url = QueryString.setParam(url, 'transId', transId);
        url = QueryString.setParam(url, 'date', winlostDate);
        url = QueryString.setParam(url, 'custId', custId);
        url = QueryString.setParam(url, 'transType', transType);
        url = QueryString.setParam(url, 'BaseCurrency', baseCurrency);

        return url;
    }

    getSBCDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType) {
        let url = rootUrl + 'SabaClubBetList/Detail';
        url = QueryString.setParam(url, 'transId', transId);
        url = QueryString.setParam(url, 'date', winlostDate);
        url = QueryString.setParam(url, 'custId', custId);
        url = QueryString.setParam(url, 'transType', transType);
        url = QueryString.setParam(url, 'BaseCurrency', baseCurrency);

        return url;
    }

    getBGGDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType) {
        let url = rootUrl + 'BGGBetList/Detail';
        url = QueryString.setParam(url, 'transId', transId);
        url = QueryString.setParam(url, 'date', winlostDate);
        url = QueryString.setParam(url, 'custId', custId);
        url = QueryString.setParam(url, 'transType', transType);
        url = QueryString.setParam(url, 'BaseCurrency', baseCurrency);

        return url;
    }

    getPGSDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType) {
        let url = rootUrl + 'PGSoftBetList/Detail';
        url = QueryString.setParam(url, 'transId', transId);
        url = QueryString.setParam(url, 'date', winlostDate);
        url = QueryString.setParam(url, 'custId', custId);
        url = QueryString.setParam(url, 'transType', transType);
        url = QueryString.setParam(url, 'BaseCurrency', baseCurrency);

        return url;
    }

    getGDGDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType) {
        let url = rootUrl + 'GDGBetList/Detail';
        url = QueryString.setParam(url, 'transId', transId);
        url = QueryString.setParam(url, 'date', winlostDate);
        url = QueryString.setParam(url, 'custId', custId);
        url = QueryString.setParam(url, 'transType', transType);
        url = QueryString.setParam(url, 'BaseCurrency', baseCurrency);

        return url;
    }

    getHabaneroDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType) {
        let url = rootUrl + 'HabaneroBetList/Detail';
        url = QueryString.setParam(url, 'transId', transId);
        url = QueryString.setParam(url, 'date', winlostDate);
        url = QueryString.setParam(url, 'custId', custId);
        url = QueryString.setParam(url, 'transType', transType);
        url = QueryString.setParam(url, 'BaseCurrency', baseCurrency);

        return url;
    }

    getWMDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType) {
        let url = rootUrl + 'WMBetList/Detail';
        url = QueryString.setParam(url, 'transId', transId);
        url = QueryString.setParam(url, 'date', winlostDate);
        url = QueryString.setParam(url, 'custId', custId);
        url = QueryString.setParam(url, 'transType', transType);
        url = QueryString.setParam(url, 'BaseCurrency', baseCurrency);

        return url;
    }

    getVGamingDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType) {
        let url = rootUrl + 'VGamingBetList/Detail';
        url = QueryString.setParam(url, 'transId', transId);
        url = QueryString.setParam(url, 'date', winlostDate);
        url = QueryString.setParam(url, 'custId', custId);
        url = QueryString.setParam(url, 'transType', transType);
        url = QueryString.setParam(url, 'BaseCurrency', baseCurrency);

        return url;
    }

    getVGamingJackpotWonDetailUrl(rootUrl, baseCurrency, transId, custId, betTypeId) {
        let url = rootUrl + 'VGamingJackpotWonBetList/Detail';
        url = QueryString.setParam(url, 'transId', transId);
        url = QueryString.setParam(url, 'custId', custId);
        url = QueryString.setParam(url, 'bettype', betTypeId);
        url = QueryString.setParam(url, 'BaseCurrency', baseCurrency);

        return url;
    }

    getSGJackpotWonDetailUrl(rootUrl, baseCurrency, transId, custId, betTypeId) {
        let url = rootUrl + 'SGJackpotWonBetList/Detail';
        url = QueryString.setParam(url, 'transId', transId);
        url = QueryString.setParam(url, 'custId', custId);
        url = QueryString.setParam(url, 'bettype', betTypeId);
        url = QueryString.setParam(url, 'BaseCurrency', baseCurrency);

        return url;
    }

    getCGDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType) {
        let url = rootUrl + 'CreativeGamingBetList/Detail';
        url = QueryString.setParam(url, 'transId', transId);
        url = QueryString.setParam(url, 'date', winlostDate);
        url = QueryString.setParam(url, 'custId', custId);
        url = QueryString.setParam(url, 'transType', transType);
        url = QueryString.setParam(url, 'BaseCurrency', baseCurrency);

        return url;
    }

    getRngBetlistDetailUrl(rootUrl, baseCurrency, transId, winlostDate, custId, transType, productCode) {
        let url = rootUrl + 'RNGBetList/Detail';
        url = QueryString.setParam(url, 'transId', transId);
        url = QueryString.setParam(url, 'date', winlostDate);
        url = QueryString.setParam(url, 'custId', custId);
        url = QueryString.setParam(url, 'transType', transType);
        url = QueryString.setParam(url, 'BaseCurrency', baseCurrency);
        url = QueryString.setParam(url, 'productCode', productCode);

        return url;
    }

    getRngCasinoResultUrl(rootUrl) {
        return rootUrl + 'ResultReport/ShowRngCasinoSingleWalletResult';
    }

    getSabaClubResultUrl(rootUrl, custid, gameId, siteId, gameRoundId, sportType) {
        let url = rootUrl + 'SabaClubResultPopup/Index';
        url = QueryString.setParam(url, 'custid', custid);
        url = QueryString.setParam(url, 'gameId', gameId);
        url = QueryString.setParam(url, 'siteId', siteId);
        url = QueryString.setParam(url, 'gameRoundId', gameRoundId);
        url = QueryString.setParam(url, 'sportType', sportType);

        return url;
    }

    getVRGResultUrl(rootUrl, gamePlayId, platform) {
        let url = rootUrl + 'VirtualGamesResultPopup/Index';
        url = QueryString.setParam(url, 'gamePlayId', gamePlayId);
        url = QueryString.setParam(url, 'platform', platform);

        return url;
    }

    getAllBetResultUrl(rootUrl, transdesc, betcheck, bettype) {
        let url = rootUrl + 'ResultReport/AllBetResult';
        url = QueryString.setParam(url, 'betcheck', betcheck);
        url = QueryString.setParam(url, 'bettype', bettype);
        url = QueryString.setParam(url, 'transdesc', encodeURIComponent(transdesc));

        return url;
    }

    getSAGamingResultUrl(rootUrl, transdesc, matchCode, bettype) {
        let url = rootUrl + 'ResultReport/SAGaming';
        url = QueryString.setParam(url, 'matchCode', matchCode);
        url = QueryString.setParam(url, 'bettype', bettype);
        url = QueryString.setParam(url, 'transdesc', encodeURIComponent(transdesc));

        return url;
    }

    getSexyGamingResultUrl(rootUrl, transdesc, matchCode, bettype) {
        let url = rootUrl + 'ResultReport/SexyGaming';
        url = QueryString.setParam(url, 'matchCode', matchCode);
        url = QueryString.setParam(url, 'bettype', bettype);
        url = QueryString.setParam(url, 'transdesc', encodeURIComponent(transdesc));

        return url;
    }

    getGlobalGamingResultUrl(rootUrl, custid, gameId) {
        let url = rootUrl + 'ResultReport/GlobalGamingResult';
        url = QueryString.setParam(url, 'custid', custid);
        url = QueryString.setParam(url, 'gameId', gameId);

        return url;
    }

    getWMResultUrl(rootUrl, transDesc, gameId3rd, bettype) {
        let url = rootUrl + 'ResultReport/WM';
        url = QueryString.setParam(url, 'gameId3rd', gameId3rd);
        url = QueryString.setParam(url, 'bettype', bettype);
        url = QueryString.setParam(url, 'transdesc', encodeURIComponent(transDesc));

        return url;
    }

    getVGamingResultUrl(rootUrl, custid, gameId, siteId, gameRoundId, sportType, currencyName) {
        let url = rootUrl + 'ResultReport/VGaming';
        url = QueryString.setParam(url, 'custid', custid);
        url = QueryString.setParam(url, 'gameId', gameId);
        url = QueryString.setParam(url, 'siteId', siteId);
        url = QueryString.setParam(url, 'gameRoundId', gameRoundId);
        url = QueryString.setParam(url, 'sportType', sportType);
        url = QueryString.setParam(url, 'currencyName', currencyName);

        return url;
    }

    getThirdPartyProductResultUrl(rootUrl, custId, transId3rd, gameId3rd, currencyId, siteId, betTypeId, productPath) {
        let url = rootUrl + 'ThirdPartyResultPopup/Index';
        url = QueryString.setParam(url, 'custId', custId);
        url = QueryString.setParam(url, 'transId3rd', transId3rd);
        url = QueryString.setParam(url, 'gameId3rd', gameId3rd);
        url = QueryString.setParam(url, 'currencyId', currencyId);
        url = QueryString.setParam(url, 'siteId', siteId);
        url = QueryString.setParam(url, 'betTypeId', betTypeId);
        url = QueryString.setParam(url, 'productPath', productPath);

        return url;
    }

    getVS3ResultUrl(rootUrl, transdecs, sporttype) {
        let url = rootUrl + 'ResultReport/ResultPopup' + '?transDesc=' + transdecs + '&sporttype=' + sporttype;

        return url;
    }
}

export default new BetList();