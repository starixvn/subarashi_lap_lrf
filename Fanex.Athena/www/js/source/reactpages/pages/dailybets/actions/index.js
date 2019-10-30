import * as loaderAction from '@jsroot/actions/loaderAction';
import * as requestParamAction from '@jsroot/actions/requestParamAction';
import * as reportTitleAction from '@jsroot/actions/reportTitleAction';
import * as pagingOptionAction from '@jsroot/actions/pagingOptionAction';

import Site from '@jsroot/lib/site';
import DataService from '@jsroot/lib/DataService';

const apiUrl = Site.resolveClientUrl('DailyBetsReport/Index');
const getData = (param) => () => {
    return DataService.postData(apiUrl, param)
        .then(response => {
            const { dataList, total, totalRows } = response.data;

            return {
                dataList: dataList || [],
                total: total || {},
                totalRows
            };
        })
        .catch(error => {
            console.log(error.message);
            return { dataList: [], total: {}, totalRows: 0 };
        });
}

export const ActionCreators = Object.assign({},
    loaderAction,
    requestParamAction,
    reportTitleAction,
    pagingOptionAction, { getData }
);