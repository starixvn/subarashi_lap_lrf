import React, { memo, useEffect, useState } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { ToastContainer, Flip } from 'react-toastify';
import CollapsiblePanel from '@jsroot/components/collapsible-panel'
import LangHelper from '@jsroot/lib/langHelper'
import { useValidParam } from '../hooks/useValidParam';
import { useFilterHandler } from '../hooks/useFilterHandler';
import useFilterAction from '../hooks/useFilterAction';
import useIsEnableLeagueMatch from '../hooks/useIsEnableLeagueMatch';
import useBaseCurrencyForMultiSelectCurrency from '@jsroot/customHooks/useBaseCurrencyForMultiSelectCurrency'
import useSubsidiarySearch from '@jsroot/customHooks/useSubsidiarySearch'
import SubsidiaryDropDownFilter from '../filters/SubsidiaryDropDownFilter';
import DateRangeFilter from '../filters/DateRangeFilter';
import ProductFilter from '../filters/ProductFilter';
import SportFilter from '../filters/SportFilter';
import BetTypeFilter from '../filters/BetTypeFilter';
import StickyIcon from '../filters/StickyIcon';
import LeagueFilter from '../filters/LeagueFilter';
import MatchFilter from '../filters/MatchFilter';
import UserNameFilter from '../filters/UserNameFilter';
import StatusFilter from '../filters/StatusFilter';
import LiveStatusFilter from '../filters/LiveStatusFilter';
import CustomerClassFilter from '../filters/CustomerClassFilter';
import OddsGroupFilter from '../filters/OddsGroupFilter';
import PlatformFilter from '../filters/PlatformFilter';
import IpFilter from '../filters/IpFilter';
import CurrencyFilter from '../filters/CurrencyFilter';
import BaseCurrencyFilter from '../filters/BaseCurrencyFilter';
import ConvertAllCheckBoxFilter from '../filters/ConvertAllCheckBoxFilter';
import SubsidiaryCheckBoxFilter from '../filters/SubsidiaryCheckBoxFilter';
import CashOutModeFilter from '../filters/CashOutModeFilter';
import AppData from '@jsroot/lib/AppData';
import Note from '../filters/Note';

export const FormFilter = () => {
    const isValidModel = useValidParam();
    const isEnableLeagueMatch = useIsEnableLeagueMatch();
    const { isShowSubsidiaryDropdown, isSubsidiarySearch, isShowSubsidiarySearchCheckBox, } = useSubsidiarySearch();
    const { selectedProduct, selectedSport, sportList, selectedBettype, bettypeList, selectedLeague, leagueList,
        selectedMatch, matchList, selectedPlatform, ip, selectedBaseCurrency, isConvertAll, productList, selectedCashOutMode,
        isEnableCashOutFilter } = useSelector(state => state, shallowEqual);

    const { baseCurrencyList, selectedBaseCurrency: newBaseCurrency } = useBaseCurrencyForMultiSelectCurrency(selectedBaseCurrency);
    const { submit } = useFilterAction();

    const { onProductChangeHandler, onSportChangeHandler, onBetTypeChangeHandler, onLeagueChangeHandler, onMatchChangeHandler,
        onUserNameInputHandler, onStatusChangeHandler, onLiveStatusChangeHandler, onCustomerClassChangeHandler,
        onOddsGroupChangeHandler, onPlatformChangeHandler, onIpChangeHandler, onCurrencyChangeHandler,
        onBaseCurrencyChangeHandler, onConverAllChangeHandler, onSubsidiaryDropDownChangeHandler, onSubsidiaryCheckBoxChangeHandler,
        onCashOutModeChangeHandler } = useFilterHandler();

    useEffect(() =>{ onProductChangeHandler(null, selectedProduct) }, []);
    useEffect(() => { onBaseCurrencyChangeHandler({ value: newBaseCurrency }) }, [newBaseCurrency])
    useEffect(() => { onSubsidiaryCheckBoxChangeHandler(!isShowSubsidiarySearchCheckBox && isShowSubsidiaryDropdown) }, []);

    const [isCollapsed, setIsCollapse] = useState(true)

    const onCollapse = () => {
        setIsCollapse(true);
    }
    const onExpand = () => {
        setIsCollapse(false);
    }

    const style = isCollapsed ? { display: "none" } : {};


    return (
        <CollapsiblePanel className="mobile-mode page-filter"
            onCollapse={onCollapse}
            onExpand={onExpand}
            isInitCollapsed={true}
            isCustomCollapse={true}>

            <div className="row">
                <ToastContainer
                    autoClose={10000}
                    pauseOnFocusLoss={false}
                    style={{ width: "500px" }}
                    transition={Flip} />

                {isShowSubsidiaryDropdown && isSubsidiarySearch && <div className="col-12 col-xs-6 col-md-3" style={style}>
                    <SubsidiaryDropDownFilter onChange={onSubsidiaryDropDownChangeHandler} />
                </div>}

                <div className="col-12 col-xs-6 col-md-3">
                    <DateRangeFilter isMobile={true}/>
                </div>

                <div className="col-12 col-xs-6 col-md-3">
                    <UserNameFilter onChange={onUserNameInputHandler} />
                </div>

                <div className="col-12 col-xs-6 col-md-3" style={style}>
                    <StatusFilter onChange={onStatusChangeHandler} />
                </div>

                <div className="col-12 col-xs-6 col-md-3">
                <ProductFilter value={selectedProduct} options={productList} onChange={onProductChangeHandler}/>
                </div>

                <div className="col-12 col-xs-6 col-md-3">
                    <CustomerClassFilter onChange={onCustomerClassChangeHandler} />
                </div>

                {AppData.isOfferCashOutProduct &&
                    <div className="col-12 col-xs-6 col-md-3">
                        <CashOutModeFilter value={selectedCashOutMode} onChange={onCashOutModeChangeHandler} disabled={!isEnableCashOutFilter}/>
                    </div>
                }

                <div className="col-12 col-xs-6 col-md-3" style={style}>
                    <CurrencyFilter onChange={onCurrencyChangeHandler} />
                </div>

                <div className="col-12 col-xs-6 col-md-3" style={style}>
                    <BaseCurrencyFilter value={selectedBaseCurrency} options={baseCurrencyList} onChange={onBaseCurrencyChangeHandler} />
                </div>

                <div className="col-12 col-xs-6 col-md-3" style={style}>
                    <ConvertAllCheckBoxFilter value={isConvertAll} onChange={onConverAllChangeHandler} />
                </div>

                <div className="col-12 col-xs-6 col-md-3" style={style}>
                    <OddsGroupFilter onChange={onOddsGroupChangeHandler} />
                </div>

                <div className="col-12 col-xs-6 col-md-3" style={style}>
                    <PlatformFilter value={selectedPlatform} onChange={onPlatformChangeHandler} />
                </div>

                <div className="col-12 col-xs-6 col-md-3" style={style}>
                    <LiveStatusFilter onChange={onLiveStatusChangeHandler} />
                </div>

                <div className="col-12 col-xs-6 col-md-3" style={style}>
                    <SportFilter value={selectedSport} options={sportList} onChange={onSportChangeHandler} />
                </div>

                <div className="col-12 col-xs-6 col-md-3" style={style}>
                    <BetTypeFilter value={selectedBettype} options={bettypeList} onChange={onBetTypeChangeHandler} />
                </div>

                <div className="col-12 col-xs-6 col-md-3" style={style}>
                    <LeagueFilter disabled={!isEnableLeagueMatch} value={selectedLeague} options={leagueList} onChange={onLeagueChangeHandler} />
                </div>

                <div className="col-12 col-xs-6 col-md-3" style={style}>
                    <MatchFilter disabled={!isEnableLeagueMatch} value={selectedMatch} options={matchList} onChange={onMatchChangeHandler} />
                </div>

                <div className="col-12 col-xs-6 col-md-3" style={style}>
                    <IpFilter value={ip} onChange={onIpChangeHandler} />
                </div>

                {isShowSubsidiarySearchCheckBox && (
                    <div className="col-12 col-xs-6 col-md-3" style={style}>
                        <SubsidiaryCheckBoxFilter value={isSubsidiarySearch} onChange={onSubsidiaryCheckBoxChangeHandler} />
                    </div>
                )}

                <div className="col-12">
                    <div className="form-group">
                        <div className="button-group">
                            <button type="button" disabled={!isValidModel} className="btn btn-submit" onClick={submit}>{LangHelper.getSingleResource("Submit")}</button>
                        </div>
                    </div>
                    <div className='caret-block'>
                        <StickyIcon />
                    </div>
                </div>
            </div>

            <div className="row filter-note" style={style}>
                <Note contentClass="col-12" />
            </div>

        </CollapsiblePanel>
    )
}

export default memo(FormFilter);