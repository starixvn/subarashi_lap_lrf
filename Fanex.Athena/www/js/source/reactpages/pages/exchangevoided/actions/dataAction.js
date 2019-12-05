import { toggleLoader } from '@jsroot/actions/loaderAction';
import { setGridData } from '@jsroot/actions/gridDataAction';

import Site from '@jsroot/lib/site';
import DataService from '@jsroot/lib/DataService';
import ReportExcel from '../lib/reportExcel';

const SUCCESS_CODE = 1;
const UM_ERR_CODE = 101;
const UM_MESSAGE = 'Exchange product is under maintenance now';
const ERROR_MESSAGE = 'Your request cannot be processed now, please try again later';
const dispatchResult = (dispatch, data) => {
    dispatch(setGridData(data));
    dispatch(toggleLoader(false));
}

const apiUrl = Site.resolveClientUrl('ExchangeVoided/Index');
export const getData = (param) => (dispatch) => {
    dispatch(toggleLoader(true));

    DataService.postData(apiUrl, param)
        .then(response => {
            const { dataList, totalPage, errCode } = response.data;
            if (errCode === UM_ERR_CODE) {
                window.alert(UM_MESSAGE);
            } else if (errCode !== SUCCESS_CODE) {
                dispatchResult(dispatch, { dataList: [], totalPage });
                window.alert(ERROR_MESSAGE);
            } else {
                const data = { dataList: dataList || [], totalPage };
                dispatchResult(dispatch, data);
            }
        })
        .catch(error => {
            console.log(error.message);
            dispatchResult(dispatch, { dataList: [], totalPage });
        });
}

export const exportExcel = (dataList, title) => () => {
    const service = new ReportExcel(dataList, title);
    service.export();
}