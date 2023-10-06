import React, { useEffect } from 'react';
import PropTypes from 'prop-types';


export const MobileBetlistContent = (props) => {
    const { item } = props;

    useEffect(() => {}, [item]);

    return (
        <div>
            <div><span className='cell-index'>#{item.Index}</span> - {item.TransTime}</div>
            <div className='cell-external-id'>{item.ExternalId}</div>
            <div>{item.RefNo}</div>
            <div dangerouslySetInnerHTML={{ __html: item.Choice }}></div>
            <div className='cell-odd' dangerouslySetInnerHTML={{__html: `@${item.Odds} ${item.OddsType}`}}></div>
        </div>
    );
};

const propTypes = {
    item: PropTypes.object
};

MobileBetlistContent.propTypes = propTypes;

export default MobileBetlistContent