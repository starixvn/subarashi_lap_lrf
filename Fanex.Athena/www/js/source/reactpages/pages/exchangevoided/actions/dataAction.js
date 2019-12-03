import { toggleLoader } from '@jsroot/actions/loaderAction';
import { setPagingOption } from '@jsroot/actions/pagingOptionAction';
import { setGridData } from '@jsroot/actions/gridDataAction';

import Site from '@jsroot/lib/site';
import DataService from '@jsroot/lib/DataService';
import LangHelper from '@jsroot/lib/langHelper';
import ReportExcel from '../lib/reportExcel';

const defaultPaingOption = { TotalItem: 0 };

const UM_ERR_CODE = 101;
const UM_MESSAGE = 'Exchange product is under maintenance now';
const PAGESIZE = 2000;
const dispatchResult = (dispatch, data, pagingOption) => {
    dispatch(setGridData(data));
    dispatch(setPagingOption(pagingOption));
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
            } else if (errCode !== 0) {
                dispatchResult(dispatch, { dataList: [] }, {...defaultPaingOption });
            } else {
                const data = { dataList: dataList || [] };

                const newPagingOption = {
                    TotalItem: totalPage * PAGESIZE,
                    PageSize: PAGESIZE,
                    PageIndex: param.pageIndex
                }
                dispatchResult(dispatch, data, newPagingOption);
            }
        })
        .catch(error => {
            console.log(error.message);
            dispatchResult(dispatch, { dataList: [] }, {...defaultPaingOption });
        });
}

export const exportExcel = (dataList, title) => () => {
    const service = new ReportExcel(dataList, title);
    service.export();
}