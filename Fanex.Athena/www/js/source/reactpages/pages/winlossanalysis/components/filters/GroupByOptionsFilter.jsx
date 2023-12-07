import React, {useMemo, memo} from "react";
import LangHelper from '@jsroot/lib/langHelper'
import Service from '../../common/Service.js'
import AppData from '@jsroot/lib/AppData'
import { useSelector } from "react-redux";
import useGroupFilterHandler from '../hooks/useGroupFilterHandler.jsx';

export const GroupByOptionFilter = () => {
    const selectedGroupByOption = useSelector(state => state.selectedGroupByOption);
    const groupByList = useMemo(() => Service.buildGroupByOption(), [AppData.licenseeName])
    const {onChangeGroupByOption} = useGroupFilterHandler();

    return (
        <div className="form-group radio-group">
            <label className='label-text'>{LangHelper.getSingleResource('GroupBy')}:</label>
            <div className="radio-list">
                {
                    groupByList.map((option, i) => {
                        const key = 'GroupBy' + i;
                        return (
                            <span key={`GroupBy${key}`} className="filter-radio-item">
                                <input type='radio' value={option.value} checked={selectedGroupByOption == option.value} id={key}
                                    onChange={onChangeGroupByOption} />
                                <label htmlFor={key}>{option.label}</label>
                            </span>)
                    })
                }
            </div>
        </div>
    )
}

export default memo(GroupByOptionFilter);