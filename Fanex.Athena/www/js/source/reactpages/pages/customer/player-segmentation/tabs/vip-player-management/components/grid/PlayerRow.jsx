import React from 'react';
import { Row, Cell } from '@9softstudio/react-grid';
import SelectionCell from './SelectionCell';
import VipSwitcherCell from '../../../../components/VipSwitcherCell';
import ExternalIdCell from '../../../../components/ExternalIdCell';

export const PlayerRow = (props) => {
    const { subsidiary, externalId, systemId, index, custId, showSubsidiary, onSelectPlayer } = props;
    const onClickExternalId = React.useCallback(() => onSelectPlayer(custId), [custId]);
    
    return (<Row key={`player_row_${custId}`}>
        <SelectionCell rowIndex={index}/>
        {showSubsidiary && <Cell className="left-align">{subsidiary}</Cell>}
        <ExternalIdCell externalId={externalId} onClick={onClickExternalId} />
        <Cell className="left-align">{systemId}</Cell>
        <VipSwitcherCell index={index} />
    </Row>)
}

export default React.memo(PlayerRow);

