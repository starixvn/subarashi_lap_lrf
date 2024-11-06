import React, { memo } from 'react'
import Select from 'react-select'
import LangHelper from '@jsroot/lib/langHelper'
import PropTypes from 'prop-types';

export const MatchFilter = (props) => {
    const _renderMatchSelectList = () => {
        const matchList = props.options;
        const filterOptions = {
            matchPos: 'any',
            matchProp: 'label',
            ignoreCase: true,
            ignoreAccents: false
        }

        return matchList?.length && (
            <Select {...props} {...filterOptions} instanceId="MatchList" />
        );
    }

    return (
        <div className="form-group">
            <label className="label-text">{LangHelper.getSingleResource("Match")}</label>
            {_renderMatchSelectList()}
        </div>)
}

const propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    disabled: PropTypes.bool
};

MatchFilter.propTypes = propTypes;

export default memo(MatchFilter);