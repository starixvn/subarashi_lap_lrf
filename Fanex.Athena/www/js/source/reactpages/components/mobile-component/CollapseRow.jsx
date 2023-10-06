
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import RefRow from './RefRow';
import { useHover } from 'usehooks-ts';

const CollapseRow = (props) => {
    const { isFocus, className, onFocus, index} = props;
    const[ oldIsHover, setOldIsHover] = useState(false);
    const ref = useRef(null);
    const isHover = useHover(ref);
    if(isHover != oldIsHover){
        setOldIsHover(isHover);
        onFocus(index, isHover)
    }
    const classes = classNames(isFocus ? "row-active" : "", className);

    return(
        <RefRow ref={ref} className={classes}>
                {props.children}
        </RefRow>)
} 

const propTypes = {
    isFocus: PropTypes.bool,
    className: PropTypes.string,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    index: PropTypes.number
};
const defaultProps = {
    isFocus: false,
    index: 0
};

CollapseRow.propTypes = propTypes;
CollapseRow.defaultProps = defaultProps;

export default CollapseRow;