import { ActionCreators } from '../../actions/index.js'
import LangHelper from '@jsroot/lib/langHelper'
import AppData from '@jsroot/lib/AppData'
import DataService from '@jsroot/lib/DataService.js'
import { ApiUrl } from '../../../common/lib/constants'
import Service from '../../../common/lib/Service'
import { SearchingIdOptions } from '../../lib/constants'
import { useValidParam } from './useValidParam.jsx'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { saveAs } from 'file-saver'

export const useFilterAction = () => {
    const isValidModel = useValidParam();
    const dispatch = useDispatch();
    const {requestParam, searchingIdOption, searchingId, username, isConvertAll, selectedBaseCurrency} = useSelector( state => state, shallowEqual);
    const {setReportTitle, setRequestParam, toggleLoader, getGridData} = ActionCreators;

    const _getParams = () => {
        if (!isValidModel) {
            return null;
        }

        const { PageSize, SortBy, SortOrder } = requestParam;

        return {
            PageSize: PageSize,
            PageIndex: 1,
            Refno: searchingIdOption === SearchingIdOptions.refNo ? searchingId : '',
            TxId: searchingIdOption === SearchingIdOptions.txID ? searchingId : '',
            Username: username,
            BaseCurrency: isConvertAll ? selectedBaseCurrency : '',
            IsConvertAll: isConvertAll,
            SortBy: SortBy,
            SortOrder: SortOrder
        }
    }

    const submit = (event) => {
        event.preventDefault();
        const params = _getParams();
        if (!params) {
            return;
        }

        dispatch(setReportTitle(Service.getTitle(null, null, params.BaseCurrency)));
        dispatch(setRequestParam(params));
        dispatch(toggleLoader(true));
        dispatch(getGridData(ApiUrl.REFNO_DATA_URL, params));
    }

    const exportExcel = (event) => {
        event.preventDefault();

        const params = _getParams();
        if (!params) {
            return;
        }

        if (AppData.isAllowTxIDColumn) {
            params.IsAllowTxIDColumn = true;
        }

        params.IsExport = true;
        dispatch(toggleLoader(true));

        DataService.getFile(ApiUrl.REFNO_DATA_URL, params).then((response) => {
            const NoContentStatusCode = 204;

            if (response.status === NoContentStatusCode) {
                alert(LangHelper.getSingleResource("NoInfo"));
            } else {
                const blob = new Blob([response.data], {type: "application/vnd.ms-excel"});
                saveAs(blob, 'BettingTicketsCenter_RefNo.xls');
            }
            dispatch(toggleLoader(false));
        });
    }


    return {submit, exportExcel};
  }

  export default useFilterAction;