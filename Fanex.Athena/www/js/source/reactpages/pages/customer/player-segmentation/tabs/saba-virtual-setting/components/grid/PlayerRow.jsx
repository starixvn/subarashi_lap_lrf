import React from 'react';
import { Row, Cell } from '@9softstudio/react-grid';

const PlayerRow = (props) => {
    const { dataItem,  showSubsidiary } = props;
    const { custId, subsidiary, externalId, systemId, lastModifiedDate, soccerLevel, basketballLevel} = dataItem;

    return (
        <Row key={`player_row_${custId}`}>
            {showSubsidiary && <Cell className="left-align">{subsidiary}</Cell>}
            <Cell className="left-align">{externalId}</Cell>
            <Cell className="left-align">{systemId}</Cell>
            <Cell className="center-align">{soccerLevel}</Cell>
            <Cell className="center-align">{basketballLevel}</Cell>
            <Cell className="center-align">{lastModifiedDate}</Cell>
        </Row>
    )
}

export default React.memo(PlayerRow);
