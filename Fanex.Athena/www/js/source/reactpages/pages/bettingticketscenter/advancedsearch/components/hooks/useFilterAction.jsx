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
        selectedCustomerClass,
        sportList,
        bettypeList,
        selectedCashOutMode}
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
            SportIds: Service.getNormalizedSelectedParamValueForTreeListFilter(selectedSport, sportList),
            BetTypeIds: Service.getSelectedBettype(selectedBettype, bettypeList),
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
            CashOutMode: selectedCashOutMode,
            OddsGroup: selectedOddsGroup,
            CustomerClass: selectedCustomerClass
        }
    }

    const _showExportWarning = () => {
        toast.success(<ToastMsg />);
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

        var exportParams = {
            ...params,
            PageIndex : 1,
            PageSize : 2147483646
        };

        DataService.postData(ApiUrl.ADVANCEDSEARCH_EXPORTSTATUS_URL, exportParams)
            .then(response => _handleExportStatusResponse(response, exportParams))
            .catch(() => {
                alert(LangHelper.getSingleResource("ErrorProcessingMsg"));
            })
            .finally(() => {
                dispatch(toggleLoader(false));
            });
    }

    const _handleExportStatusResponse = (response, exportParams) => {
        const RowsExceedLimitErrorCode = 1001;
        const ExportMultipleFile = 1002;
        const ExportSingleFile = 1003;

        if (response.data.StatusCode === RowsExceedLimitErrorCode) {
            return _showExportWarning();
        } else if (response.data.StatusCode === ExportMultipleFile) {
            exportParams.PageSize = response.data.PageSize;
    
            const fetchNextPage = (pageIndex) => {
                return DataService.getFile(ApiUrl.ADVANCEDSEARCH_DATA_URL, {
                    ...exportParams,
                    PageIndex: pageIndex
                }).then((response) => {
                    const isNext = _handleExportResponse(response, null, false);

                    if (isNext) {
                        return fetchNextPage(pageIndex + 1);
                    } else {
                        return Promise.resolve();
                    }
                }).catch(() => {
                    return Promise.reject();
                });
            };

            return fetchNextPage(1);
    
        } else {
            return DataService.getFile(ApiUrl.ADVANCEDSEARCH_DATA_URL, exportParams).then((response) =>
                _handleExportResponse(response, "BettingTicketsCenter_AdvancedSearch", true)
            );
        }
    };
    
    const _handleExportResponse = (response, exportName, showNoInfo) => {
        const contentType = response.headers["content-type"];
        
        if (contentType && contentType.indexOf('application/json') > -1) {
            Site.readAsJson(response.data, (result) => {
                const msg = result.ErrorMsg || LangHelper.getSingleResource("ErrorProcessingMsg");
                alert(msg);
            });
        } else {
            const NoContentStatusCode = 204;
            const PartialContentStatusCode = 206;
            if (response.status === NoContentStatusCode) {
                if(showNoInfo) {
                    alert(LangHelper.getSingleResource("NoInfo"));
                }
            } 
            else {
                exportName = exportName || getFileNameFromHeader(response) || "BettingTicketsCenter_AdvancedSearch";
                const fileName = exportName + "." +
                    (response.headers["content-type"] === "application/zip" ? "zip" : "xls");
                const blob = new Blob([response.data], { type: response.headers["content-type"] });
                saveAs(blob, fileName);
                return response.status === PartialContentStatusCode;
            }
        }

        return false;
    };

    const getFileNameFromHeader = (response) => {
        return  response.headers["x-file-name"];
    }

    return { submit, exportExcel };
}

export default useFilterAction;