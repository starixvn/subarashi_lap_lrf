import React from 'react';
import { Row, Cell } from '@9softstudio/react-grid';
import SelectionCell from './SelectionCell';
import VipStatusCell from './VipStatusCell';

export const PlayerRow = (props) => {
    const { externalId, systemId, index, isMarkVoid } = props;
    return (<Row key={`player_row_${systemId}`}>
        {<SelectionCell rowIndex={index} systemId={systemId}/>}
        <Cell className="center-align">{externalId}</Cell>
        <Cell className="center-align">{systemId}</Cell>
        {<VipStatusCell {...{ index, isMarkVoid }}/> }
    </Row>)
}

export default React.memo(PlayerRow);

