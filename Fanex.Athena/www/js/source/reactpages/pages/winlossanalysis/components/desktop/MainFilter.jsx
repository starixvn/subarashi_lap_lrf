import React, { useEffect, memo } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { ToastContainer, Flip } from 'react-toastify';
import CollapsiblePanel from '@jsroot/components/collapsible-panel'
import AppData from '@jsroot/lib/AppData'
import useBaseCurrencyForMultiSelectCurrency from '@jsroot/customHooks/useBaseCurrencyForMultiSelectCurrency'
import { useFilterHandler } from '../hooks/useFilterHandler.jsx';
import useDisabledGroupInOriginalCurrency from '../hooks/useIsDisabledGroupInOriginalCurrency';
import SubsidiaryDropDownFilter from '../filters/SubsidiaryDropDownFilter';
import useSubsidiarySearch from '@jsroot/customHooks/useSubsidiarySearch'
import DateRangeFilter from '../filters/DateRangeFilter.jsx';
import Service from '../../common/Service.js';
import ProductFilter from '../filters/ProductFilter.jsx';
import SportFilter from '../filters/SportFilter.jsx';
import BetTypeFilter from '../filters/BetTypeFilter.jsx';
import PlatformFilter from '../filters/PlatformFilter.jsx';
import StatusFilter from '../filters/StatusFilter.jsx';
import LiveStatusFilter from '../filters/LiveStatusFilter.jsx';
import BaseCurrencyFilter from '../filters/BaseCurrencyFilter.jsx';
import VipOnlyFilter from '../filters/VipOnlyFilter.jsx';
import RiskLevelFilter from '../filters/RiskLevelFilter.jsx';
import OddsGroupFilter from '../filters/OddsGroupFilter.jsx';
import UserNameFilter from '../filters/UserNameFilter.jsx';
import GroupInOriginalCurrencyCheckBoxFilter from '../filters/GroupInOriginalCurrencyCheckBoxFilter.jsx';
import ExcludeTestDataCheckBoxFilter from '../filters/ExcludeTestDataCheckBoxFilter.jsx';
import ViewCashOutOnlyFilter from '../filters/ViewCashOutOnlyFilter.jsx';
import SubsidiaryCheckBoxFilter from '../filters/SubsidiaryCheckBoxFilter.jsx';
import StickyIcon from '../filters/StickyIcon.jsx';
import CurrencyFilter from '../filters/CurrencyFilter.jsx';

export const MainFilter = () => {
    const { appUuid, dateRange, selectedProduct, selectedSport, sportList, selectedBettype, bettypeList, selectedPlatform,
        selectedStatus, selectedLiveStatus, selectedBaseCurrency, selectedVipOnly, selectedCustomerClass, selectedOddsGroup,
        searchMode, isGroupInOriginalCurrency, isExcludeTestData, isViewCashOutOnly, selectedCurrency }
        = useSelector(state => state, shallowEqual)
    const { isShowSubsidiaryDropdown, isSubsidiarySearch, isShowSubsidiarySearchCheckBox, } = useSubsidiarySearch();
    const { baseCurrencyList, selectedBaseCurrency: newBaseCurrency } = useBaseCurrencyForMultiSelectCurrency(selectedBaseCurrency);
    const { onSubsidiaryDropDownChangeHandler, onDateRangeChangeHandler, onProductChangeHandler, onSportChangeHandler, onBetTypeChangeHandler,
        onPlatformChangeHandler, onStatusChangeHandler, onLiveStatusChangeHandler, onBaseCurrencyChangeHandler, onVipOnlyChangeHandler, onRiskLevelChangeHandler,
        onOddsGroupChangeHandler, onSearchModeChangeHandler, onUserNameInputHandler, onGroupInOriginalCurrencyChangeHandler, onExcludeTextDataChangeHandler,
        onCashOutOnlyChangeHandler, onSubsidiaryCheckBoxChangeHandler, onCurrencyChangeHandler
    } = useFilterHandler();
    const { isOfferCashOutProduct, isHasPermissionViewVip } = AppData;
    const isEnableCashOutFilter = Service.isContainProductSportBookOrBa(selectedProduct);
    const isDisabledGroupInOriginalCurrency = useDisabledGroupInOriginalCurrency();

    useEffect(() => { onProductChangeHandler(null, selectedProduct) }, [appUuid]);
    useEffect(() => { onBaseCurrencyChangeHandler({ value: newBaseCurrency }) }, [newBaseCurrency])
    useEffect(() => { onSubsidiaryCheckBoxChangeHandler(!isShowSubsidiarySearchCheckBox && isShowSubsidiaryDropdown) }, []);

    return (
        <CollapsiblePanel className="page-filter" isCollapseMode={false} stickyFooter={<StickyIcon />}>
            <div className="row">
                <ToastContainer
                    autoClose={10000}
                    pauseOnFocusLoss={false}
                    style={{ width: "500px" }}
                    transition={Flip} />

                {isShowSubsidiaryDropdown && isSubsidiarySearch && <div className="col-12 col-md-3 col-sm-4 col-lg-3 col-xl-2">
                    <SubsidiaryDropDownFilter key={`subsidiary-${appUuid}`} onChange={onSubsidiaryDropDownChangeHandler} />
                </div>}

                <div className="col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2">
                    <DateRangeFilter key={`date-${appUuid}`} onChange={onDateRangeChangeHandler} dateRange={dateRange} />
                </div>

                <div className="col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2">
                    <ProductFilter key={`product-${appUuid}`} onChange={onProductChangeHandler} isValid={!!selectedProduct} value={selectedProduct} />
                </div>

                <div className="col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2">
                    <SportFilter key={`sport-${appUuid}`} onChange={onSportChangeHandler} isValid={!!selectedSport} dataSource={sportList} />
                </div>

                <div className="col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2">
                    <BetTypeFilter key={`bettype-${appUuid}`} onChange={onBetTypeChangeHandler} isValid={!!selectedBettype} dataSource={bettypeList} />
                </div>

                <div className="col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2">
                    <PlatformFilter key={`platform-${appUuid}`} onChange={onPlatformChangeHandler} isValid={!!selectedPlatform} />
                </div>

                <div className="col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2">
                    <StatusFilter key={`status-${appUuid}`} onChange={onStatusChangeHandler} isValid={!!selectedStatus} />
                </div>

                <div className="col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2">
                    <LiveStatusFilter key={`live-status-${appUuid}`} onChange={onLiveStatusChangeHandler} isValid={!!selectedLiveStatus} />
                </div>

                <div className="col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2">
                    <CurrencyFilter key={`currency-${appUuid}`} isValid={!!selectedCurrency} onChange={onCurrencyChangeHandler}/>
                </div>

                <div className="col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2">
                    <BaseCurrencyFilter key={`base-currency-${appUuid}`} onChange={onBaseCurrencyChangeHandler} options={baseCurrencyList} value={selectedBaseCurrency} />
                </div>

                {isHasPermissionViewVip && <div className="col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2">
                    <VipOnlyFilter key={`vip-only-${appUuid}`} onChange={onVipOnlyChangeHandler} value={selectedVipOnly} />
                </div>}

                <div className="col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2">
                    <RiskLevelFilter key={`risk-level-${appUuid}`} onChange={onRiskLevelChangeHandler} isValid={!!selectedCustomerClass} />
                </div>

                <div className="col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2">
                    <OddsGroupFilter key={`odds-group-${appUuid}`} onChange={onOddsGroupChangeHandler} isValid={!!selectedOddsGroup} />
                </div>

                <div className="col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2">
                    <UserNameFilter key={`username-${appUuid}`} onChangeSearchMode={onSearchModeChangeHandler} onChangeUserName={onUserNameInputHandler} searchMode={searchMode} />
                </div>

                <div className="col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2">
                    <GroupInOriginalCurrencyCheckBoxFilter disabled={isDisabledGroupInOriginalCurrency} checked={isGroupInOriginalCurrency} onChange={onGroupInOriginalCurrencyChangeHandler} />
                </div>

                <div className="col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2">
                    <ExcludeTestDataCheckBoxFilter checked={isExcludeTestData} onChange={onExcludeTextDataChangeHandler} />
                </div>

                {isOfferCashOutProduct &&
                    <div className="col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2">
                        <ViewCashOutOnlyFilter onChange={onCashOutOnlyChangeHandler} disabled={!isEnableCashOutFilter} checked={isViewCashOutOnly} />
                    </div>
                }

                {isShowSubsidiarySearchCheckBox && (
                    <div className='col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2'>
                        <SubsidiaryCheckBoxFilter value={isSubsidiarySearch} onChange={onSubsidiaryCheckBoxChangeHandler} />
                    </div>
                )}
            </div>
        </CollapsiblePanel>
    )

}

export default memo(MainFilter);
