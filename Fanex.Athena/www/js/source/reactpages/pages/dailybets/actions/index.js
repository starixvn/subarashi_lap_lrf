import { toggleLoader } from '@jsroot/actions/loaderAction';
import * as requestParamAction from '@jsroot/actions/requestParamAction';
import * as reportTitleAction from '@jsroot/actions/reportTitleAction';
import { setPagingOption } from '@jsroot/actions/pagingOptionAction';
import { setGridData } from '@jsroot/actions/gridDataAction';

import Site from '@jsroot/lib/site';
import DataService from '@jsroot/lib/DataService';

const emptyData = { dataList: [], total: {} };
const defaultPaingOption = { TotalItem: 0 };

const dispatchResult = (dispatch, data, pagingOption) => {
    dispatch(setGridData(data));
    dispatch(setPagingOption(pagingOption));
    dispatch(toggleLoader(false));
}

const apiUrl = Site.resolveClientUrl('DailyBetsReport/Index');
const getData = (param) => (dispatch) => {
    dispatch(toggleLoader(true));

    DataService.postData(apiUrl, param)
        .then(response => {
            const { dataList, total, totalRows } = response.data;
            const data = {
                dataList: dataList || [],
                total: total || {}
            };
            const newPagingOption = {
                TotalItem: totalRows,
                PageSize: param.pageSize,
                PageIndex: param.pageIndex
            }
            dispatchResult(dispatch, data, newPagingOption);
        })
        .catch(error => {
            console.log(error.message);
            dispatchResult(dispatch, {...emptyData }, {...defaultPaingOption });
        });
}

export const ActionCreators = Object.assign({},
    requestParamAction,
    reportTitleAction, { getData }
);