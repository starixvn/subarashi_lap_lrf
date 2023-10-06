import React from 'react'
import CollapsiblePanel from '@jsroot/components/collapsible-panel'
import LangHelper from '@jsroot/lib/langHelper'
import BaseCurrencySelectList from '../filters/BaseCurrencySelectList'
import useFilterAction from '../hooks/useFilterAction'
import { useValidParam } from '../hooks/useValidParam'
import StickyButton from '../filters/StickyButton'
import RefNoFilter from '../filters/RefNoFilter'
import UserNameFilter from '../filters/UserNameFilter'
import ConvertAllCheckBox from '../filters/ConvertAllCheckBox'
import Note from '../filters/Note'

export const FormFilter = () => {
    const isValidModel = useValidParam();
    const { submit} = useFilterAction();

    return (
        <CollapsiblePanel className="mobile-mode page-filter" stickyFooter={<StickyButton/>}>
            <div className="row">
                <div className="col-12 col-md-4 col-sm-4 col-lg-3 col-xl-2">
                    <RefNoFilter/>
                </div>
                <div className="col-12 col-md-4 col-sm-4 col-lg-3 col-xl-2">
                    <UserNameFilter/>
                </div>
                <div className="col-12 col-md-3 col-sm-4 col-lg-2 col-xl-2">
                    <BaseCurrencySelectList />
                </div>
                <div className="col-12 col-md-4 col-sm-4 col-lg-2 col-xl-2">
                    <ConvertAllCheckBox/>
                </div>

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

export default FormFilter;