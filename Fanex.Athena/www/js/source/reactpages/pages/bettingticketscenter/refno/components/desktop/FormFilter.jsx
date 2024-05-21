import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import CollapsiblePanel from '@jsroot/components/collapsible-panel'
import LangHelper from '@jsroot/lib/langHelper'
import BaseCurrencySelectList from '../filters/BaseCurrencySelectList'
import useFilterAction from '../hooks/useFilterAction'
import { useValidParam } from '../hooks/useValidParam'
import StickyIcon from '../filters/StickyIcon'
import RefNoFilter from '../filters/RefNoFilter'
import UserNameFilter from '../filters/UserNameFilter'
import ConvertAllCheckBox from '../filters/ConvertAllCheckBox'
import ViewSabaCoinsCheckBox from '../filters/ViewSabaCoinsCheckBox'
import AppData from '@jsroot/lib/AppData'
import Note from '../filters/Note'

export const FormFilter = () => {
    const viewSabaCoins = useSelector(state => state.viewSabaCoins);
    const isValidModel = useValidParam();
    const { submit} = useFilterAction();

    return (
        <CollapsiblePanel className="mobile-mode page-filter" stickyFooter={<StickyIcon/>}>
            <div className="row">
                <div className="col-12 col-md-4 col-sm-4 col-lg-3 col-xl-2">
                    <RefNoFilter/>
                </div>
                <div className="col-12 col-md-4 col-sm-4 col-lg-3 col-xl-2">
                    <UserNameFilter/>
                </div>
                <div className="col-12 col-md-3 col-sm-4 col-lg-2 col-xl-2">
                    <BaseCurrencySelectList disabled={viewSabaCoins}/>
                </div>
                <div className="col-12 col-md-4 col-sm-4 col-lg-2 col-xl-2">
                    <ConvertAllCheckBox disabled={viewSabaCoins}/>
                </div>
                {AppData.isAllowSabaCoins && <div className="col-12 col-md-4 col-sm-4 col-lg-2 col-xl-2">
                    <ViewSabaCoinsCheckBox/>
                </div>}

                <div className="col-12 col-md-3 col-sm-4 col-lg-2 col-xl-2">
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