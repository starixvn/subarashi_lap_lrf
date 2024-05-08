import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CollapsiblePanel from '@jsroot/components/collapsible-panel'
import LangHelper from '@jsroot/lib/langHelper'
import { useValidParam } from '../hooks/useValidParam'
import DateRangeFilter from '../filters/DateRangeFilter'
import BaseCurrencyFilter from '../filters/BaseCurrencyFilter'
import ConvertAllCheckBoxFilter from '../filters/ConvertAllCheckBoxFilter'
import UserInputFilter from '../filters/UserInputFilter'
import StatusFilter from '../filters/StatusFilter'
import PlatformFilter from '../filters/PlatformFilter'
import StickyIcon from '../filters/StickyIcon'
import useFilterAction from '../hooks/useFilterAction'
import CurrecyFilter from '../filters/CurrecyFilter.jsx'
import useBaseCurrencyForMultiSelectCurrency from '@jsroot/customHooks/useBaseCurrencyForMultiSelectCurrency'
import { ActionCreators } from '../../actions/index'
import { useCallback } from 'react'
import Note from '../filters/Note';

export const FormFilter = () => {

    const dispatch = useDispatch();
    const selectedBaseCurrency = useSelector(state => state.selectedBaseCurrency);
    const { setSelectedBaseCurrency } = ActionCreators;
    const { baseCurrencyList,  selectedBaseCurrency: newBaseCurrency  } = useBaseCurrencyForMultiSelectCurrency(selectedBaseCurrency);
    const isValidModel = useValidParam();
    const {submit, isBookedIDOrRefNoSearch } = useFilterAction();
    const onBaseCurrencyChangeHandler = useCallback((item) => dispatch(setSelectedBaseCurrency(item.value)),[]);

    useEffect(() =>{ onBaseCurrencyChangeHandler({value: newBaseCurrency})}, [newBaseCurrency])

    return (
        <CollapsiblePanel className="page-filter" stickyFooter={<StickyIcon />}>
            <div className="row">
                <div className="col-12 col-md-3 col-sm-3 col-lg-4 col-xl-2">
                    <UserInputFilter />
                </div>
                <div className="col-12 col-md-3 col-sm-3 col-lg-4 col-xl-2">
                    <DateRangeFilter disabled={isBookedIDOrRefNoSearch}/>
                </div>
                <div className="col-12 col-md-3 col-sm-3 col-lg-4 col-xl-2">
                    <StatusFilter disabled={isBookedIDOrRefNoSearch}/>
                </div>
                <div className="col-12 col-md-3 col-sm-3 col-lg-2 col-xl-2">
                    <PlatformFilter disabled={isBookedIDOrRefNoSearch}/>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2">
                    <CurrecyFilter disabled={isBookedIDOrRefNoSearch}/>
                </div>
                <div className="col-12 col-md-3 col-sm-3 col-lg-2 col-xl-2">
                    <BaseCurrencyFilter value={selectedBaseCurrency} options={baseCurrencyList} onChange={onBaseCurrencyChangeHandler}/>
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
            <div className="row">
                <Note/>
            </div>
        </CollapsiblePanel>
    )
}

export default memo(FormFilter);