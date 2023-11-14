import React from 'react'
import { ActionCreators } from '../../actions/index.js'
import LangHelper from '@jsroot/lib/langHelper'
import Site from '@jsroot/lib/site'
import AppData from '@jsroot/lib/AppData'
import DataService from '@jsroot/lib/DataService.js'
import useBaseCurrencyForMultiSelectCurrency from '@jsroot/customHooks/useBaseCurrencyForMultiSelectCurrency'
import useSubsidiarySearch from '@jsroot/customHooks/useSubsidiarySearch'
import { ApiUrl } from '../../../common/lib/constants'
import Service from '../../../common/lib/Service'
import { useValidParam } from './useValidParam'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import useIsEnableLeagueMatch from './useIsEnableLeagueMatch'
import { toast } from 'react-toastify'
import { saveAs } from 'file-saver'

export const useFilterAction = () => {
    const isValidModel = useValidParam();
    const dispatch = useDispatch();
    const {
        requestParam,
        username,
        isConvertAll,
        selectedBaseCurrency,
        selectedProduct,
        selectedStatus,
        dateRange,
        selectedLiveStatus,
        selectedPlatform,
        selectedCurrency,
        selectedSport,
        selectedBettype,
        selectedLeague,
        selectedMatch,
        selectedSubsidiary,
        ip,
        selectedOddsGroup,
        selectedCustomerClass }
        = useSelector(state => state, shallowEqual);

    const { baseCurrencyList } = useBaseCurrencyForMultiSelectCurrency(selectedBaseCurrency);
    const isEnableLeagueMatch = useIsEnableLeagueMatch();
    const { isSubsidiarySearch } = useSubsidiarySearch();

    const { setReportTitle, setRequestParam, toggleLoader, getGridData } = ActionCreators;

    const ToastMsg = () => (
        <div>
            <div>{LangHelper.getSingleResource("BTCExportExcelMsg1")}</div>
            <div>{LangHelper.getSingleResource("BTCExportExcelMsg2")}</div>
        </div>
    )

    const _getParams = () => {
        if (!isValidModel) {
            return null;
        }

        const { fromDate, toDate } = dateRange;
        const { PageSize, SortBy, SortOrder } = requestParam;
        const baseCurrency = baseCurrencyList.find(x => x.value === selectedBaseCurrency);

        return {
            PageSize: PageSize,
            PageIndex: 1,
            FromDate: Site.convertDateToString(fromDate),
            ToDate: Site.convertDateToString(toDate),
            ProductCodeList: selectedProduct,
            Username: username,
            CurrencyIdList: selectedCurrency,
            BaseCurrency: selectedBaseCurrency,
            Status: selectedStatus,
            LiveStatus: selectedLiveStatus,
            SportId: selectedSport,
            BetTypeId: selectedBettype,
            LeagueId: isEnableLeagueMatch ? selectedLeague : 0,
            MatchId: isEnableLeagueMatch ? selectedMatch : 0,
            SortBy: SortBy,
            SortOrder: SortOrder,
            IsConvertAll: isConvertAll,
            BaseCurrencyName: baseCurrency ? baseCurrency.label : '',
            SubsidiarySearch: isSubsidiarySearch,
            SubsidiaryList: isSubsidiarySearch ? selectedSubsidiary : "",
            Ip: ip,
            Platform: selectedPlatform,
            OddsGroup: selectedOddsGroup,
            CustomerClass: selectedCustomerClass
        }
    }

    const _showExportWarning = () => {
        toast.success(<ToastMsg />, {
            onClose: () => {
                toast.dismiss();
            }
        });
    }

    const _handleResponse = (response) => {
        toast.dismiss();
        const contentType = response.headers["content-type"];
        if (contentType && contentType.indexOf('application/json') > -1) {
            const RowsExceedLimitErrorCode = 1001;
            Site.readAsJson(response.data, (result) => {
                if (result.ErrorCode === RowsExceedLimitErrorCode) {
                    _showExportWarning();
                }
                else {
                    const msg = result.ErrorMsg || LangHelper.getSingleResource("ErrorProcessingMsg");
                    alert(msg);
                }
            });
        } else {
            const NoContentStatusCode = 204;
            if (response.status === NoContentStatusCode) {
                alert(LangHelper.getSingleResource("NoInfo"));
            }
            else {
                const fileName = "BettingTicketsCenter_AdvancedSearch." +
                    (response.headers["content-type"] === "application/zip" ? "zip" : "xls");
                const blob = new Blob([response.data], { type: response.headers["content-type"] });
                saveAs(blob, fileName);
            }
        }
    }

    const submit = (event) => {
        event.preventDefault();
        const params = _getParams();
        if (!params) {
            return;
        }

        toast.dismiss();
        const title = Service.getTitle(params.FromDate, params.ToDate, params.IsConvertAll ? params.BaseCurrencyName : '');
        dispatch(setReportTitle(title));
        dispatch(setRequestParam(params));
        dispatch(toggleLoader(true));
        dispatch(getGridData(ApiUrl.ADVANCEDSEARCH_DATA_URL, params));
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
        DataService.getFile(ApiUrl.ADVANCEDSEARCH_DATA_URL, params)
            .then(_handleResponse)
            .catch(() => {
                alert(LangHelper.getSingleResource("ErrorProcessingMsg"));
            })
            .finally(() => {
                dispatch(toggleLoader(false));
            });
    }

    return { submit, exportExcel };
}

export default useFilterAction;