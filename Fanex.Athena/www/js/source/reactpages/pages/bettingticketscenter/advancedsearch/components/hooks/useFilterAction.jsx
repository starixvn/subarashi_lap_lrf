import React from 'react'
import { ActionCreators } from '../../actions/index.js'
import LangHelper from '@jsroot/lib/langHelper'
import Site from '@jsroot/lib/site'
import AppData from '@jsroot/lib/AppData'
import DataService from '@jsroot/lib/DataService.js'
import useBaseCurrencyForMultiSelectCurrency from '@jsroot/customHooks/useBaseCurrencyForMultiSelectCurrency'
import useSubsidiarySearch from '@jsroot/customHooks/useSubsidiarySearch'
import { ApiUrl, HttpStatusCode } from '../../../common/lib/constants'
import Service from '../../../common/lib/Service'
import { useValidParam } from './useValidParam'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import useIsEnableLeagueMatch from './useIsEnableLeagueMatch'
import { toast } from 'react-toastify'
import { saveAs } from 'file-saver'
import {decode} from '@jsroot/lib/htmlHelper';
import NumberFormat from '@jsroot/lib/numberFormat'

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

    const ToastMsg = (props) => (
        <div>
            <div>{decode(LangHelper.getSingleResource("BTCMaxTicketLimitMsg")).replace("{0}", NumberFormat.formatInteger(props.limit))}</div>
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

    const _showExportWarning = (limitRows) => {
        toast.success(<ToastMsg limit={limitRows}/>);
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

        const { PageSize, ...rest } = params;
        const exportParams = { ...rest };

        _handleExport(exportParams)
            .catch(() => {
                alert(LangHelper.getSingleResource("ErrorProcessingMsg"));
            })
            .finally(() => {
                dispatch(toggleLoader(false));
            });
    }

    const _handleExport = (exportParams) => {
        const fetchNextPage = (pageIndex) => {
            return DataService.getFile(ApiUrl.ADVANCEDSEARCH_DATA_URL, {
                ...exportParams,
                PageIndex: pageIndex
            }).then((response) => {
                const isNext = _handleExportResponse(response, pageIndex);

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

    };

    const _handleExportResponse = (response, pageIndex) => {
        const contentType = response.headers["content-type"];
        var fileName = "BettingTicketsCenter_AdvancedSearch.xlsx";

        if (contentType && contentType.indexOf('application/json') > -1) {
            Site.readAsJson(response.data, (result) => {
                const msg = result.ErrorMsg || LangHelper.getSingleResource("ErrorProcessingMsg");
                return alert(msg);
            });
        } else {
            if (response.status === HttpStatusCode.Limit)
            {
                return _showExportWarning(Number(response.statusText));
            }

            if (response.status === HttpStatusCode.NoContent && pageIndex === 1) {
                return alert(LangHelper.getSingleResource("NoInfo"));
            }

            fileName = getFileNameFromHeader(response) || fileName;
            const blob = new Blob([response.data], { type: response.headers["content-type"] });
            saveAs(blob, fileName);

            return response.status === HttpStatusCode.PartialContent;
        }
    };

    const getFileNameFromHeader = (response) => {
        return  response.headers["x-file-name"];
    }

    return { submit, exportExcel };
}

export default useFilterAction;