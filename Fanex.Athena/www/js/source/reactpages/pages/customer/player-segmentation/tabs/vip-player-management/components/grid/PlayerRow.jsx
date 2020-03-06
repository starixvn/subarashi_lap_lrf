import React from 'react';
import { Row, Cell } from '@9softstudio/react-grid';
import SelectionCell from './SelectionCell';
import VipStatusCell from './VipStatusCell';

export const PlayerRow = (props) => {
    const { externalId, systemId, index, isMarkVoid, custId } = props;
    return (<Row key={`player_row_${custId}`}>
        {<SelectionCell rowIndex={index}/>}
        <Cell className="left-align">{externalId}</Cell>
        <Cell className="left-align">{systemId}</Cell>
        {<VipStatusCell {...{ index, isMarkVoid }}/> }
    </Row>)
}

export default React.memo(PlayerRow);

