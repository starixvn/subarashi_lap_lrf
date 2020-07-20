import React from 'react';
import { Cell } from '@9softstudio/react-grid';

const ExternalIdCell = props => {
    const { externalId, onClick } = props; 
    return (<Cell className="left-align">
        <div className="username-cell">
            <button className="btn-default btn-link username-link"
                onClick={onClick}>
                {externalId}
            </button>
        </div>
    </Cell>
    )
}

export default React.memo(ExternalIdCell); 