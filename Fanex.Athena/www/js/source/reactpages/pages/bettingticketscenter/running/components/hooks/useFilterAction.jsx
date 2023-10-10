import { ActionCreators } from '../../actions/index.js'
import LangHelper from '@jsroot/lib/langHelper'
import Site from '@jsroot/lib/site'
import AppData from '@jsroot/lib/AppData'
import DataService from '@jsroot/lib/DataService.js'
import useBaseCurrencyList from '@jsroot/customHooks/useBaseCurrencyList'
import { ApiUrl } from '../../../common/lib/constants'
import Service from '../../../common/lib/Service'
import { useValidParam } from './useValidParam.jsx'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useSubsidiarySearch } from './useSubsidiarySearch.jsx'

export const useFilterAction = () => {
    const isValidModel = useValidParam();
    const dispatch = useDispatch();
    const {requestParam, username, isConvertAll, selectedBaseCurrency, selectedProduct, selectedCurrency, selectedStatus, selectedSubsidiary} = useSelector( state => state, shallowEqual);
    const {isSubsidiarySearch} = useSubsidiarySearch();
    const baseCurrencyList = useBaseCurrencyList();
    const {setReportTitle, setRequestParam, toggleLoader, getGridData} = ActionCreators;

    const _getParams = () => {
        if (!isValidModel) {
            return null;
        }

        const { PageSize, SortBy, SortOrder } = requestParam;
        const baseCurrency = baseCurrencyList.find(x => x.value === selectedBaseCurrency);
        
        return {
            PageSize: PageSize,
            PageIndex: 1,
            ProductCodeList: selectedProduct,
            Username: username,
            CurrencyIdList: selectedCurrency,
            BaseCurrency: selectedBaseCurrency,
            Status: selectedStatus,
            SortBy: SortBy,
            SortOrder: SortOrder,
            IsConvertAll: isConvertAll,
            BaseCurrencyName: baseCurrency ? baseCurrency.label : '',
            SubsidiarySearch: isSubsidiarySearch,
            SubsidiaryList: isSubsidiarySearch ? selectedSubsidiary : ""
        }
    }

    const submit = (event) => {
        event.preventDefault();
        const params = _getParams();
        if (!params) {
            return;
        }

        dispatch(setReportTitle(Service.getTitle(null, null, params.IsConvertAll ? params.BaseCurrencyName : '')));
        dispatch(setRequestParam(params));
        dispatch(toggleLoader(true));
        dispatch(getGridData(ApiUrl.RUNNING_DATA_URL, params));
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
        DataService.getFile(ApiUrl.RUNNING_DATA_URL, params).then((response) => {
            const NoContentStatusCode = 204;

            if (response.status === NoContentStatusCode) {
                alert(LangHelper.getSingleResource("NoInfo"));
            } else {
                Site.downloadFile(response.data, 'BettingTicketsCenter_Running.xls');
            }
            dispatch(toggleLoader(false));
        });
    }

    return {submit, exportExcel};
  }

  export default useFilterAction;