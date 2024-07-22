import React, { memo } from 'react'
import CollapsiblePanel from '@jsroot/components/collapsible-panel'
import LangHelper from '@jsroot/lib/langHelper'
import { useValidParam } from '../hooks/useValidParam'
import DateRangeFilter from '../filters/DateRangeFilter'
import ProductFilter from '../filters/ProductFilter'
import BaseCurrencyFilter from '../filters/BaseCurrencyFilter'
import ConvertAllCheckBoxFilter from '../filters/ConvertAllCheckBoxFilter'
import UserNameFilter from '../filters/UserNameFilter'
import StatusFilter from '../filters/StatusFilter'
import PlatformFilter from '../filters/PlatformFilter'
import LiveStatusFilter from '../filters/LiveStatusFilter'
import StickyIcon from '../filters/StickyIcon'
import useFilterAction from '../hooks/useFilterAction'
import SportFilter from '../filters/SportFilter';
import BetTypeFilter from '../filters/BetTypeFilter';

export const FormFilter = () => {

    const isValidModel = useValidParam();
    const {submit} = useFilterAction();

    return (
        <CollapsiblePanel className="page-filter" stickyFooter={<StickyIcon />}>
            <div className="row">
                <div className="col-12 col-md-3 col-sm-3 col-lg-4 col-xl-2">
                    <DateRangeFilter />
                </div>
                <div className="col-12 col-md-3 col-sm-3 col-lg-4 col-xl-2">
                    <ProductFilter />
                </div>

                <div className="col-12 col-md-3 col-sm-3 col-lg-4 col-xl-2">
                    <SportFilter />
                </div>

                <div className="col-12 col-md-3 col-sm-3 col-lg-4 col-xl-2">
                    <BetTypeFilter />
                </div>

                <div className="col-12 col-md-3 col-sm-3 col-lg-4 col-xl-2">
                    <StatusFilter />
                </div>
                
                <div className="col-12 col-md-2 col-sm-3 col-lg-2 col-xl-2">
                    <LiveStatusFilter />
                </div>
                
                <div className="col-12 col-md-3 col-sm-3 col-lg-4 col-xl-2">
                    <UserNameFilter />
                </div>

                <div className="col-12 col-md-3 col-sm-3 col-lg-2 col-xl-2">
                    <PlatformFilter />
                </div>
               
                <div className="col-12 col-md-3 col-sm-3 col-lg-2 col-xl-2">
                    <BaseCurrencyFilter />
                </div>

                <div className="col-12 col-md-4 col-sm-3 col-lg-2 col-xl-3">
                    <ConvertAllCheckBoxFilter />
                </div>

                <div className="col-12 col-md-2 col-sm-2 col-lg-2 col-xl-1">
                    <div className="form-group">
                        <div className="button-group">
                            <button type="button" disabled={!isValidModel} className="btn btn-submit" onClick={submit}>{LangHelper.getSingleResource("Submit")}</button>
                        </div>
                    </div>
                </div>
            </div>
        </CollapsiblePanel>
    )
}

export default memo(FormFilter);