import { ActionCreators } from '../../actions/index.js'
import LangHelper from '@jsroot/lib/langHelper'
import Site from '@jsroot/lib/site'
import AppData from '@jsroot/lib/AppData'
import DataService from '@jsroot/lib/DataService.js'
import { ApiUrl } from '../../../common/lib/constants'
import Service from '../../../common/lib/Service'
import { useValidParam } from './useValidParam.jsx'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
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
        selectedSport,
        selectedBettype,
        sportList,
        selectedCashOutMode,
        bettypeList} 
        = useSelector( state => state, shallowEqual);
        
    const {setReportTitle, setRequestParam, toggleLoader, getGridData} = ActionCreators;

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
            ProductCodeList: selectedProduct,
            SportIds: Service.getNormalizedSelectedParamValueForTreeListFilter(selectedSport, sportList),
            BetTypeIds: Service.getSelectedBettype(selectedBettype, bettypeList),
            Username: username,
            BaseCurrency: isConvertAll ? selectedBaseCurrency : '',
            Status: selectedStatus,
            LiveStatus: selectedLiveStatus,
            Platform: selectedPlatform,
            CashOutMode: selectedCashOutMode,
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
        dispatch(getGridData(ApiUrl.SINGLECUSTOMER_DATA_URL, params));
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
        DataService.getFile(ApiUrl.SINGLECUSTOMER_DATA_URL, params).then((response) => {
            const NoContentStatusCode = 204;

            if (response.status === NoContentStatusCode) {
                alert(LangHelper.getSingleResource("NoInfo"));
            } else {
                const blob = new Blob([response.data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
                saveAs(blob, 'BettingTicketsCenter_SinglePlayer.xlsx');
            }
            dispatch(toggleLoader(false));
        });
    }

    return {submit, exportExcel};
  }

  export default useFilterAction;