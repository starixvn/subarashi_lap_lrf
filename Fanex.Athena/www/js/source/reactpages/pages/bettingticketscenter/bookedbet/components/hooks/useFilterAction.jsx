import { ActionCreators } from '../../actions/index.js'
import LangHelper from '@jsroot/lib/langHelper'
import Site from '@jsroot/lib/site'
import DataService from '@jsroot/lib/DataService.js'
import { ApiUrl } from '../../../common/lib/constants'
import Service from '../../../common/lib/Service'
import { useValidParam } from './useValidParam.jsx'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { saveAs } from 'file-saver'
import {SearchingIdOptions } from '../../lib/constants'

export const useFilterAction = () => {
    const isValidModel = useValidParam();
    const dispatch = useDispatch();
    const {
        requestParam, 
        isConvertAll,
        selectedCurrency,
        selectedBaseCurrency,
        selectedStatus, 
        dateRange,
        selectedPlatform,
        searchingIdOption,
        searchingId
    } 
        = useSelector( state => state, shallowEqual);
        
    const {setReportTitle, setRequestParam, toggleLoader, getGridData} = ActionCreators;
    const isBookedIDOrRefNoSearch = searchingIdOption === SearchingIdOptions.bookedId || searchingIdOption === SearchingIdOptions.refNo;

    const _getParams = () => {
        if (!isValidModel) {
            return null;
        }

        const { fromDate, toDate } = dateRange;
        const { PageSize, SortBy, SortOrder } = requestParam;

        return {
            PageSize: PageSize,
            PageIndex: 1,
            FromDate: Site.convertDateToString(fromDate),
            ToDate: Site.convertDateToString(toDate),
            searchText: searchingId,
            searchOption: searchingIdOption,
            CurrencyIdList: selectedCurrency,
            BaseCurrency: selectedBaseCurrency,
            Status: selectedStatus,
            Platform: selectedPlatform,
            SortBy: SortBy,
            SortOrder: SortOrder,
            IsConvertAll: isConvertAll
        }
    }

    const submit = (event) => {
        event.preventDefault();
        const params = _getParams();
        if (!params) {
            return;
        }

        dispatch(setReportTitle(Service.getTitle(params.FromDate, params.ToDate, params.BaseCurrency)));
        dispatch(setRequestParam(params));
        dispatch(toggleLoader(true));
        dispatch(getGridData(ApiUrl.BOOKEDBET_DATA_URL, params));
    }

    const exportExcel = (event) => {
        event.preventDefault();

        const params = _getParams();
        if (!params) {
            return;
        }

        params.IsExport = true;
        dispatch(toggleLoader(true));
        DataService.getFile(ApiUrl.BOOKEDBET_DATA_URL, params).then((response) => {
            const NoContentStatusCode = 204;

            if (response.status === NoContentStatusCode) {
                alert(LangHelper.getSingleResource("NoInfo"));
            } else {
                const blob = new Blob([response.data], {type: "application/vnd.ms-excel"});
                saveAs(blob, 'BettingTicketsCenter_BookedBet.xls');
            }
            dispatch(toggleLoader(false));
        });
    }

    return {submit, exportExcel, isBookedIDOrRefNoSearch};
  }

  export default useFilterAction;