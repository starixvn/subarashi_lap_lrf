import React, { useEffect } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { ToastContainer, Flip } from 'react-toastify';
import CollapsiblePanel from '@jsroot/components/collapsible-panel'
import LangHelper from '@jsroot/lib/langHelper'
import { useValidParam } from '../hooks/useValidParam';
import { useFilterHandler } from '../hooks/useFilterHandler';
import useFilterAction from '../hooks/useFilterAction';
import useIsEnableLeagueMatch from '../hooks/useIsEnableLeagueMatch';
import useBaseCurrencyForMultiSelectCurrency from '@jsroot/customHooks/useBaseCurrencyForMultiSelectCurrency'
import useSubsidiarySearch  from '@jsroot/customHooks/useSubsidiarySearch'
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
import Note from '../filters/Note';

export const FormFilter = () => {
    const isValidModel = useValidParam();
    const isEnableLeagueMatch = useIsEnableLeagueMatch();
    const { isShowSubsidiaryDropdown, isSubsidiarySearch, isShowSubsidiarySearchCheckBox, } = useSubsidiarySearch();
    const { selectedProduct, selectedSport, sportList, selectedBettype, bettypeList, selectedLeague, leagueList, 
        selectedMatch, matchList, selectedPlatform, ip, selectedBaseCurrency, isConvertAll} = useSelector(state => state, shallowEqual);

    const { baseCurrencyList,  selectedBaseCurrency: newBaseCurrency  } = useBaseCurrencyForMultiSelectCurrency(selectedBaseCurrency);
    const { submit } = useFilterAction();

    const { onProductChangeHandler, onSportChangeHandler, onBetTypeChangeHandler, onLeagueChangeHandler, onMatchChangeHandler,
        onUserNameInputHandler, onStatusChangeHandler, onLiveStatusChangeHandler, onCustomerClassChangeHandler,
        onOddsGroupChangeHandler, onPlatformChangeHandler, onIpChangeHandler, onCurrencyChangeHandler,
        onBaseCurrencyChangeHandler, onConverAllChangeHandler, onSubsidiaryDropDownChangeHandler, onSubsidiaryCheckBoxChangeHandler } = useFilterHandler();

    useEffect(() =>{ onProductChangeHandler({value: selectedProduct}) }, []);
    useEffect(() =>{ onBaseCurrencyChangeHandler({value: newBaseCurrency})}, [newBaseCurrency])
    useEffect(() =>{ onSubsidiaryCheckBoxChangeHandler(!isShowSubsidiarySearchCheckBox && isShowSubsidiaryDropdown) }, []);

        return (
            <CollapsiblePanel className="page-filter" stickyFooter={<StickyIcon/>}>
                <div className="row">
                    <ToastContainer
                        autoClose={10000}
                        pauseOnFocusLoss={false}
                        style={{ width: "500px" }}
                        transition={Flip} />

                    { isShowSubsidiaryDropdown && isSubsidiarySearch && <div className="col-12 col-md-3 col-sm-4 col-lg-3 col-xl-2">
                        <SubsidiaryDropDownFilter onChange={onSubsidiaryDropDownChangeHandler}/>
                    </div>}

                    <div className="col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2">
                        <DateRangeFilter/>
                    </div>

                    <div className="col-12 col-md-3 col-sm-3 col-lg-4 col-xl-2">
                        <ProductFilter value={selectedProduct} onChange={onProductChangeHandler}/>
                    </div>

                    <div className="col-12 col-md-3 col-sm-3 col-lg-4 col-xl-2">
                        <SportFilter value={selectedSport} options={sportList} onChange={onSportChangeHandler}/>
                    </div>

                    <div className="col-12 col-md-3 col-sm-3 col-lg-4 col-xl-2">
                        <BetTypeFilter value={selectedBettype} options={bettypeList} onChange={onBetTypeChangeHandler}/>
                    </div>

                    <div className="col-12 col-md-3 col-sm-3 col-lg-4 col-xl-2">
                        <LeagueFilter disabled={!isEnableLeagueMatch} value={selectedLeague} options={leagueList} onChange={onLeagueChangeHandler} />
                    </div>

                    {!(isShowSubsidiaryDropdown && isSubsidiarySearch) && <div className="col-12 col-md-3 col-sm-3 col-lg-4 col-xl-2">
                        <MatchFilter disabled={!isEnableLeagueMatch} value={selectedMatch} options={matchList} onChange={onMatchChangeHandler} />
                    </div>}

                </div>
                <div className="row">
                    {(isShowSubsidiaryDropdown  && isSubsidiarySearch) && <div className="col-12 col-md-3 col-sm-3 col-lg-4 col-xl-2">
                        <MatchFilter disabled={!isEnableLeagueMatch} value={selectedMatch} options={matchList} onChange={onMatchChangeHandler} />    
                    </div>}

                    <div className="col-12 col-md-3 col-sm-3 col-lg-4 col-xl-2">
                        <UserNameFilter onChange={onUserNameInputHandler} />
                    </div>

                    <div className="col-12 col-md-3 col-sm-3 col-lg-4 col-xl-2">
                        <StatusFilter onChange={onStatusChangeHandler}/>
                    </div>

                    <div className="col-12 col-md-3 col-sm-3 col-lg-2 col-xl-2">
                        <LiveStatusFilter onChange={onLiveStatusChangeHandler}/>
                    </div>

                    <div className="col-12 col-md-3 col-sm-3 col-lg-2 col-xl-2">
                        <CustomerClassFilter onChange={onCustomerClassChangeHandler} />
                    </div>

                    <div className="col-12 col-md-3 col-sm-3 col-lg-2 col-xl-2">
                        <OddsGroupFilter onChange={onOddsGroupChangeHandler}/>
                    </div>

                    {!(isShowSubsidiaryDropdown && isSubsidiarySearch) && <div className="col-12 col-md-3 col-sm-3 col-lg-2 col-xl-2">
                        <PlatformFilter value={selectedPlatform} onChange={onPlatformChangeHandler} />
                    </div>}

                </div>

                <div className="row">

                    {(isShowSubsidiaryDropdown && isSubsidiarySearch) && <div className="col-12 col-md-3 col-sm-3 col-lg-2 col-xl-2">
                        <PlatformFilter value={selectedPlatform} onChange={onPlatformChangeHandler} />
                    </div>}

                    <div className="col-12 col-md-3 col-sm-3 col-lg-4 col-xl-2">
                        <IpFilter value={ip} onChange={onIpChangeHandler} />
                    </div>

                    <div className="col-12 col-md-3 col-sm-3 col-lg-2 col-xl-2">
                        <CurrencyFilter onChange={onCurrencyChangeHandler}/>
                    </div>

                    <div className="col-12 col-md-3 col-sm-3 col-lg-2 col-xl-2">
                        <BaseCurrencyFilter value={selectedBaseCurrency} options={baseCurrencyList} onChange={onBaseCurrencyChangeHandler}/>
                    </div>

                    <div className="col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2">
                        <ConvertAllCheckBoxFilter value={isConvertAll} onChange={onConverAllChangeHandler} />
                    </div>

                    <div className="col-12 col-md-2 col-sm-2 col-lg-2 col-xl-1">
                        <div className="form-group">
                            <div className="button-group">
                                <button type="button" disabled={!isValidModel} className="btn btn-submit" onClick={submit}>{LangHelper.getSingleResource("Submit")}</button>
                            </div>
                        </div>
                    </div>

                    {isShowSubsidiarySearchCheckBox && (
                        <div className='col-12 col-sm-3 col-md-2 col-xl-2'>
                            <SubsidiaryCheckBoxFilter value={isSubsidiarySearch} onChange={onSubsidiaryCheckBoxChangeHandler} />
                        </div>
                    )}

                </div>

                <div className="row">
                    <Note/>
                </div>

            </CollapsiblePanel>
        )
}

export default FormFilter;