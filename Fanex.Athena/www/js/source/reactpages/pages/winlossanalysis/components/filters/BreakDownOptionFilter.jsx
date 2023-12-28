import React, {useMemo, memo} from "react";
import LangHelper from '@jsroot/lib/langHelper'
import Service from '../../common/Service.js'
import { shallowEqual, useSelector } from "react-redux";
import useGroupFilterHandler from '../hooks/useGroupFilterHandler.jsx';

export const BreakDownOptionFilter = () => {
    const [selectedGroupByOption, selectedBreakDownByOption] = useSelector(state => [state.selectedGroupByOption, state.selectedBreakDownByOption], shallowEqual);
    const {onChangeBreakByOption} = useGroupFilterHandler();
    const breakDownList = useMemo(() => Service.buildBreakDownOptionFromGroupByMode(selectedGroupByOption), [selectedGroupByOption])

    return (
        <div className="form-group radio-group">
                <label className='label-text'>{LangHelper.getSingleResource('BreakdownBy')}:</label>
                <div className="radio-list">
                    {
                        breakDownList.map((option, i) => {
                            const key = 'BreakBy' + i;
                            return (
                                <span key={`BreakBy${key}`} className="filter-radio-item">
                                    <input disabled={option.isDisabled} type='radio' value={option.value} checked={selectedBreakDownByOption == option.value} id={key}
                                        onChange={onChangeBreakByOption} />
                                    <label htmlFor={key}>{option.label}</label>
                                </span>)
                        })
                    }
                </div>

            </div>
    )
}

export default memo(BreakDownOptionFilter);