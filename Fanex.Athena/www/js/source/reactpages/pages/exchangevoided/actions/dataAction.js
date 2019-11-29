import { toggleLoader } from '@jsroot/actions/loaderAction';
import { setPagingOption } from '@jsroot/actions/pagingOptionAction';
import { setGridData } from '@jsroot/actions/gridDataAction';

import Site from '@jsroot/lib/site';
import DataService from '@jsroot/lib/DataService';
import LangHelper from '@jsroot/lib/langHelper';
import ReportExcel from '../lib/reportExcel';

const emptyData = { dataList: [], total: {} };
const defaultPaingOption = { TotalItem: 0 };

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
            console.log(response.data);
            const { dataList, totalPage } = response.data;
            const data = { dataList: dataList || [] };

            const newPagingOption = {
                TotalItem: totalPage * PAGESIZE,
                PageSize: PAGESIZE,
                PageIndex: param.pageIndex
            }
            dispatchResult(dispatch, data, newPagingOption);
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