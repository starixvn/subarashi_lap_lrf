import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { oddsGroupListWithStyle } from '../../lib/constants';
import DropdownLabel from '@jsroot/components/DropdownLabel';
import { ActionCreators } from '../../actions';
import GridInteractionService from '../../lib/gridInteractionService';
import { buildCurrentActivePlayer } from '../../lib/utils';

export const OddsGroupCell = (props) => {
    const { dataItem, oddsGroupDropdownPosition, setCurrentActivePlayer, setOddsGroupDropdownPosition } = props;

    const value = dataItem.OddsGroup;
    const style = oddsGroupListWithStyle[value];

    const handleToggleOddsGroup = (event) => {
        const currentActivePlayer = buildCurrentActivePlayer(dataItem);
        setCurrentActivePlayer(currentActivePlayer);
        const newPosition = GridInteractionService.getNextDropdownPosition(event.target, oddsGroupDropdownPosition);
        setOddsGroupDropdownPosition(newPosition);
    }

    return <DropdownLabel text={value} labelStyle={style} onClick={handleToggleOddsGroup} />
}

function mapDispatchToProps(dispatch) {
    const { setCurrentActivePlayer, setOddsGroupDropdownPosition } = ActionCreators;
    return bindActionCreators({ setCurrentActivePlayer, setOddsGroupDropdownPosition }, dispatch);
}

function mapStateToProps(state) {
    const { oddsGroupDropdownPosition } = state;
    return Object.assign({}, { oddsGroupDropdownPosition });
};

export default connect(mapStateToProps, mapDispatchToProps)(OddsGroupCell);