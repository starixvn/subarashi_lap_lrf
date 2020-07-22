import QueryString from '@jsroot/lib/QueryString';
import { Url } from '../constants';

export default class BetListHelper {
    static buildAbnormalBetListUrl(rootUrl, { custId, externalId, systemId, baseCurrency }) {
        let url = rootUrl + Url.abnormalBetList;
        url = QueryString.setParam(url, 'custId', custId);
        url = QueryString.setParam(url, 'externalId', externalId);
        url = QueryString.setParam(url, 'systemId', systemId);
        url = QueryString.setParam(url, 'baseCurrency', baseCurrency);
        return url;
    }
}