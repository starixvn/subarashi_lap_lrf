import { ActionCreators } from '../../actions/index.js'
import LangHelper from '@jsroot/lib/langHelper'
import AppData from '@jsroot/lib/AppData'
import DataService from '@jsroot/lib/DataService.js'
import useBaseCurrencyForMultiSelectCurrency from '@jsroot/customHooks/useBaseCurrencyForMultiSelectCurrency'
import useSubsidiarySearch  from '@jsroot/customHooks/useSubsidiarySearch'
import { ApiUrl } from '../../../common/lib/constants'
import Service from '../../../common/lib/Service'
import { useValidParam } from './useValidParam.jsx'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { saveAs } from 'file-saver';

export const useFilterAction = () => {
    const isValidModel = useValidParam();
    const dispatch = useDispatch();
    const {requestParam, username, isConvertAll, selectedBaseCurrency, selectedProduct, selectedCurrency, selectedStatus, selectedSubsidiary, 
        selectedLiveStatus, selectedPlatform, selectedSport, selectedBettype, selectedLeague, selectedMatch, ip, selectedOddsGroup, selectedCustomerClass, sportList, isEnableLeague, isEnableMatch } = useSelector( state => state, shallowEqual);
    const {isSubsidiarySearch} = useSubsidiarySearch();
    const { baseCurrencyList } = useBaseCurrencyForMultiSelectCurrency(selectedBaseCurrency);
    const { setReportTitle, setRequestParam, toggleLoader, getGridData} = ActionCreators;

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
            LiveStatus: selectedLiveStatus,
            SportIds: Service.getNormalizedSelectedParamValueForTreeListFilter(selectedSport, sportList),
            BetTypeIds: Service.getSelectedBettype(selectedBettype),
            LeagueIds: isEnableLeague ? selectedLeague : 0,
            MatchId: isEnableMatch ? selectedMatch : 0,
            Ip: ip,
            Platform: selectedPlatform,
            OddsGroup: selectedOddsGroup,
            CustomerClass: selectedCustomerClass,
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
                const blob = new Blob([response.data], {type: "application/vnd.ms-excel"});
                saveAs(blob, 'BettingTicketsCenter_Running.xls');
            }
            dispatch(toggleLoader(false));
        });
    }

    return {submit, exportExcel};
  }

  export default useFilterAction;