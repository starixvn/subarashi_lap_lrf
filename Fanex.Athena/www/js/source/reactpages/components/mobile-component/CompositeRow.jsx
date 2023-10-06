
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useState } from 'react';
import { Cell } from '@9softstudio/react-grid';
import CollapseRow from './CollapseRow';
import { useRef } from 'react';
import { useHover } from 'usehooks-ts';
import RefRow from './RefRow';

const CompositeRow = (props) => {
    const {isCollapsible, expandRows, className} = props;
    const [isCollapse, setIsCollapse] = useState(true);
    const [childFocusTracker, setChildFocusTracker] = useState(expandRows.map(() => false));   
    const hoverRef = useRef(null);
    const isHover = useHover(hoverRef);

    const onClick = () => {
        setIsCollapse(!isCollapse);
    }
    const iconClass = isCollapse ? 'icon icon-lap-plus' : 'icon icon-lap-minus';
    const onChildFocus = (index, isFocus) => {
        childFocusTracker.splice(index, 1, isFocus);
        setChildFocusTracker([...childFocusTracker]);
    }

    const isFocus = isHover || childFocusTracker.indexOf(true) >=0
    const classes = classNames(isFocus ? "row-active" : "", className);
    return <>
        <RefRow ref={hoverRef} className={classes}>          
                {props.children}
                {isCollapsible && <Cell onClick={onClick} className="center-align"><span className={iconClass}></span></Cell>}           
        </RefRow>
        { isCollapsible && !isCollapse && expandRows && expandRows.map((item, index) =>
            (<CollapseRow key={index} className="collapse-row" index={index} onFocus={onChildFocus} isFocus={isFocus}>{item}</CollapseRow>)
        )}
    </>
} 

const propTypes = {
    isCollapsible: PropTypes.bool,
    isFocus: PropTypes.bool,
    isUseCustomCollapseCell : PropTypes.bool,
    collapsibleCellContent : PropTypes.node,
    onExpanded: PropTypes.func,
    onCollapse: PropTypes.func,
    expandRows: PropTypes.array,
    className: PropTypes.string,
};
const defaultProps = {
    isCollapsible: true,
    isUseCustomCollapseCell: false,
    isFocus: false,
    expandRows: []
};

CompositeRow.propTypes = propTypes;
CompositeRow.defaultProps = defaultProps;

export default CompositeRow;