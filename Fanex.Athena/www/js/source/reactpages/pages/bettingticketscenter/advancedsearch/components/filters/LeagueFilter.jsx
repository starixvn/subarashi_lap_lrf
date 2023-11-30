import React, { memo } from 'react'
import Select from 'react-select'
import LangHelper from '@jsroot/lib/langHelper'
import PropTypes from 'prop-types';

export const LeagueFilter = (props) => {
    const {options} = props;

    const _renderLeagueSelectList = () => {
        const leagueList = options;

        return  leagueList?.length && (
            <Select {...props} instanceId="LeagueList" />
        );
    }

    return (
    <div className="form-group">
        <label className="label-text">{LangHelper.getSingleResource("League")}</label>
        {_renderLeagueSelectList()}
    </div>)
}

const propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    disabled: PropTypes.bool
};

LeagueFilter.propTypes = propTypes;

export default memo(LeagueFilter);