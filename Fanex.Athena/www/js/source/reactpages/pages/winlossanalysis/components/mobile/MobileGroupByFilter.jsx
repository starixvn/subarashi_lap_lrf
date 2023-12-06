import React, {memo} from 'react'
import CollapsiblePanel from '@jsroot/components/collapsible-panel'
import LangHelper from '@jsroot/lib/langHelper'
import { useValidParam } from '../hooks/useValidParam';
import useFilterAction from '../hooks/useFilterAction';
import { GroupByOptionFilter } from '../filters/GroupByOptionsFilter.jsx'
import BreakDownOptionFilter from '../filters/BreakDownOptionFilter.jsx'
import PropTypes from 'prop-types';
import StickyIcon from '../filters/StickyIcon.jsx';


export const MobileGroupByFilter = (props) => {
    const {isCollapsed} = props;
    const isValidModel = useValidParam();
    const { submit, onClickClearFilter } = useFilterAction();
    const collapsedStyle = isCollapsed ? { display: "none" } : {};
    return (
        <CollapsiblePanel className="page-filter" isCollapseMode={false}>
            <div className="row flex w100">
                <div className='' style={collapsedStyle}>
                    <div className='flex flex-col'>
                        <div className='col-md-12 '>
                            <GroupByOptionFilter/>
                        </div>
                        <div className='col-md-12'>
                            <BreakDownOptionFilter/>
                        </div>
                    </div>
                </div>
                <div className="flex w100">
                    <div className="form-group w100">
                        <div className="button-group">
                            <button type="button" disabled={!isValidModel} className="btn btn-submit" onClick={submit}>{LangHelper.getSingleResource("Submit")}</button>
                            <button type="button" className="btn btn-outline-secondary" onClick={onClickClearFilter}>{LangHelper.getSingleResource("ClearAllFilters")}</button>
                        </div>
                    </div>
                    <div className='caret-block'>
                        <StickyIcon/>
                    </div>
                </div>

            </div>
        </CollapsiblePanel>
    )

}

const propTypes = {
    isCollapsed: PropTypes.bool 
}
const defaultProps = {
    isCollapsed: true
}

MobileGroupByFilter.propTypes = propTypes;
MobileGroupByFilter.defaultProps = defaultProps;

export default memo(MobileGroupByFilter);
