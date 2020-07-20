import { Url } from '../constants';

export default class QueryHelper {
    static FetchBetList({ params, toggleLoader, getGridData }) {
        toggleLoader(true);
        getGridData(Url.AbnormalBetList, params);
    }
}