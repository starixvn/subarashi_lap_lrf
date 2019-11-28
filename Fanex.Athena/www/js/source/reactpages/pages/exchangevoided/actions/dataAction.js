import { toggleLoader } from '@jsroot/actions/loaderAction';
import { setPagingOption } from '@jsroot/actions/pagingOptionAction';
import { setGridData } from '@jsroot/actions/gridDataAction';

import Site from '@jsroot/lib/site';
import DataService from '@jsroot/lib/DataService';
import LangHelper from '@jsroot/lib/langHelper';

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

export const exportExcel = (param) => (dispatch) => {
    dispatch(toggleLoader(true));

    DataService.getFile(apiUrl, param)
        .then(response => {
            if (response.data.size === 0) {
                alert(LangHelper.getSingleResource("NoInfo"));
            } else {
                //Site.downloadFile(response.data, 'ExchangeVoidTicket.zip');
            }
            dispatch(toggleLoader(false));
        })
        .catch(error => {
            console.log(error.message);
            dispatch(toggleLoader(false));
        });
}