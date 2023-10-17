import { useSelector } from 'react-redux'
import AppData from '@jsroot/lib/AppData'
import { SubsidiaryViewType } from '@jsroot/constants/report'

export const useSubsidiarySearch = () => {
    const isSubsidiarySearch = useSelector(state => state.subsidiarySearch);
    const defaultSelectedSubsidiary = AppData.subsidiaryList.join(',');
    const isShowSubsidiaryDropdown = AppData.subsidiaryViewType !== SubsidiaryViewType.NOT_MANAGEMENT && AppData.subsidiaryList.length > 0;
    const isShowSubsidiarySearchCheckBox = isShowSubsidiaryDropdown && AppData.subsidiaryViewType === SubsidiaryViewType.MASTER_MANAGEMENT;
    const isWhiteLabelView = AppData.subsidiaryViewType === SubsidiaryViewType.MASTER_MANAGEMENT && !AppData.isOneworksMaster;
    return { isSubsidiarySearch, isShowSubsidiaryDropdown, isShowSubsidiarySearchCheckBox, isWhiteLabelView, defaultSelectedSubsidiary};
}

export default useSubsidiarySearch;