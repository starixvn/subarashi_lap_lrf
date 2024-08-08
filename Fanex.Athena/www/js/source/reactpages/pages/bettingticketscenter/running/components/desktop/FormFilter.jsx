import React, { memo } from 'react'
import CollapsiblePanel from '@jsroot/components/collapsible-panel'
import LangHelper from '@jsroot/lib/langHelper'
import { useValidParam } from '../hooks/useValidParam.jsx'
import SubsidiaryDropDown from '../filters/SubsidiaryDropDown.jsx'
import ProductFilter from '../filters/ProductFilter.jsx'
import UserNameFilter from '../filters/UserNameFilter.jsx'
import CurrecyFilter from '../filters/CurrecyFilter.jsx'
import BaseCurrencyFilter from '../filters/BaseCurrencyFilter.jsx'
import ConvertAllCheckBoxFilter from '../filters/ConvertAllCheckBoxFilter.jsx'
import StatusFilter from '../filters/StatusFilter.jsx'
import SubsidiaryCheckBoxFilter from '../filters/SubsidiaryCheckBoxFilter.jsx'
import StickyIcon from '../filters/StickyIcon.jsx'
import useSubsidiarySearch  from '@jsroot/customHooks/useSubsidiarySearch'
import useFilterAction from '../hooks/useFilterAction.jsx'
import SportFilter from '../filters/SportFilter';
import BetTypeFilter from '../filters/BetTypeFilter';
import LeagueFilter from '../filters/LeagueFilter';
import MatchFilter from '../filters/MatchFilter';
import LiveStatusFilter from '../filters/LiveStatusFilter';
import CustomerClassFilter from '../filters/CustomerClassFilter';
import OddsGroupFilter from '../filters/OddsGroupFilter';
import PlatformFilter from '../filters/PlatformFilter';
import IpFilter from '../filters/IpFilter';

export const FormFilter = () => {
    const isValidModel = useValidParam();
    const { isShowSubsidiaryDropdown, isSubsidiarySearch, isShowSubsidiarySearchCheckBox } = useSubsidiarySearch();
    const {submit} = useFilterAction();

    return (
        <CollapsiblePanel className="page-filter" stickyFooter={<StickyIcon />}>
            <div className="row">
                {isShowSubsidiaryDropdown && isSubsidiarySearch && <div className="col-12 col-md-3 col-sm-4 col-lg-3 col-xl-2">
                    <SubsidiaryDropDown />
                </div>}
                <div className="col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2">
                    <ProductFilter />
                </div>
                <div className="col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2">
                    <SportFilter />
                </div>
                <div className="col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2">
                    <BetTypeFilter />
                </div>
                <div className="col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2">
                    <LeagueFilter />
                </div>
                <div className="col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2">
                    <MatchFilter />
                </div>
                <div className="col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2">
                    <PlatformFilter />
                </div>
                <div className="col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2">
                    <UserNameFilter />
                </div>
                <div className="col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2">
                    <IpFilter />
                </div>
                <div className="col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2">
                    <StatusFilter />
                </div>
                <div className="col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2">
                    <LiveStatusFilter />
                </div>
                <div className="col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2">
                    <CustomerClassFilter />
                </div>
                <div className="col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2">
                    <OddsGroupFilter />
                </div>
                <div className="col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2">
                    <CurrecyFilter />
                </div>
                <div className="col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2">
                    <BaseCurrencyFilter />
                </div>
                <div className="col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2">
                    <ConvertAllCheckBoxFilter />
                </div>

                <div className="col-12 col-md-2 col-sm-2 col-lg-2 col-xl-1">
                    <div className="form-group">
                        <div className="button-group">
                            <button disabled={!isValidModel} type="button" className="btn btn-submit" onClick={submit}>{LangHelper.getSingleResource("Submit")}</button>
                        </div>
                    </div>
                </div>

                {isShowSubsidiarySearchCheckBox && (
                    <div className='col-12 col-sm-3 col-md-2 col-xl-2'>
                        <SubsidiaryCheckBoxFilter />
                    </div>
                )}
            </div>
        </CollapsiblePanel>
    )
}

export default memo(FormFilter);